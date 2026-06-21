"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <section
      className="glass mt-16"
      style={{ padding: "40px 38px" }}
    >
      {/* Section head */}
      <div className="mb-[26px]">
        <div
          className="flex items-center gap-[10px] text-[12.5px] uppercase tracking-[1.6px] mb-[10px]"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--mint)" }}
        >
          <span
            className="inline-block w-[22px] h-px"
            style={{ background: "var(--mint)" }}
          />
          Get in touch
        </div>

        <h2
          className="font-bold text-[26px] m-0 mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#34e3a1"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "inline", verticalAlign: -3, marginRight: 8 }}
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          Want a custom repayment plan?
        </h2>

        <p
          className="text-[14.5px] leading-[1.6] m-0 max-w-[460px]"
          style={{ color: "var(--ink-dim)" }}
        >
          Enter your name and email to keep track of your loan planning and repayment estimates.
        </p>
      </div>

      {/* Form */}
      <form id="contactForm" onSubmit={(e) => e.preventDefault()}>
        <div className="contact-grid-responsive">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-[12.5px] font-medium mb-[9px]"
              style={{ color: "var(--ink-dim)" }}
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="e.g. Aanya Sharma"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full text-[14.5px] rounded-[14px] outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--panel-border)",
                color: "var(--ink)",
                fontFamily: "'Inter', sans-serif",
                padding: "14px 16px",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(52,227,161,0.55)";
                e.target.style.background = "rgba(52,227,161,0.045)";
                e.target.style.boxShadow = "0 0 0 4px rgba(52,227,161,0.10)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "";
                e.target.style.background = "rgba(255,255,255,0.03)";
                e.target.style.boxShadow = "";
              }}
              onMouseEnter={(e) => {
                if (document.activeElement !== e.target) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.045)";
                }
              }}
              onMouseLeave={(e) => {
                if (document.activeElement !== e.target) {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-[12.5px] font-medium mb-[9px]"
              style={{ color: "var(--ink-dim)" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. aanya@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-[14.5px] rounded-[14px] outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--panel-border)",
                color: "var(--ink)",
                fontFamily: "'Inter', sans-serif",
                padding: "14px 16px",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(52,227,161,0.55)";
                e.target.style.background = "rgba(52,227,161,0.045)";
                e.target.style.boxShadow = "0 0 0 4px rgba(52,227,161,0.10)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "";
                e.target.style.background = "rgba(255,255,255,0.03)";
                e.target.style.boxShadow = "";
              }}
              onMouseEnter={(e) => {
                if (document.activeElement !== e.target) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.045)";
                }
              }}
              onMouseLeave={(e) => {
                if (document.activeElement !== e.target) {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }
              }}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex items-center gap-4 flex-wrap">
          <Link
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            id="contactSubmitBtn"
            className="inline-flex items-center no-underline px-7 py-[14px] rounded-[14px] font-bold text-[14.5px] transition-all duration-200"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: "linear-gradient(135deg, var(--ink), #cbd5e1)",
              color: "#0a0e16",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 14px 28px -14px rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ verticalAlign: -2, marginRight: 7 }}
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Built for Digital Heroes
          </Link>
        </div>
      </form>
    </section>
  );
}
