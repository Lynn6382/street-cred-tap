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
        <meta name="base:app_id" content="6a229eff2280de924021e2ac" />
        <meta
          name="talentapp:project_verification"
          content="28f6b9e8326907a5d3a80ed998957deef817dc5cb7ebf37c317e952754c791e4d93b598daa06b0edc3e5ed31ddac82b8ecf11a61eda2d1a14de21969d4500864"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
