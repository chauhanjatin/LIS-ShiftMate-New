import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShiftMate",
  description: "ShiftMate workforce management platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lexendDeca.variable} min-h-dvh antialiased`}
    >
      <body suppressHydrationWarning className="min-h-dvh bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
