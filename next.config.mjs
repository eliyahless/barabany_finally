<<<<<<< HEAD
// Оптимизированная конфигурация Next.js для продакшн-деплоя
/** @type {import('next').NextConfig} */
import path from 'path';
const nextConfig = {
=======
// Оптимизированная конфигурация Next.js для статической сборки
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
<<<<<<< HEAD
    unoptimized: false,
=======
    unoptimized: true,
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
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
<<<<<<< HEAD
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },
  webpack: (config, { dev, isServer }) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'components');

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
  }
=======
  basePath: '',
  trailingSlash: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', '@headlessui/react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    // Оптимизация для production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
>>>>>>> fc660b95daeb2f3b5c692545891ef8e4c2d656db
};

export default nextConfig;
