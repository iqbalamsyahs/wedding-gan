import type { Metadata } from "next";
import { Great_Vibes, Kranky, Gowun_Batang } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const kranky = Kranky({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kranky",
});

const gowunBatang = Gowun_Batang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gowun-batang",
});

export const metadata: Metadata = {
  title: "Wedding Invitation - Hani & GanGan",
  description: "Wedding invitation of Hani & GanGan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${greatVibes.variable} ${kranky.variable} ${gowunBatang.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
