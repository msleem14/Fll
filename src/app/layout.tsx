import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FLL Express Logistics | إف إل إل إكسبريس",
  description: "حلول لوجستية متكاملة للمطاعم والمتاجر - Integrated logistics solutions for restaurants and stores",
  keywords: "logistics, delivery, fleet management, restaurants, Saudi Arabia, لوجستيك, توصيل, أساطيل, مطاعم",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased bg-[#0a0a0a] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
