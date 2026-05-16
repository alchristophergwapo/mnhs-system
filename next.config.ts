import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false, // Disables heavy browser-side source maps
  experimental: {
    serverSourceMaps: false,          // Disables heavy server-side source maps
    workerThreads: false,               // Disables heavy worker threads
    cpus: 1,                           // Sets the number of CPUs to use
  },
};

export default nextConfig;
