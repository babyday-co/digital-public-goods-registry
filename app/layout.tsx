import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BabyDay Digital Public Goods Registry",
  description:
    "A blockchain-based registry for verifying and attributing child-health knowledge public goods.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 min-h-screen font-sans">
        <header className="bg-white border-b border-gray-200">
          <nav className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center gap-6">
            <Link
              href="/"
              className="font-bold text-blue-700 text-lg tracking-tight"
            >
              BabyDay Registry
            </Link>
            <div className="flex gap-4 text-sm text-gray-600">
              <Link href="/submit" className="hover:text-blue-600 transition-colors">
                Submit
              </Link>
              <Link href="/registry" className="hover:text-blue-600 transition-colors">
                Registry
              </Link>
              <Link href="/verify" className="hover:text-blue-600 transition-colors">
                Verify
              </Link>
            </div>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
        <footer className="text-center text-xs text-gray-400 py-6 border-t border-gray-200 mt-8">
          BabyDay Digital Public Goods Registry — Powered by Next.js, Prisma & Ethereum
        </footer>
      </body>
    </html>
  );
}

