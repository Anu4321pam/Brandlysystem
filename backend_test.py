import os
import sys
import requests
from pathlib import Path
from dotenv import load_dotenv

# Load frontend env to get the public URL
load_dotenv(Path("/app/frontend/.env"))
BASE = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:8001").rstrip("/")
API = f"{BASE}/api"

passed = 0
failed = 0
failures = []


def check(name, cond, detail=""):
    global passed, failed
    if cond:
        passed += 1
        print(f"PASS: {name}")
    else:
        failed += 1
        failures.append((name, detail))
        print(f"FAIL: {name} :: {detail}")


def run():
    print(f"Using API base: {API}")
    # 1. root
    r = requests.get(f"{API}/", timeout=15)
    check("GET /api/ status", r.status_code == 200, f"{r.status_code} {r.text[:200]}")

    # 2. website audit - valid url
    r = requests.post(f"{API}/audit/website", json={"url": "https://example.com"}, timeout=30)
    check("POST /api/audit/website (example.com) status", r.status_code == 200, f"{r.status_code} {r.text[:300]}")
    report_id = None
    if r.status_code == 200:
        data = r.json()
        report_id = data.get("id")
        check("website audit has id", bool(report_id))
        score = data.get("score")
        check("website audit score int 0-100", isinstance(score, int) and 0 <= score <= 100, f"score={score}")
        findings = data.get("findings", [])
        check("website audit findings non-empty list", isinstance(findings, list) and len(findings) > 0, f"len={len(findings)}")
        statuses = {f.get("status") for f in findings}
        check("website audit findings status values valid", statuses.issubset({"good", "warning", "issue"}), f"{statuses}")
        check("website audit kind website", data.get("kind") == "website")

    # 3. website audit - invalid url
    r = requests.post(f"{API}/audit/website", json={"url": "   "}, timeout=15)
    check("POST /api/audit/website empty URL -> 400", r.status_code == 400, f"{r.status_code} {r.text[:200]}")

    # 4. website audit - unreachable URL still 200 with availability issue
    r = requests.post(
        f"{API}/audit/website",
        json={"url": "http://this-does-not-resolve-xyz.invalid"},
        timeout=30,
    )
    check("POST /api/audit/website unreachable -> 200", r.status_code == 200, f"{r.status_code} {r.text[:200]}")
    if r.status_code == 200:
        data = r.json()
        has_unreachable = any(
            f.get("id") == "reachable" or "unreachable" in f.get("title", "").lower()
            for f in data.get("findings", [])
        )
        check("unreachable URL has availability issue", has_unreachable, f"{data.get('findings')[:3]}")

    # 5. GMB audit - valid google maps URL
    gmb_url = "https://www.google.com/maps/place/Joe's+Pizza/@40.7,-74.0,17z"
    r = requests.post(
        f"{API}/audit/gmb",
        json={"url": gmb_url, "rating": 4.5, "reviews": 120},
        timeout=15,
    )
    check("POST /api/audit/gmb valid -> 200", r.status_code == 200, f"{r.status_code} {r.text[:200]}")
    gmb_id = None
    if r.status_code == 200:
        data = r.json()
        gmb_id = data.get("id")
        check("gmb has id", bool(gmb_id))
        check("gmb score int", isinstance(data.get("score"), int))
        check("gmb summary present", bool(data.get("summary")))
        check("gmb findings present", len(data.get("findings", [])) > 0)

    # 6. GMB audit - non-google URL rejected
    r = requests.post(f"{API}/audit/gmb", json={"url": "https://example.com"}, timeout=15)
    check("POST /api/audit/gmb non-google -> 400", r.status_code == 400, f"{r.status_code} {r.text[:200]}")

    # 7. GET /api/audit/{id} -> stored report
    if report_id:
        r = requests.get(f"{API}/audit/{report_id}", timeout=15)
        check("GET /api/audit/{id} -> 200", r.status_code == 200, f"{r.status_code} {r.text[:200]}")
        if r.status_code == 200:
            check("retrieved report id matches", r.json().get("id") == report_id)

    # 8. GET /api/audit/{bogus} -> 404
    r = requests.get(f"{API}/audit/non-existent-id-xyz-123", timeout=15)
    check("GET /api/audit/{bogus} -> 404", r.status_code == 404, f"{r.status_code}")

    # 9. POST /api/leads valid
    lead_payload = {
        "name": "Test User",
        "business_name": "Test Biz",
        "email": "test@example.com",
        "phone": "+1234567890",
        "report_id": report_id,
        "kind": "website",
        "source": "automated-test",
    }
    r = requests.post(f"{API}/leads", json=lead_payload, timeout=15)
    check("POST /api/leads valid -> 200", r.status_code == 200, f"{r.status_code} {r.text[:200]}")
    if r.status_code == 200:
        d = r.json()
        check("lead id present", bool(d.get("id")))
        check("no _id leak in lead", "_id" not in d)

    # 10. POST /api/leads invalid email
    bad_lead = dict(lead_payload)
    bad_lead["email"] = "not-an-email"
    r = requests.post(f"{API}/leads", json=bad_lead, timeout=15)
    check("POST /api/leads invalid email -> 422", r.status_code == 422, f"{r.status_code} {r.text[:200]}")

    # 11. GET /api/leads list
    r = requests.get(f"{API}/leads", timeout=15)
    check("GET /api/leads -> 200", r.status_code == 200, f"{r.status_code}")
    if r.status_code == 200:
        arr = r.json()
        check("leads is list", isinstance(arr, list))
        if arr:
            check("no _id leak in list", all("_id" not in x for x in arr))

    # 12. POST /api/consultations valid
    r = requests.post(
        f"{API}/consultations",
        json={
            "name": "Consult Tester",
            "email": "consult@example.com",
            "phone": "+1999999999",
            "business_name": "Biz",
            "message": "Want to talk",
        },
        timeout=15,
    )
    check("POST /api/consultations valid -> 200", r.status_code == 200, f"{r.status_code} {r.text[:200]}")

    # 13. POST /api/consultations invalid email
    r = requests.post(
        f"{API}/consultations",
        json={"name": "x", "email": "invalid", "phone": "+1"},
        timeout=15,
    )
    check("POST /api/consultations invalid email -> 422", r.status_code == 422, f"{r.status_code}")

    print(f"\n=== {passed} passed, {failed} failed ===")
    if failures:
        for n, d in failures:
            print(f"  - {n}: {d}")
    return failed == 0


if __name__ == "__main__":
    ok = run()
    sys.exit(0 if ok else 1)
