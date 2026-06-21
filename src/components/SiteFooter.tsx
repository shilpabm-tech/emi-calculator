"use client";

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 pt-9" style={{ borderTop: "1px solid var(--panel-border)" }}>
      <div className="foot-grid-responsive">
        {/* Brand col */}
        <div>
          <div className="flex items-center gap-[10px] mb-3">
            <div
              className="flex items-center justify-center w-[30px] h-[30px] rounded-[9px] text-[14px] font-bold select-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#06150f",
                background: "linear-gradient(145deg, #5bffc1, #34e3a1 50%, #1c9c6c)",
                boxShadow: "0 8px 22px -8px rgba(52,227,161,0.55), 0 0 0 1px rgba(255,255,255,0.12) inset",
              }}
            >
              ₹
            </div>
            <span
              className="font-semibold text-[14.5px]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Tenure&nbsp;Desk
            </span>
          </div>
          <p
            className="text-[13px] leading-[1.7] m-0 max-w-[280px]"
            style={{ color: "var(--ink-faint)" }}
          >
            A free, instant EMI planning tool built to help borrowers understand the real cost of a
            loan before they commit.
          </p>
        </div>

        {/* Product col */}
        <div>
          <h4
            className="text-[12.5px] font-semibold uppercase tracking-[0.6px] m-0 mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--ink-dim)" }}
          >
            Product
          </h4>
          <ul className="list-none m-0 p-0 flex flex-col gap-[11px]">
            {[
              { label: "EMI Calculator", href: "#top" },
              { label: "Amortization Schedule", href: "#" },
              { label: "Loan Comparison", href: "#" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="no-underline text-[13.5px] inline-block transition-all duration-200"
                  style={{ color: "var(--ink-faint)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--mint)";
                    e.currentTarget.style.paddingLeft = "4px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--ink-faint)";
                    e.currentTarget.style.paddingLeft = "";
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company col */}
        <div>
          <h4
            className="text-[12.5px] font-semibold uppercase tracking-[0.6px] m-0 mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--ink-dim)" }}
          >
            Company
          </h4>
          <ul className="list-none m-0 p-0 flex flex-col gap-[11px]">
            {[
              { label: "Digital Heroes", href: "https://digitalheroesco.com", external: true },
              { label: "About", href: "#" },
              { label: "Privacy Policy", href: "#" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="no-underline text-[13.5px] inline-block transition-all duration-200"
                  style={{ color: "var(--ink-faint)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--mint)";
                    e.currentTarget.style.paddingLeft = "4px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--ink-faint)";
                    e.currentTarget.style.paddingLeft = "";
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div
        className="flex justify-between items-center flex-wrap gap-3 pt-6 text-[12.5px]"
        style={{
          borderTop: "1px solid var(--panel-border)",
          color: "var(--ink-faint)",
        }}
      >
        <span className="max-w-[560px] leading-[1.6]">
          EMI figures are estimates for planning purposes only and may differ from actual lender
          terms. © 2026 Tenure Desk. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
