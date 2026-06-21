export interface EMIResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  principalPct: number;
  interestPct: number;
}

export interface LoanInputs {
  principal: number;
  rate: number;
  tenure: number;
}

export const DEFAULTS: LoanInputs = {
  principal: 500000,
  rate: 8.5,
  tenure: 60,
};

export function calculateEMI(inputs: LoanInputs): EMIResult {
  const { principal: P, rate: annualRate, tenure: N } = inputs;
  const r = annualRate / 12 / 100;
  const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
  const totalPayment = emi * N;
  const totalInterest = totalPayment - P;
  const principalPct = (P / totalPayment) * 100;
  const interestPct = 100 - principalPct;
  return { emi, totalInterest, totalPayment, principalPct, interestPct };
}

export function fmtINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
