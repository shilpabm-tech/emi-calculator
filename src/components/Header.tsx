"use client";

export default function Header() {
  return (
    <header
      className="flex items-center justify-between mb-12"
      style={{ animation: "dropIn 0.7s var(--ease) both" }}
    >
      <div className="flex items-center gap-3 group cursor-default">
        {/* Brand mark */}
        <div
          className="flex items-center justify-center w-[38px] h-[38px] rounded-[11px] text-[18px] font-bold select-none transition-transform duration-300"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "#06150f",
            background: "linear-gradient(145deg, #5bffc1, #34e3a1 50%, #1c9c6c)",
            boxShadow:
              "0 8px 22px -8px rgba(52,227,161,0.55), 0 0 0 1px rgba(255,255,255,0.12) inset",
          }}
        >
          <span className="group-hover:rotate-[-8deg] group-hover:scale-[1.06] transition-transform duration-300 inline-block">
            ₹
          </span>
        </div>

        <div>
          <div
            className="font-semibold text-[16.5px] tracking-[0.2px]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Tenure&nbsp;Desk
          </div>
          <div
            className="text-[11.5px] uppercase tracking-[0.4px]"
            style={{ color: "var(--ink-faint)" }}
          >
            Loan Planning Suite
          </div>
        </div>
      </div>

      {/* Live badge */}
      <div
        className="flex items-center gap-2 text-[12px] px-[14px] py-[7px] rounded-full backdrop-blur-sm"
        style={{
          color: "var(--ink-dim)",
          border: "1px solid var(--panel-border)",
          background: "var(--panel)",
        }}
      >
        <span
          className="pulse-dot w-[7px] h-[7px] rounded-full inline-block"
          style={{
            background: "var(--mint)",
            boxShadow: "0 0 10px var(--mint)",
          }}
        />
        Live calculation engine
      </div>
    </header>
  );
}
