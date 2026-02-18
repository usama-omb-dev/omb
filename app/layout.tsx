import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const aeonik = localFont({
  src: [
    {
      path: "./fonts/Aeonik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Aeonik-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Aeonik-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Aeonik-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-aeonik",
});

const nexa = localFont({
  src: [
    {
      path: "./fonts/NexaBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nexa",
});

export const metadata: Metadata = {
  title: "OMB",
  description: "Online Marketing Bakery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${aeonik.className} ${nexa.variable} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
