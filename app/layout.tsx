import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getBuilderSettings } from "../lib/builder-settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fetch settings and generate metadata
async function getMetadata(): Promise<Metadata> {
  const settings = await getBuilderSettings();
  
  return {
    title: settings?.title || settings?.siteName || "Ryteplan",
    description: settings?.description || "Ryteplan is a platform for college search, planning, and management.",
    ...(settings?.ogImage && {
      openGraph: {
        images: [settings.ogImage],
      },
    }),
  };
}

export const metadata: Metadata = await getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
