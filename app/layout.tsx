import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SoundProvider } from "@/providers/SoundProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Neetrick — Smarter tricks. Better everyday.",
  description:
    "An IT + marketing studio in Jamnagar building brands, products, and growth engines that actually move numbers.",
  openGraph: {
    title: "Neetrick — Smarter tricks. Better everyday.",
    description:
      "IT + marketing studio in Jamnagar, Gujarat. Brand, build, and grow with one partner.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable}`}
      >
        <ThemeProvider>
          <SoundProvider>
            <Loader />
            <Cursor />
            <SmoothScroll>
              <Nav />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
