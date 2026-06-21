import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EMI Calculator — Plan Your Loan | Tenure Desk",
  description:
    "Free, instant EMI calculator. Enter loan amount, interest rate, and tenure to see exactly what you'll pay each month — and how much is interest. Bank-grade accuracy.",
  keywords: ["EMI calculator", "loan calculator", "interest calculator", "loan planning", "tenure desk"],
  openGraph: {
    title: "EMI Calculator — Plan Your Loan",
    description: "Know your monthly number before you sign anything.",
    type: "website",
    url: "https://digitalheroesco.com",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
