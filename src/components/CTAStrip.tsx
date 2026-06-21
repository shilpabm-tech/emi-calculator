"use client";

import Link from "next/link";

export default function CTAStrip() {
  return (
    <div className="mt-10 flex items-center justify-center">
      <Link
        href="https://digitalheroesco.com"
        target="_blank"
        rel="noopener noreferrer"
        id="builtForDigitalHeroesBtn"
        className="inline-flex items-center gap-[10px] no-underline px-[26px] py-[13px] rounded-full font-semibold text-[14.5px] transition-all duration-200"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          border: "1px solid var(--panel-border)",
          background: "var(--panel)",
          backdropFilter: "blur(16px)",
          color: "var(--ink)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(52,227,161,0.5)";
          e.currentTarget.style.boxShadow =
            "0 0 0 4px rgba(52,227,161,0.10), 0 16px 30px -16px rgba(52,227,161,0.5)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "";
          e.currentTarget.style.boxShadow = "";
          e.currentTarget.style.transform = "";
        }}
      >
        <span style={{ color: "var(--mint)" }}>✦</span>
        Built for Digital Heroes
      </Link>
    </div>
  );
}
