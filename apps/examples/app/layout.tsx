import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "./components/ui/sonner";
import { SiteHeader } from "./components/site-header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "use-persistent-form | React Hook Form Persistence",
  description:
    "A hook for react-hook-form that persists form data to storage. View examples and installation instructions.",
  keywords: [
    "react",
    "react-hook-form",
    "form",
    "storage",
    "localStorage",
    "sessionStorage",
    "persistence",
  ],
  openGraph: {
    title: "use-persistent-form",
    description: "Persist React Hook Form data with ease",
    siteName: "use-persistent-form",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "use-persistent-form",
    description: "Persist React Hook Form data with ease",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SiteHeader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
