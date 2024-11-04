import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Provider from "./providers";

import { NavigationMenuComp } from "@/components/common/nav/NaviagationMenu";
import Footer from "@/components/common/footer/Footer";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "UI",
  description: "https://github.com/varunteja007006/open_templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-w-[420px] !md:min-w-[99vw] scroll-smooth dark:bg-black`}
      >
        <Provider
          GoogleLogin={{
            google_client_id: process.env.GOOGLE_CLIENT_ID ?? "",
            django_google_client_id: process.env.DJANGO_GOOGLE_AUTH_ID ?? "",
          }}
        >
          <header>
            <NavigationMenuComp />
          </header>
          <main className="min-h-screen w-full px-8 py-2">{children}</main>
          <Footer />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
