"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { DEFAULTS, fmtINR } from "@/lib/emi";
import type { LoanInputs } from "@/lib/emi";

interface InputPanelProps {
  onCalculate: (inputs: LoanInputs) => void;
}

interface FieldState {
  value: string;
  error: boolean;
}

function RangeFillInput({
  id,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const rangeRef = useRef<HTMLInputElement>(null);

  const getFill = (v: number) =>
    Math.min(100, Math.max(0, ((v - min) / (max - min)) * 100));

  useEffect(() => {
    if (rangeRef.current) {
      rangeRef.current.style.setProperty("--fill", getFill(value) + "%");
    }
  }, [value, min, max]);

  return (
    <input
      ref={rangeRef}
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full"
    />
  );
}

export default function InputPanel({ onCalculate }: InputPanelProps) {
  const [principal, setPrincipal] = useState<FieldState>({ value: String(DEFAULTS.principal), error: false });
  const [rate, setRate] = useState<FieldState>({ value: String(DEFAULTS.rate), error: false });
  const [tenure, setTenure] = useState<FieldState>({ value: String(DEFAULTS.tenure), error: false });
  const [globalErr, setGlobalErr] = useState(false);

  const validate = useCallback(() => {
    const p = parseFloat(principal.value);
    const r = parseFloat(rate.value);
    const t = parseFloat(tenure.value);

    const pErr = isNaN(p) || p < 1 || principal.value.trim() === "";
    const rErr = isNaN(r) || r < 0.01 || rate.value.trim() === "";
    const tErr = isNaN(t) || t < 1 || tenure.value.trim() === "";

    setPrincipal((s) => ({ ...s, error: pErr }));
    setRate((s) => ({ ...s, error: rErr }));
    setTenure((s) => ({ ...s, error: tErr }));

    if (pErr || rErr || tErr) {
      setGlobalErr(true);
      return false;
    }
    setGlobalErr(false);
    return { principal: p, rate: r, tenure: t } as LoanInputs;
  }, [principal.value, rate.value, tenure.value]);

  const handleCalculate = () => {
    const result = validate();
    if (result) onCalculate(result);
  };

  const handleReset = () => {
    setPrincipal({ value: String(DEFAULTS.principal), error: false });
    setRate({ value: String(DEFAULTS.rate), error: false });
    setTenure({ value: String(DEFAULTS.tenure), error: false });
    setGlobalErr(false);
    onCalculate(DEFAULTS);
  };

  const numVal = (s: string) => parseFloat(s) || 0;

  return (
    <div
      className="glass"
      style={{
        padding: "32px 30px 30px",
        animation: "rise 0.7s 0.1s var(--ease) both",
      }}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between mb-[26px]">
        <div
          className="font-semibold text-[18px]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Loan Details
        </div>
        <div
          className="flex items-center justify-center w-9 h-9 rounded-[11px]"
          style={{
            background: "linear-gradient(145deg, rgba(52,227,161,0.22), rgba(139,123,255,0.16))",
            border: "1px solid rgba(52,227,161,0.25)",
            boxShadow: "0 8px 20px -10px rgba(52,227,161,0.5)",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#34e3a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </div>
      </div>

      {/* Loan Amount */}
      <FieldGroup
        label="Loan Amount"
        liveValue={fmtINR(numVal(principal.value))}
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34e3a1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h7a4 4 0 0 0 0-8" />
          </svg>
        }
        error={principal.error}
        errorMsg="Enter a loan amount greater than 0."
      >
        <div
          className={`input-shell flex items-center rounded-[14px] transition-all duration-200 ${principal.error ? "shake-anim" : ""}`}
          style={{
            border: `1px solid ${principal.error ? "rgba(255,138,138,0.65)" : "var(--panel-border)"}`,
            background: principal.error ? "rgba(255,138,138,0.06)" : "rgba(255,255,255,0.03)",
          }}
          onFocus={(e) => {
            if (!principal.error) {
              e.currentTarget.style.borderColor = "rgba(52,227,161,0.55)";
              e.currentTarget.style.background = "rgba(52,227,161,0.045)";
              e.currentTarget.style.boxShadow = "0 0 0 4px rgba(52,227,161,0.10)";
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "";
            e.currentTarget.style.background = "";
            e.currentTarget.style.boxShadow = "";
          }}
        >
          <span
            className="pl-4 pr-1 font-medium text-[14.5px]"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--ink-faint)" }}
          >
            ₹
          </span>
          <input
            type="number"
            id="principal"
            value={principal.value}
            min={1000}
            step={1000}
            inputMode="numeric"
            className="flex-1 bg-transparent border-none outline-none text-[16.5px] font-semibold py-[15px] pr-[14px] pl-2"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--ink)" }}
            onChange={(e) => {
              setPrincipal({ value: e.target.value, error: false });
              setGlobalErr(false);
            }}
          />
          <span
            className="pr-4 text-[13px] whitespace-nowrap"
            style={{ color: "var(--ink-faint)" }}
          >
            INR
          </span>
        </div>
        <RangeFillInput
          id="principalRange"
          value={Math.min(10000000, Math.max(10000, numVal(principal.value)))}
          min={10000}
          max={10000000}
          step={10000}
          onChange={(v) => {
            setPrincipal({ value: String(v), error: false });
            setGlobalErr(false);
          }}
        />
      </FieldGroup>

      {/* Interest Rate */}
      <FieldGroup
        label="Interest Rate"
        liveValue={`${numVal(rate.value)}%`}
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f2c879" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="5" x2="5" y2="19" />
            <circle cx="6.5" cy="6.5" r="2.5" />
            <circle cx="17.5" cy="17.5" r="2.5" />
          </svg>
        }
        error={rate.error}
        errorMsg="Enter an interest rate greater than 0."
      >
        <div
          className="input-shell flex items-center rounded-[14px] transition-all duration-200"
          style={{
            border: `1px solid ${rate.error ? "rgba(255,138,138,0.65)" : "var(--panel-border)"}`,
            background: rate.error ? "rgba(255,138,138,0.06)" : "rgba(255,255,255,0.03)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(52,227,161,0.55)";
            e.currentTarget.style.background = "rgba(52,227,161,0.045)";
            e.currentTarget.style.boxShadow = "0 0 0 4px rgba(52,227,161,0.10)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "";
            e.currentTarget.style.background = "";
            e.currentTarget.style.boxShadow = "";
          }}
        >
          <input
            type="number"
            id="rate"
            value={rate.value}
            min={0.1}
            max={40}
            step={0.1}
            inputMode="decimal"
            className="flex-1 bg-transparent border-none outline-none text-[16.5px] font-semibold py-[15px] pl-4"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--ink)" }}
            onChange={(e) => {
              setRate({ value: e.target.value, error: false });
              setGlobalErr(false);
            }}
          />
          <span className="pr-4 text-[13px] whitespace-nowrap" style={{ color: "var(--ink-faint)" }}>
            % p.a.
          </span>
        </div>
        <RangeFillInput
          id="rateRange"
          value={Math.min(25, Math.max(1, numVal(rate.value)))}
          min={1}
          max={25}
          step={0.1}
          onChange={(v) => {
            setRate({ value: String(v), error: false });
            setGlobalErr(false);
          }}
        />
      </FieldGroup>

      {/* Loan Tenure */}
      <FieldGroup
        label="Loan Tenure"
        liveValue={`${parseInt(tenure.value) || 0} mo`}
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b7bff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        }
        error={tenure.error}
        errorMsg="Enter a tenure of at least 1 month."
        style={{ marginBottom: 30 }}
      >
        <div
          className="input-shell flex items-center rounded-[14px] transition-all duration-200"
          style={{
            border: `1px solid ${tenure.error ? "rgba(255,138,138,0.65)" : "var(--panel-border)"}`,
            background: tenure.error ? "rgba(255,138,138,0.06)" : "rgba(255,255,255,0.03)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(52,227,161,0.55)";
            e.currentTarget.style.background = "rgba(52,227,161,0.045)";
            e.currentTarget.style.boxShadow = "0 0 0 4px rgba(52,227,161,0.10)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "";
            e.currentTarget.style.background = "";
            e.currentTarget.style.boxShadow = "";
          }}
        >
          <input
            type="number"
            id="tenure"
            value={tenure.value}
            min={1}
            max={480}
            step={1}
            inputMode="numeric"
            className="flex-1 bg-transparent border-none outline-none text-[16.5px] font-semibold py-[15px] pl-4"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--ink)" }}
            onChange={(e) => {
              setTenure({ value: e.target.value, error: false });
              setGlobalErr(false);
            }}
          />
          <span className="pr-4 text-[13px] whitespace-nowrap" style={{ color: "var(--ink-faint)" }}>
            months
          </span>
        </div>
        <RangeFillInput
          id="tenureRange"
          value={Math.min(360, Math.max(3, numVal(tenure.value)))}
          min={3}
          max={360}
          step={1}
          onChange={(v) => {
            setTenure({ value: String(v), error: false });
            setGlobalErr(false);
          }}
        />

        {/* Global error */}
        {globalErr && (
          <p
            className="text-[12.5px] mt-2"
            style={{ color: "var(--danger)" }}
          >
            Please fill in all fields with valid values before calculating.
          </p>
        )}
      </FieldGroup>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          id="calcBtn"
          onClick={handleCalculate}
          className="flex-1 flex items-center justify-center gap-[10px] py-4 px-5 rounded-[14px] font-bold text-[15.5px] tracking-[0.2px] cursor-pointer transition-all duration-200"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: "#04140d",
            border: "none",
            background: "linear-gradient(135deg, #5bffc1, #34e3a1 55%, #1fae7b)",
            backgroundSize: "200% 200%",
            boxShadow: "0 14px 30px -12px rgba(52,227,161,0.55)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(52,227,161,0.7)";
            e.currentTarget.style.backgroundPosition = "100% 0%";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow = "0 14px 30px -12px rgba(52,227,161,0.55)";
            e.currentTarget.style.backgroundPosition = "";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.99)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          Calculate EMI
        </button>

        <button
          id="resetBtn"
          onClick={handleReset}
          type="button"
          aria-label="Reset to defaults"
          title="Reset to defaults"
          className="group flex items-center justify-center w-[52px] rounded-[14px] cursor-pointer transition-all duration-300"
          style={{
            border: "1px solid var(--panel-border)",
            background: "rgba(255,255,255,0.03)",
            color: "var(--ink-dim)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,138,138,0.5)";
            e.currentTarget.style.color = "var(--danger)";
            e.currentTarget.style.background = "rgba(255,138,138,0.06)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "";
            e.currentTarget.style.color = "var(--ink-dim)";
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            e.currentTarget.style.transform = "";
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 group-active:rotate-[-200deg]"
          >
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ---- Sub-component: FieldGroup ---- */
function FieldGroup({
  label,
  liveValue,
  icon,
  error,
  errorMsg,
  children,
  style,
}: {
  label: string;
  liveValue: string;
  icon: React.ReactNode;
  error: boolean;
  errorMsg: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="mb-[22px]" style={style}>
      <div className="flex justify-between items-baseline text-[13px] font-medium mb-[10px]" style={{ color: "var(--ink-dim)" }}>
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--mint)", fontSize: 13 }}>
          {liveValue}
        </span>
      </div>
      {children}
      {error && (
        <p className="text-[12px] mt-[7px]" style={{ color: "var(--danger)" }}>
          {errorMsg}
        </p>
      )}
    </div>
  );
}
