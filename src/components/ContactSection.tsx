"use client";

import Link from "next/link";

export default function ContactSection() {
  return (
    <section
      className="glass mt-16"
      style={{ padding: "40px 38px" }}
    >
      {/* Developer Information */}
      <div
        className="p-5 rounded-[14px]"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid var(--panel-border)",
        }}
      >
        <h3
          className="font-bold mb-3"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "var(--ink)",
          }}
        >
          👩‍💻 Developer Information
        </h3>

        <p style={{ color: "var(--ink-dim)" }}>
          <strong>Name:</strong> Shilpa M
        </p>

        <p style={{ color: "var(--ink-dim)" }}>
          <strong>Email:</strong> shilpareddybm2006@gmail.com
        </p>
      </div>

      {/* Digital Heroes Button */}
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
    </section>
  );
}