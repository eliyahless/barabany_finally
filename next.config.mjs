// Оптимизированная конфигурация Next.js для продакшн-деплоя
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ["blob.v0.dev", "i.ytimg.com", "hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "blob.v0.dev",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        "*.css": {
          loaders: ["@vercel/experimental-css-loader"],
          as: "style"
        }
      }
    }
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.optimization.usedExports = true;
      
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: "styles",
          test: /\.(css|scss)$/,
          chunks: "all",
          enforce: true,
        },
      };
      
      config.optimization.minimize = true;
    }

    return config;
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ]
      }
    ];
  },
  redirects: async () => {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      }
    ];
  },
  // output: 'export',
};

export default nextConfig;
