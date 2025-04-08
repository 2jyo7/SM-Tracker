import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SM-Tracker | Stay Aware of Your Web Time",
  description: "Track and manage your online activity with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-bl from-red-700 via-lime-500 to-purple-500`}
      >
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-h-screen p-6 pt-20 md:pt-6 md:ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
