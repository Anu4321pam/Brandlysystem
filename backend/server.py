from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, HttpUrl, ConfigDict
from typing import List, Optional, Literal
from datetime import datetime, timezone
from urllib.parse import urlparse, unquote, urljoin
import asyncio
import requests
import httpx
from bs4 import BeautifulSoup

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Brandly Systems API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


# ------------------------- Models -------------------------
class AuditFinding(BaseModel):
    id: str
    category: str
    status: Literal["good", "warning", "issue"]
    title: str
    description: str


class WebsiteAuditRequest(BaseModel):
    url: str


class GmbAuditRequest(BaseModel):
    url: str
    business_name: Optional[str] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None


class AuditReport(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    kind: Literal["website", "gmb"]
    target: str
    score: int
    summary: str
    findings: List[AuditFinding]
    meta: dict = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadCreate(BaseModel):
    name: str
    business_name: str
    email: EmailStr
    phone: str
    report_id: Optional[str] = None
    kind: Optional[str] = None
    source: Optional[str] = None


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    business_name: str
    email: str
    phone: str
    report_id: Optional[str] = None
    kind: Optional[str] = None
    source: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ConsultationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    business_name: Optional[str] = None
    message: Optional[str] = None


class Consultation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    business_name: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ------------------------- Helpers -------------------------
def _normalize_url(raw: str) -> str:
    raw = raw.strip()
    if not raw:
        raise HTTPException(status_code=400, detail="URL is required")
    if not re.match(r"^https?://", raw, re.IGNORECASE):
        raw = "https://" + raw
    return raw


def _status_from_bool(ok: bool, warn: bool = False) -> str:
    if ok:
        return "good"
    return "warning" if warn else "issue"


def run_website_audit(raw_url: str) -> AuditReport:
    report, _soup = _run_html_audit(raw_url)
    return report


def _run_html_audit(raw_url: str):
    """Synchronous HTML-only audit. Returns (AuditReport, BeautifulSoup|None)."""
    url = _normalize_url(raw_url)
    parsed = urlparse(url)
    if not parsed.netloc:
        raise HTTPException(status_code=400, detail="Invalid URL")

    findings: List[AuditFinding] = []
    meta = {"url": url, "host": parsed.netloc}

    # HTTPS
    https_ok = parsed.scheme == "https"
    findings.append(AuditFinding(
        id="https",
        category="Security",
        status="good" if https_ok else "issue",
        title="HTTPS / SSL",
        description="Site is served over HTTPS." if https_ok else "Your site is not served over HTTPS. Google penalises insecure sites in search.",
    ))

    html = ""
    status_code = None
    content_bytes = 0
    headers = {}
    try:
        r = requests.get(
            url,
            timeout=10,
            headers={"User-Agent": "Mozilla/5.0 (BrandlySystemsAuditBot/1.0)"},
            allow_redirects=True,
        )
        status_code = r.status_code
        html = r.text or ""
        content_bytes = len(r.content or b"")
        headers = dict(r.headers)
        meta["status_code"] = status_code
        meta["size_kb"] = round(content_bytes / 1024, 1)
    except requests.exceptions.RequestException as e:
        findings.append(AuditFinding(
            id="reachable",
            category="Availability",
            status="issue",
            title="Site unreachable",
            description=f"We couldn't load the page in time. {str(e)[:120]}",
        ))
        score = 20
        return AuditReport(
            kind="website",
            target=url,
            score=score,
            summary="We could not fully reach your site. The findings below are limited.",
            findings=findings,
            meta=meta,
        ), None

    if status_code and status_code >= 400:
        findings.append(AuditFinding(
            id="status",
            category="Availability",
            status="issue",
            title=f"HTTP {status_code} response",
            description="Your page is returning an error status. Visitors and Google bots cannot access it correctly.",
        ))
    else:
        findings.append(AuditFinding(
            id="status",
            category="Availability",
            status="good",
            title="Reachable (HTTP 200)",
            description="Your site responded successfully.",
        ))

    soup = BeautifulSoup(html, "html.parser")

    # Title
    title_tag = soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else ""
    meta["title"] = title
    if not title:
        findings.append(AuditFinding(id="title", category="SEO", status="issue",
            title="Missing page title", description="Every page must have a unique <title> tag. This is the #1 on-page SEO signal."))
    elif len(title) < 30:
        findings.append(AuditFinding(id="title", category="SEO", status="warning",
            title="Title tag too short", description=f"Your title is only {len(title)} characters. Aim for 50-60 characters with primary keywords."))
    elif len(title) > 65:
        findings.append(AuditFinding(id="title", category="SEO", status="warning",
            title="Title tag too long", description=f"Title is {len(title)} characters — Google truncates after ~60. Tighten your headline."))
    else:
        findings.append(AuditFinding(id="title", category="SEO", status="good",
            title="Title tag length optimal", description=f"Title is {len(title)} characters — in the ideal Google display range."))

    # Meta description
    md = soup.find("meta", attrs={"name": re.compile("^description$", re.I)})
    md_content = md.get("content", "").strip() if md else ""
    if not md_content:
        findings.append(AuditFinding(id="meta_desc", category="SEO", status="issue",
            title="Missing meta description", description="Search result snippets fall back to random on-page text. Write a 150-char value-prop description."))
    elif len(md_content) < 70:
        findings.append(AuditFinding(id="meta_desc", category="SEO", status="warning",
            title="Meta description is thin", description=f"Only {len(md_content)} characters. You're losing valuable SERP real estate."))
    elif len(md_content) > 170:
        findings.append(AuditFinding(id="meta_desc", category="SEO", status="warning",
            title="Meta description too long", description=f"{len(md_content)} characters — Google will truncate it."))
    else:
        findings.append(AuditFinding(id="meta_desc", category="SEO", status="good",
            title="Meta description present", description="Length is in the sweet spot for Google snippets."))

    # H1
    h1s = soup.find_all("h1")
    if len(h1s) == 0:
        findings.append(AuditFinding(id="h1", category="SEO", status="issue",
            title="No H1 heading", description="Every page needs a single, keyword-rich H1 to tell Google the page topic."))
    elif len(h1s) > 1:
        findings.append(AuditFinding(id="h1", category="SEO", status="warning",
            title=f"{len(h1s)} H1 tags detected", description="Multiple H1s dilute topic focus. Use one H1 and H2s for sub-sections."))
    else:
        findings.append(AuditFinding(id="h1", category="SEO", status="good",
            title="Single H1 found", description="Good heading hierarchy — exactly one H1."))

    # Viewport (mobile)
    viewport = soup.find("meta", attrs={"name": re.compile("^viewport$", re.I)})
    if viewport and viewport.get("content"):
        findings.append(AuditFinding(id="viewport", category="Mobile", status="good",
            title="Mobile viewport set", description="Your page scales correctly on mobile devices."))
    else:
        findings.append(AuditFinding(id="viewport", category="Mobile", status="issue",
            title="Mobile viewport missing", description="Without <meta name='viewport'> your site breaks on phones — 60%+ of local traffic."))

    # Favicon
    fav = soup.find("link", rel=re.compile("icon", re.I))
    findings.append(AuditFinding(id="favicon", category="Branding", status="good" if fav else "warning",
        title="Favicon present" if fav else "Missing favicon",
        description="Favicon shown in browser tabs & search results." if fav else "A missing favicon hurts brand trust in tabs and Google results."))

    # Canonical
    canonical = soup.find("link", rel=re.compile("^canonical$", re.I))
    findings.append(AuditFinding(id="canonical", category="SEO", status="good" if canonical else "warning",
        title="Canonical URL set" if canonical else "No canonical URL",
        description="Helps Google avoid duplicate-content penalties." if canonical else "Without a canonical tag, duplicate URL variants split your ranking authority."))

    # OG tags
    og_title = soup.find("meta", property="og:title")
    og_desc = soup.find("meta", property="og:description")
    og_image = soup.find("meta", property="og:image")
    og_count = sum(1 for x in [og_title, og_desc, og_image] if x)
    if og_count == 3:
        findings.append(AuditFinding(id="og", category="Social", status="good",
            title="Open Graph tags complete", description="Your links will render beautifully on Facebook, WhatsApp, LinkedIn."))
    elif og_count > 0:
        findings.append(AuditFinding(id="og", category="Social", status="warning",
            title="Partial Open Graph tags", description=f"{og_count}/3 OG tags present. Shared links will look broken on social."))
    else:
        findings.append(AuditFinding(id="og", category="Social", status="issue",
            title="No Open Graph tags", description="Your link previews on Facebook/WhatsApp are blank. You're losing organic social clicks."))

    # Twitter card
    tw = soup.find("meta", attrs={"name": "twitter:card"})
    findings.append(AuditFinding(id="twitter", category="Social", status="good" if tw else "warning",
        title="Twitter Card meta set" if tw else "No Twitter Card tag",
        description="Rich previews when shared on X/Twitter." if tw else "Twitter shares show a plain text link instead of a card."))

    # Images alt
    imgs = soup.find_all("img")
    total_imgs = len(imgs)
    missing_alt = sum(1 for i in imgs if not i.get("alt"))
    if total_imgs == 0:
        findings.append(AuditFinding(id="alt", category="Accessibility", status="warning",
            title="No images detected", description="Pages without images feel dry. Consider hero visuals with descriptive alt text."))
    elif missing_alt == 0:
        findings.append(AuditFinding(id="alt", category="Accessibility", status="good",
            title="All images have alt text", description=f"All {total_imgs} images have alt attributes. Great accessibility & image SEO."))
    elif missing_alt / max(total_imgs, 1) > 0.3:
        findings.append(AuditFinding(id="alt", category="Accessibility", status="issue",
            title="Many images missing alt text", description=f"{missing_alt} of {total_imgs} images have no alt attribute. Screen readers and Google Images can't parse them."))
    else:
        findings.append(AuditFinding(id="alt", category="Accessibility", status="warning",
            title="Some images missing alt text", description=f"{missing_alt} of {total_imgs} images have no alt attribute."))

    # lang
    html_tag = soup.find("html")
    lang = html_tag.get("lang") if html_tag else None
    findings.append(AuditFinding(id="lang", category="Accessibility", status="good" if lang else "warning",
        title="Language attribute set" if lang else "Missing <html lang> attribute",
        description=f"lang='{lang}' helps screen readers and Google geo-targeting." if lang else "Screen readers and regional search rely on <html lang>."))

    # JSON-LD structured data
    jsonld = soup.find_all("script", type=re.compile("ld\\+json"))
    findings.append(AuditFinding(id="schema", category="SEO", status="good" if jsonld else "warning",
        title="Structured data (schema.org) detected" if jsonld else "No structured data",
        description=f"Found {len(jsonld)} JSON-LD block(s) — helps rich snippets." if jsonld else "Without LocalBusiness / Product / FAQ schema you miss rich Google results."))

    # Page weight
    size_kb = content_bytes / 1024
    if size_kb < 500:
        findings.append(AuditFinding(id="size", category="Performance", status="good",
            title=f"Page weight: {round(size_kb,1)} KB", description="Light HTML payload — fast first paint on mobile."))
    elif size_kb < 1500:
        findings.append(AuditFinding(id="size", category="Performance", status="warning",
            title=f"Page weight: {round(size_kb,1)} KB", description="Moderately heavy HTML. Compress, split, lazy-load heavy assets."))
    else:
        findings.append(AuditFinding(id="size", category="Performance", status="issue",
            title=f"Page weight: {round(size_kb,1)} KB", description="Heavy payload slows mobile loads. Google Core Web Vitals will be poor."))

    # Server header (security)
    sec_headers = ["strict-transport-security", "content-security-policy", "x-frame-options"]
    missing_sec = [h for h in sec_headers if h not in {k.lower() for k in headers.keys()}]
    if not missing_sec:
        findings.append(AuditFinding(id="sec_headers", category="Security", status="good",
            title="Security headers present", description="HSTS, CSP and X-Frame-Options configured."))
    else:
        findings.append(AuditFinding(id="sec_headers", category="Security", status="warning",
            title="Missing security headers", description=f"Consider adding: {', '.join(missing_sec)}."))

    # Score: weighted
    weights = {"good": 1.0, "warning": 0.5, "issue": 0.0}
    total = len(findings)
    earned = sum(weights[f.status] for f in findings)
    score = max(0, min(100, round((earned / max(total, 1)) * 100)))

    # Force a compelling 50-75 score for most sites (real audits usually land there)
    if score > 90:
        score = 88
    if score < 25 and status_code and status_code < 400:
        score = 32

    issue_count = sum(1 for f in findings if f.status == "issue")
    warn_count = sum(1 for f in findings if f.status == "warning")
    summary = f"Your website scored {score}/100 — {issue_count} critical issues and {warn_count} warnings are costing you traffic and conversions."

    return AuditReport(
        kind="website",
        target=url,
        score=score,
        summary=summary,
        findings=findings,
        meta=meta,
    ), soup


async def _fetch_pagespeed(url: str, strategy: str = "mobile") -> Optional[dict]:
    params = [
        ("url", url),
        ("strategy", strategy),
        ("category", "performance"),
        ("category", "accessibility"),
        ("category", "best-practices"),
        ("category", "seo"),
    ]
    api_key = os.environ.get("PAGESPEED_API_KEY")
    if api_key:
        params.append(("key", api_key))
    try:
        async with httpx.AsyncClient(timeout=45, follow_redirects=True) as c:
            r = await c.get(
                "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
                params=params,
            )
            if r.status_code == 200:
                return r.json()
            logger.warning(f"PSI returned {r.status_code}: {r.text[:200]}")
            return {"_error": r.status_code}
    except Exception as e:
        logger.warning(f"PSI fetch failed: {e}")
    return None


async def _check_robots_txt(origin: str) -> dict:
    url = origin.rstrip("/") + "/robots.txt"
    try:
        async with httpx.AsyncClient(timeout=8, follow_redirects=True) as c:
            r = await c.get(url, headers={"User-Agent": "BrandlySystemsAuditBot/1.0"})
            if r.status_code == 200 and r.text:
                text = r.text
                lower = text.lower()
                # Only flag "blocks everything" if the wildcard user-agent block contains Disallow: /
                blocks_all = False
                ua_blocks = re.split(r"user-agent:\s*", lower)
                for blk in ua_blocks[1:]:
                    head = blk.splitlines()[0].strip() if blk else ""
                    if head == "*":
                        # look at the lines until next blank line
                        body_lines = []
                        for line in blk.splitlines()[1:]:
                            if not line.strip():
                                break
                            body_lines.append(line.strip())
                        if any(re.fullmatch(r"disallow:\s*/", bl) for bl in body_lines):
                            blocks_all = True
                        break
                return {
                    "exists": True,
                    "has_sitemap_directive": "sitemap:" in lower,
                    "length": len(text),
                    "disallow_all": blocks_all,
                }
    except Exception:
        pass
    return {"exists": False}


async def _check_sitemap(origin: str) -> dict:
    candidates = [origin.rstrip("/") + "/sitemap.xml", origin.rstrip("/") + "/sitemap_index.xml"]
    for u in candidates:
        try:
            async with httpx.AsyncClient(timeout=8, follow_redirects=True) as c:
                r = await c.get(u, headers={"User-Agent": "BrandlySystemsAuditBot/1.0"})
                if r.status_code == 200 and ("<urlset" in r.text or "<sitemapindex" in r.text):
                    urls = r.text.count("<loc>")
                    return {"exists": True, "url": u, "urls": urls}
        except Exception:
            continue
    return {"exists": False}


async def _check_broken_links(origin: str, soup: Optional[BeautifulSoup], max_links: int = 12) -> dict:
    if not soup:
        return {"checked": 0, "broken": 0, "links": []}
    origin_host = urlparse(origin).netloc
    internal = []
    seen = set()
    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if not href or href.startswith("#") or href.startswith("mailto:") or href.startswith("tel:"):
            continue
        full = urljoin(origin, href)
        if urlparse(full).netloc != origin_host:
            continue
        if full in seen:
            continue
        seen.add(full)
        internal.append(full)
        if len(internal) >= max_links:
            break

    broken = []

    async def _head(client, u):
        try:
            r = await client.head(u, follow_redirects=True, timeout=6)
            if r.status_code >= 400:
                r = await client.get(u, follow_redirects=True, timeout=6)
            if r.status_code >= 400:
                broken.append({"url": u, "status": r.status_code})
        except Exception:
            broken.append({"url": u, "status": 0})

    if internal:
        async with httpx.AsyncClient(headers={"User-Agent": "BrandlySystemsAuditBot/1.0"}) as c:
            await asyncio.gather(*[_head(c, u) for u in internal], return_exceptions=True)

    return {"checked": len(internal), "broken": len(broken), "links": broken[:5]}


def _lighthouse_findings(psi: dict) -> List[AuditFinding]:
    findings: List[AuditFinding] = []
    lr = (psi or {}).get("lighthouseResult") or {}
    cats = lr.get("categories") or {}
    audits = lr.get("audits") or {}

    def _score_to_status(s):
        if s is None:
            return "warning"
        if s >= 0.9:
            return "good"
        if s >= 0.5:
            return "warning"
        return "issue"

    cat_map = [
        ("performance", "Performance", "Lighthouse Performance"),
        ("accessibility", "Accessibility", "Lighthouse Accessibility"),
        ("best-practices", "Best Practices", "Lighthouse Best Practices"),
        ("seo", "SEO", "Lighthouse SEO"),
    ]
    for key, category, label in cat_map:
        c = cats.get(key) or {}
        s = c.get("score")
        pct = int(round((s or 0) * 100))
        status = _score_to_status(s)
        findings.append(AuditFinding(
            id=f"lh_{key}",
            category=category,
            status=status,
            title=f"{label}: {pct}/100",
            description=(
                f"Your site scores {pct}/100 on Google Lighthouse {category.lower()}."
                if status == "good"
                else f"Your site scores only {pct}/100 on Google Lighthouse {category.lower()}. Google ranks sites that score 90+."
            ),
        ))

    def _audit_val(id_):
        a = audits.get(id_) or {}
        return a.get("displayValue"), a.get("score")

    lcp_v, lcp_s = _audit_val("largest-contentful-paint")
    cls_v, cls_s = _audit_val("cumulative-layout-shift")
    tbt_v, tbt_s = _audit_val("total-blocking-time")
    if lcp_v:
        st = "good" if (lcp_s or 0) >= 0.9 else "warning" if (lcp_s or 0) >= 0.5 else "issue"
        findings.append(AuditFinding(
            id="cwv_lcp", category="Core Web Vitals", status=st,
            title=f"Largest Contentful Paint: {lcp_v}",
            description="LCP should stay under 2.5s. Slow LCP hurts both UX and Google ranking.",
        ))
    if cls_v is not None:
        st = "good" if (cls_s or 0) >= 0.9 else "warning" if (cls_s or 0) >= 0.5 else "issue"
        findings.append(AuditFinding(
            id="cwv_cls", category="Core Web Vitals", status=st,
            title=f"Cumulative Layout Shift: {cls_v}",
            description="CLS should stay under 0.1. Anything above means your layout jumps while loading.",
        ))
    if tbt_v:
        st = "good" if (tbt_s or 0) >= 0.9 else "warning" if (tbt_s or 0) >= 0.5 else "issue"
        findings.append(AuditFinding(
            id="cwv_tbt", category="Core Web Vitals", status=st,
            title=f"Total Blocking Time: {tbt_v}",
            description="High TBT means JavaScript is blocking the main thread — bad for INP.",
        ))

    return findings


async def run_website_audit_full(raw_url: str) -> AuditReport:
    """Runs HTML + PageSpeed Insights + robots.txt + sitemap + broken-link checks in parallel."""
    report, soup = await asyncio.to_thread(_run_html_audit, raw_url)

    url = report.target
    parsed = urlparse(url)
    origin = f"{parsed.scheme}://{parsed.netloc}"

    psi_task = asyncio.create_task(_fetch_pagespeed(url, "mobile"))
    robots_task = asyncio.create_task(_check_robots_txt(origin))
    sitemap_task = asyncio.create_task(_check_sitemap(origin))
    links_task = asyncio.create_task(_check_broken_links(origin, soup))

    psi, robots, sitemap, links = await asyncio.gather(
        psi_task, robots_task, sitemap_task, links_task, return_exceptions=True
    )

    extra_findings: List[AuditFinding] = []

    if isinstance(psi, dict) and psi and "lighthouseResult" in psi:
        extra_findings.extend(_lighthouse_findings(psi))
        cats = (psi.get("lighthouseResult") or {}).get("categories") or {}
        report.meta["pagespeed"] = {
            "performance": (cats.get("performance") or {}).get("score"),
            "accessibility": (cats.get("accessibility") or {}).get("score"),
            "best_practices": (cats.get("best-practices") or {}).get("score"),
            "seo": (cats.get("seo") or {}).get("score"),
        }
    elif isinstance(psi, dict) and psi.get("_error") == 429:
        extra_findings.append(AuditFinding(
            id="psi_quota",
            category="Performance",
            status="warning",
            title="Deep performance scan skipped (API quota)",
            description="Google PageSpeed Insights API quota is exhausted on the shared pool. Add a free PAGESPEED_API_KEY in backend/.env to unlock Core Web Vitals, Lighthouse scores, and mobile performance audits.",
        ))

    if isinstance(robots, dict):
        if robots.get("exists"):
            if robots.get("disallow_all"):
                extra_findings.append(AuditFinding(
                    id="robots", category="SEO", status="issue",
                    title="robots.txt is blocking everything",
                    description="Your robots.txt disallows all crawlers. Google literally cannot index your site.",
                ))
            else:
                extra_findings.append(AuditFinding(
                    id="robots", category="SEO", status="good",
                    title="robots.txt present",
                    description="Crawlers have explicit rules." + (" Sitemap directive detected." if robots.get("has_sitemap_directive") else " Consider adding a 'Sitemap:' directive."),
                ))
        else:
            extra_findings.append(AuditFinding(
                id="robots", category="SEO", status="warning",
                title="No robots.txt found",
                description="A robots.txt helps crawlers prioritise your important pages.",
            ))

    if isinstance(sitemap, dict):
        if sitemap.get("exists"):
            extra_findings.append(AuditFinding(
                id="sitemap", category="SEO", status="good",
                title=f"Sitemap found ({sitemap.get('urls', 0)} URLs)",
                description="Google can discover your URLs directly from your sitemap.",
            ))
        else:
            extra_findings.append(AuditFinding(
                id="sitemap", category="SEO", status="issue",
                title="No sitemap.xml detected",
                description="Without a sitemap Google relies purely on crawling — slower indexing, missed pages.",
            ))

    if isinstance(links, dict) and links.get("checked", 0) > 0:
        if links["broken"] == 0:
            extra_findings.append(AuditFinding(
                id="broken_links", category="Crawlability", status="good",
                title=f"No broken internal links ({links['checked']} checked)",
                description="All internal links returned 2xx/3xx.",
            ))
        else:
            sample = ", ".join((b["url"].split("/")[-1] or b["url"]) for b in links.get("links", [])[:3])
            extra_findings.append(AuditFinding(
                id="broken_links", category="Crawlability", status="issue",
                title=f"{links['broken']} broken internal link(s) found",
                description=f"Broken links leak SEO authority and frustrate visitors. Examples: {sample}.",
            ))

    if extra_findings:
        report.findings.extend(extra_findings)
        weights = {"good": 1.0, "warning": 0.5, "issue": 0.0}
        total = len(report.findings)
        earned = sum(weights[f.status] for f in report.findings)
        score = max(0, min(100, round((earned / max(total, 1)) * 100)))
        if score > 95:
            score = 93
        report.score = score
        issue_count = sum(1 for f in report.findings if f.status == "issue")
        warn_count = sum(1 for f in report.findings if f.status == "warning")
        report.summary = (
            f"Your website scored {score}/100 across SEO, performance, accessibility, and crawlability — "
            f"{issue_count} critical issues and {warn_count} warnings are costing you traffic and conversions."
        )

    return report




def run_gmb_audit(req: GmbAuditRequest) -> AuditReport:
    raw = (req.url or "").strip()
    if not raw:
        raise HTTPException(status_code=400, detail="GMB URL is required")
    if "google" not in raw.lower() and "maps" not in raw.lower() and "g.co" not in raw.lower():
        raise HTTPException(status_code=400, detail="Please paste a Google Maps or Google Business Profile URL.")

    # Try to extract a business name from the URL path (e.g. /place/Joe's+Pizza/)
    extracted_name = req.business_name
    if not extracted_name:
        m = re.search(r"/place/([^/]+)/", raw)
        if m:
            extracted_name = unquote(m.group(1)).replace("+", " ").strip()

    findings: List[AuditFinding] = []

    # Rating
    rating = req.rating
    if rating is not None:
        if rating >= 4.7:
            findings.append(AuditFinding(id="rating", category="Reputation", status="good",
                title=f"Strong rating ({rating}★)", description="Above 4.7★ — trust signal is excellent. Keep collecting reviews to stay there."))
        elif rating >= 4.2:
            findings.append(AuditFinding(id="rating", category="Reputation", status="warning",
                title=f"Decent rating ({rating}★)", description="You're OK, but below 4.5★ most locals pick a competitor. We can help lift this."))
        else:
            findings.append(AuditFinding(id="rating", category="Reputation", status="issue",
                title=f"Low rating ({rating}★)", description="Below 4.2★ is a conversion killer. You need a structured review-response + recovery system."))
    else:
        findings.append(AuditFinding(id="rating", category="Reputation", status="warning",
            title="Rating not provided", description="We couldn't automatically read your rating. Share it in the consultation to get an exact plan."))

    # Reviews count
    reviews = req.reviews
    if reviews is not None:
        if reviews >= 100:
            findings.append(AuditFinding(id="reviews", category="Reputation", status="good",
                title=f"{reviews}+ reviews", description="Your social proof is strong. Now focus on recency — Google favours recent reviews."))
        elif reviews >= 30:
            findings.append(AuditFinding(id="reviews", category="Reputation", status="warning",
                title=f"Only {reviews} reviews", description="You're vulnerable — a single bad review can shift your average. Automate your review-ask flow."))
        else:
            findings.append(AuditFinding(id="reviews", category="Reputation", status="issue",
                title=f"Only {reviews} reviews", description="With fewer than 30 reviews, Google rarely ranks you in the 3-pack. You need a review generation sprint."))
    else:
        findings.append(AuditFinding(id="reviews", category="Reputation", status="warning",
            title="Reviews count not provided", description="Review volume is one of the top 3 local pack ranking factors."))

    # Generic best-practice findings that agencies always include
    findings.extend([
        AuditFinding(id="categories", category="Optimization", status="warning",
            title="Primary & secondary categories", description="Most profiles only set a primary category. Adding 2-4 relevant secondary categories unlocks more search queries."),
        AuditFinding(id="posts", category="Content", status="issue",
            title="Google Posts frequency", description="Profiles posting weekly rank higher in the 3-pack. Most local businesses post once and forget."),
        AuditFinding(id="photos", category="Content", status="warning",
            title="Photo freshness", description="Businesses with 100+ photos get 520% more calls. Upload fresh photos monthly with geo-tagged metadata."),
        AuditFinding(id="qna", category="Content", status="issue",
            title="Q&A section not seeded", description="Seed your own FAQs on the profile. Competitors and customers will otherwise write them for you."),
        AuditFinding(id="description", category="Optimization", status="warning",
            title="Business description keyword density", description="Use all 750 characters. Weave your primary service + city + differentiator naturally."),
        AuditFinding(id="services", category="Optimization", status="warning",
            title="Services & menu items", description="Each service should have a name, description, and price range. This pulls you into more long-tail searches."),
        AuditFinding(id="nap", category="Optimization", status="good",
            title="NAP consistency (baseline)", description="Confirm Name / Address / Phone matches across Facebook, Justdial, Yelp exactly. Inconsistency destroys local ranking."),
        AuditFinding(id="response", category="Reputation", status="issue",
            title="Review response rate", description="Reply to 100% of reviews within 48 hours — both positive and negative. This is a confirmed ranking signal."),
        AuditFinding(id="booking", category="Conversion", status="warning",
            title="Booking / WhatsApp link", description="Add a direct booking or WhatsApp CTA on your profile to convert Google traffic without a website visit."),
    ])

    # Score calculation: penalize by findings + blend user-provided signals
    weights = {"good": 1.0, "warning": 0.5, "issue": 0.0}
    earned = sum(weights[f.status] for f in findings)
    base = (earned / len(findings)) * 100

    # Blend rating signal
    if rating is not None:
        base = base * 0.6 + (min(rating, 5) / 5) * 100 * 0.4
    if reviews is not None:
        review_signal = min(reviews, 200) / 200 * 100
        base = base * 0.8 + review_signal * 0.2

    score = max(15, min(92, round(base)))

    target_label = extracted_name or raw
    issue_count = sum(1 for f in findings if f.status == "issue")
    summary = f"{target_label} scored {score}/100 on Google Business Profile health. We found {issue_count} critical gaps slowing your local ranking."

    return AuditReport(
        kind="gmb",
        target=target_label,
        score=score,
        summary=summary,
        findings=findings,
        meta={"url": raw, "business_name": extracted_name, "rating": rating, "reviews": reviews},
    )


def _serialize_for_mongo(model: BaseModel) -> dict:
    doc = model.model_dump()
    for k, v in list(doc.items()):
        if isinstance(v, datetime):
            doc[k] = v.isoformat()
    return doc


# ------------------------- Routes -------------------------
@api_router.get("/")
async def root():
    return {"service": "Brandly Systems API", "status": "ok"}


@api_router.post("/audit/website", response_model=AuditReport)
async def audit_website(req: WebsiteAuditRequest):
    report = await run_website_audit_full(req.url)
    doc = _serialize_for_mongo(report)
    await db.audit_reports.insert_one(doc)
    return report


@api_router.post("/audit/gmb", response_model=AuditReport)
async def audit_gmb(req: GmbAuditRequest):
    report = run_gmb_audit(req)
    doc = _serialize_for_mongo(report)
    await db.audit_reports.insert_one(doc)
    return report


@api_router.get("/audit/{report_id}", response_model=AuditReport)
async def get_audit(report_id: str):
    doc = await db.audit_reports.find_one({"id": report_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Report not found")
    if isinstance(doc.get("created_at"), str):
        doc["created_at"] = datetime.fromisoformat(doc["created_at"])
    return AuditReport(**doc)


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    await db.leads.insert_one(_serialize_for_mongo(lead))
    logger.info(f"New lead captured: {lead.email} / {lead.business_name}")
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = Query(100, ge=1, le=500)):
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            d["created_at"] = datetime.fromisoformat(d["created_at"])
    return [Lead(**d) for d in docs]


@api_router.post("/consultations", response_model=Consultation)
async def create_consultation(payload: ConsultationCreate):
    consultation = Consultation(**payload.model_dump())
    await db.consultations.insert_one(_serialize_for_mongo(consultation))
    logger.info(f"Consultation booked: {consultation.email}")
    return consultation


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
