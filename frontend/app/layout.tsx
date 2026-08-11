import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoToTop from "@/components/GoToTop";
import CookieBanner from "@/components/CookieBanner";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Xeven Pixels — Digital Agency",
  description:
    "Xeven Pixels is a full-service digital agency: branding, website design, SEO, content, social media, and website maintenance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} font-body`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
          <GoToTop />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
