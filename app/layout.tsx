import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Check AQI For",
  description: "Check Air Quality Index for cities and countries",
};

type Props = { children: ReactNode };

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-sky-600">
          <div className="py-5 px-3 max-w-4xl mx-auto">
            <a href="/" className="text-xl text-slate-200">
              Check AQI For
            </a>
          </div>
        </header>
        <div className="max-w-4xl mx-auto mt-5 px-3">{children}</div>
      </body>
    </html>
  );
}
