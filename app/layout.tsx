import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { fontMono, fontSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Flickz",
  description: "Next generation video creation tool",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
