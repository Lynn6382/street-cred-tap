import type { Metadata } from "next";
import { Anton, Geist_Mono, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const anton = Anton({
  variable: "--font-poster",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Street Cred Tap",
  description: "A zero-token Base onchain tap counter mini app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <head>
        <meta name="base:app_id" content="replace-with-base-dev-verify-token" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
