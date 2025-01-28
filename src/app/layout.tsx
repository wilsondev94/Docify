import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Docify",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NuqsAdapter>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
