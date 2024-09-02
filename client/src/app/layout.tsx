import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Wrapper } from "@/components";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zk Vote Africa",
  description: "decentralized voting platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black ${open_sans.className}`}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
