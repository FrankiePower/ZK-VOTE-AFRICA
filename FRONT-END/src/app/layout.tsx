import type { Metadata } from "next";
import { Open_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components";
import Image from "next/image";
import { lisk, voting, voting4 } from "@/assets";
import Link from "next/link";
import "@rainbow-me/rainbowkit/styles.css";
import CustomConnectButton from "@/components/custom-connect-button";

const open_sans = Open_Sans({ subsets: ["latin"] });
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

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
      <body className={`${open_sans.className} ${space_grotesk.variable}`}>
        <Providers>
          <div className="w-full">
            <>
              <Image src={voting4} alt="" className="absolute top-[29%] right-[44%] w-20 h-20 hidden md:block"/>
            </>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-white">
              {/* Header */}
              <header className="flex justify-between items-center p-6 md:py-8 sm:px-12 lg:px-16">
                <Link href='/' className="text-2xl md:text-3xl font-extrabold text-primary-green font-space-grotesk relative">
                  <span className="flex items-center gap-1 absolute text-sm lefy-0 sm:-right-14 -bottom-4 text-gray-700 ">powered by lisk <Image src={lisk} alt="hello" width={10} height={10}/></span>
                  ZkVote Africa
                </Link>
                <nav className="hidden lg:flex space-x-4 md:space-x-8 lg:space-x-12 text-gray-700">
                  <Link href="#" className="hover:text-primary-green">
                    Guides
                  </Link>
                  <Link href="/register" className="hover:text-primary-green">
                    Register
                  </Link>
                  <Link href="#" className="hover:text-primary-green">
                    Blog
                  </Link>
                  <Link href="#" className="hover:text-primary-green">
                    About
                  </Link>
                </nav>
                <div>
                  <CustomConnectButton/>
                </div>
              </header>

              {/* Main Content */}
              <main className="flex flex-col md:flex-row flex-1 justify-between items-center p-6 md:py-8 md:px-16 space-y-4 md:space-y-0">
                {/* Left Side */}
                <div className="w-full md:w-1/2 max-w-lg">{children}</div>

                {/* Right Side (Image) */}
                <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end">
                  <Image
                    src={voting}
                    alt="vote"
                    className="w-full h-auto max-w-xl"
                  />
                </div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
