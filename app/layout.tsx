import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Check AQI For",
  description: "Check Air Quality Index for cities and countries",
};

type Props = { children: ReactNode; countries: ReactNode };

export default function RootLayout({ children, countries }: Readonly<Props>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-sky-600">
          <div className="py-5 px-3 max-w-6xl mx-auto">
            <Link
              href="/"
              className="text-xl text-slate-200 hover:brightness-125"
            >
              Check AQI For
            </Link>
          </div>
        </header>
        <div className="max-w-6xl mx-auto mt-5 px-3 grid grid-cols-[30%_70%]">
          <div>{countries}</div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
