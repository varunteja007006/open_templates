import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";

import "@workspace/ui/globals.css";
import { ModeToggle } from "@/components/mode-toggle";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Starter Convex",
  description: "Build something epic. Starter Convex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          <nav>
            <div className="flex p-2 flex-row items-center justify-between gap-4">
              <div>
                <h1 className="font-bold text-xl">Starter Template</h1>
              </div>
              <ModeToggle />
            </div>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
