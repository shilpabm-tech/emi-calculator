"use client";

import { useEffect, useRef, useState } from "react";
import type { EMIResult } from "@/lib/emi";
import { fmtINR } from "@/lib/emi";

interface ResultsPanelProps {
  result: EMIResult | null;
}

function useCountUp(target: number, duration = 650): number {
  const [current, setCurrent] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = target;
    const start = performance.now();

    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(from + (target - from) * eased);
      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, [target, duration]);

  return current;
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  const emi = useCountUp(result?.emi ?? 0);
  const interest = useCountUp(result?.totalInterest ?? 0);
  const total = useCountUp(result?.totalPayment ?? 0);

  const principalPct = result?.principalPct ?? 50;
  const interestPct = result?.interestPct ?? 50;

  return (
    <div
      className="flex flex-col gap-5"
      style={{ animation: "rise 0.7s 0.18s var(--ease) both" }}
    >
      {/* Main EMI display */}
      <div
        className="glass text-center"
        style={{ padding: "30px" }}
      >
        <div
          className="text-[12px] uppercase tracking-[1.4px] mb-3"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--ink-faint)" }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5d6b80"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "inline", verticalAlign: -2, marginRight: 6 }}
          >
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
          </svg>
          Monthly EMI
        </div>

        <div
          id="emiValue"
          className="font-bold tracking-[-1px] leading-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(36px, 5vw, 50px)",
            color: "var(--mint)",
          }}
        >
          {fmtINR(emi)}
          <small
            className="font-semibold"
            style={{ fontSize: "0.4em", color: "var(--ink-dim)" }}
          >
            /mo
          </small>
        </div>

        <div className="mt-[10px] text-[13px]" style={{ color: "var(--ink-faint)" }}>
          based on the figures provided
        </div>
      </div>

      {/* Interest + Total row */}
      <div className="stat-row-responsive reveal-stagger in-view">
        {/* Total Interest */}
        <div className="glass stat-card interest" style={{ padding: 22 }}>
          <div
            className="flex items-center justify-center w-8 h-8 rounded-[10px] mb-[14px] transition-transform duration-300"
            style={{
              background: "rgba(242,200,121,0.16)",
              border: "1px solid rgba(242,200,121,0.3)",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f2c879" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="text-[12.5px] mb-2" style={{ color: "var(--ink-dim)" }}>
            Total Interest
          </div>
          <div
            id="interestValue"
            className="font-semibold text-[21px]"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--ink)" }}
          >
            {fmtINR(interest)}
          </div>
        </div>

        {/* Total Payment */}
        <div className="glass stat-card total" style={{ padding: 22 }}>
          <div
            className="flex items-center justify-center w-8 h-8 rounded-[10px] mb-[14px]"
            style={{
              background: "rgba(91,140,255,0.18)",
              border: "1px solid rgba(91,140,255,0.32)",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7da2ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
              <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
            </svg>
          </div>
          <div className="text-[12.5px] mb-2" style={{ color: "var(--ink-dim)" }}>
            Total Payment
          </div>
          <div
            id="totalValue"
            className="font-semibold text-[21px]"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--ink)" }}
          >
            {fmtINR(total)}
          </div>
        </div>
      </div>

      {/* Breakdown bar */}
      <div className="glass" style={{ padding: "24px 26px 26px" }}>
        <div className="flex justify-between text-[13px] mb-[14px]" style={{ color: "var(--ink-dim)" }}>
          <span>Principal vs Interest</span>
          <span id="ratioLabel">
            {result
              ? `${principalPct.toFixed(1)}% / ${interestPct.toFixed(1)}%`
              : "—"}
          </span>
        </div>

        {/* Bar */}
        <div
          className="h-[10px] rounded-full overflow-hidden flex"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            id="segPrincipal"
            className="transition-all duration-500"
            style={{
              width: `${principalPct}%`,
              background: "linear-gradient(90deg, var(--mint), #1fae7b)",
              transitionTimingFunction: "var(--ease)",
            }}
          />
          <div
            id="segInterest"
            className="transition-all duration-500"
            style={{
              width: `${interestPct}%`,
              background: "linear-gradient(90deg, var(--gold), #c99a4a)",
              transitionTimingFunction: "var(--ease)",
            }}
          />
        </div>

        {/* Legend */}
        <div className="flex gap-[22px] mt-[14px] text-[12.5px]" style={{ color: "var(--ink-dim)" }}>
          <span className="flex items-center gap-[7px]">
            <i
              className="inline-block w-[9px] h-[9px] rounded-[3px]"
              style={{ background: "var(--mint)" }}
            />
            Principal
          </span>
          <span className="flex items-center gap-[7px]">
            <i
              className="inline-block w-[9px] h-[9px] rounded-[3px]"
              style={{ background: "var(--gold)" }}
            />
            Interest
          </span>
        </div>
      </div>
    </div>
  );
}
