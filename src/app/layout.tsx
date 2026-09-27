import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = "Chavidu Bandara | Software Engineer";
const description = "Portfolio of Chavidu Bandara, a software engineer focused on full-stack web development, Java, Spring Boot, React, Next.js and AI-powered systems.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | Chavidu Bandara" },
  description,
  authors: [{ name: "Chavidu Bandara" }],
  creator: "Chavidu Bandara",
  keywords: ["Chavidu Bandara", "Software Engineer", "Full-stack development", "Java", "Spring Boot", "React", "Next.js", "AI-powered systems"],
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    siteName: "Chavidu Bandara",
    type: "website",
    locale: "en_LK",
  },
  twitter: { card: "summary_large_image", title, description },
  // Add metadataBase, the canonical URL and openGraph.url after deployment.
  // The file-based Open Graph image is also used by the Twitter card.
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={geist.variable}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
