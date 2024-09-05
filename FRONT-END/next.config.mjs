/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "euc.li",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cryptologos.cc",
        port: "",
      },
    ],
  },
};

export default nextConfig;
