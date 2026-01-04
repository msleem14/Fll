import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FLL Logistics | FLL لوجستيك",
  description: "حلول لوجستية متكاملة للمطاعم والمتاجر - Integrated logistics solutions for restaurants and stores",
  keywords: "logistics, delivery, fleet management, restaurants, Saudi Arabia, لوجستيك, توصيل, أساطيل, مطاعم",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

