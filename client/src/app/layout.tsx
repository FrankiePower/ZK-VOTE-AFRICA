import type { Metadata } from "next";
import { Open_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers, Wrapper } from "@/components";

const open_sans = Open_Sans({ subsets: ["latin"] });
const space_grotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: "Zk Vote Africa",
  description: "Decentralized voting platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black ${open_sans.className} ${space_grotesk.variable}`}>
        <Wrapper>
          <Providers>{children}</Providers>
        </Wrapper>
      </body>
    </html>
  );
}
