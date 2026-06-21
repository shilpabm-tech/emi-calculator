"use client";

export default function HeroSection() {
  return (
    <section
      className="mb-10"
      style={{ animation: "rise 0.8s 0.05s var(--ease) both" }}
    >
      {/* Eyebrow */}
      <div
        className="flex items-center gap-[10px] text-[12.5px] uppercase tracking-[1.6px] mb-[14px]"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--mint)" }}
      >
        <span
          className="inline-block w-[22px] h-px"
          style={{ background: "var(--mint)" }}
        />
        EMI Calculator
      </div>

      {/* Headline */}
      <h1
        className="font-bold mb-[14px] tracking-[-1px]"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(32px, 4.4vw, 52px)",
          lineHeight: 1.06,
          margin: "0 0 14px",
        }}
      >
        Know your monthly number
        <br />
        <span
          style={{
            background: "linear-gradient(95deg, var(--mint), var(--gold) 90%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          before you sign anything.
        </span>
      </h1>

      {/* Subtext */}
      <p
        className="text-[16px] leading-[1.65] mb-7 max-w-[540px]"
        style={{ color: "var(--ink-dim)" }}
      >
        Enter your loan amount, rate, and tenure to see exactly what you&apos;ll pay each
        month — and how much of it is interest.
      </p>

      {/* Hero stats pills */}
      <div className="flex flex-wrap gap-[14px]">
        {[
          {
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34e3a1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            ),
            label: (
              <span><strong style={{ color: "var(--ink)", fontWeight: 600 }}>Instant</strong> results</span>
            ),
          },
          {
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f2c879" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            ),
            label: (
              <span><strong style={{ color: "var(--ink)", fontWeight: 600 }}>Bank-grade</strong> accuracy</span>
            ),
          },
          {
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b7bff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            ),
            label: (
              <span><strong style={{ color: "var(--ink)", fontWeight: 600 }}>100%</strong> free, no signup</span>
            ),
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex items-center gap-[10px] px-[18px] py-[11px] rounded-full text-[13px] cursor-default transition-all duration-200"
            style={{
              border: "1px solid var(--panel-border)",
              background: "var(--panel)",
              backdropFilter: "blur(14px)",
              color: "var(--ink-dim)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(52,227,161,0.4)";
              (e.currentTarget as HTMLElement).style.background = "rgba(52,227,161,0.06)";
              (e.currentTarget as HTMLElement).style.color = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.borderColor = "";
              (e.currentTarget as HTMLElement).style.background = "var(--panel)";
              (e.currentTarget as HTMLElement).style.color = "var(--ink-dim)";
            }}
          >
            {stat.icon}
            {stat.label}
          </div>
        ))}
      </div>
    </section>
  );
}
