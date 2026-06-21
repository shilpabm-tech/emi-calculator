"use client";

import { useState, useCallback } from "react";
import AmbientBackground from "@/components/AmbientBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InputPanel from "@/components/InputPanel";
import ResultsPanel from "@/components/ResultsPanel";
import CTAStrip from "@/components/CTAStrip";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import { calculateEMI, DEFAULTS } from "@/lib/emi";
import type { LoanInputs, EMIResult } from "@/lib/emi";

export default function Home() {
  const [result, setResult] = useState<EMIResult>(() => calculateEMI(DEFAULTS));

  const handleCalculate = useCallback((inputs: LoanInputs) => {
    setResult(calculateEMI(inputs));
  }, []);

  return (
    <>
      <AmbientBackground />

      <main
        id="top"
        style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px 80px" }}
      >
        <Header />
        <HeroSection />

        {/* Main dashboard grid — responsive via globals.css */}
        <div className="dashboard-grid">
          <InputPanel onCalculate={handleCalculate} />
          <ResultsPanel result={result} />
        </div>

        {/* CTA strip */}
        <Reveal style={{ marginTop: 40 }}>
          <CTAStrip />
        </Reveal>

        {/* Contact section */}
        <Reveal style={{ marginTop: 0 }}>
          <ContactSection />
        </Reveal>

        {/* Footer */}
        <Reveal>
          <SiteFooter />
        </Reveal>
      </main>
    </>
  );
}
