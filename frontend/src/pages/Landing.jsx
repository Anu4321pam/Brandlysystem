import { useRef, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OurWork from "@/components/OurWork";
import TrustLogos from "@/components/TrustLogos";
import Services from "@/components/Services";
import AuditTool from "@/components/AuditTool";
import Comparison from "@/components/Comparison";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Landing() {
  const [initialTab, setInitialTab] = useState("website");
  const auditRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToAudit = (tab = "website") => {
    setInitialTab(tab);
    auditRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div data-testid="landing-page" className="relative bg-[#0a0909] text-[#f4ebe0]">
      <div aria-hidden className="global-grain" />
      <Header onScrollToAudit={scrollToAudit} onScrollToContact={scrollToContact} />
      <main>
        <Hero onScrollToContact={scrollToContact} onScrollToAudit={scrollToAudit} />
        <OurWork />
        <TrustLogos />
        <Services onScrollToContact={scrollToContact} />
        <AuditTool ref={auditRef} initialTab={initialTab} onScrollToContact={scrollToContact} />
        <Comparison onScrollToContact={scrollToContact} />
        <Contact ref={contactRef} />
      </main>
      <Footer onScrollToContact={scrollToContact} />
    </div>
  );
}
