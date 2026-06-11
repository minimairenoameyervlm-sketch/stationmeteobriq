import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // C'est cette ligne qui fait toute la magie
  images: {
    unoptimized: true, // Requis pour le mode export statique
  },
};

export default nextConfig;
