import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Omar Hossam - AI Automation Engineer",
  description:
    "Portfolio of Omar Hossam, AI Automation Engineer specializing in building intelligent workflows and systems.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#0d0905", color: "#f0e6d6" }}>
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
