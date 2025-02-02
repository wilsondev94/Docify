import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";

import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Docify",
  description:
    "Docify is documents creation and editing platform for individuals and teams",
  icons: { icon: "/logo-title2.svg" },
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
          <ConvexClientProvider>
            <LayoutWrapper>
              <Toaster />
              {children}
            </LayoutWrapper>
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
