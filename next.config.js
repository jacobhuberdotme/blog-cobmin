const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qk5zmcowye2gfiufzx5l232ltb7ikz64wjpwc2d3uiwzthhjfpsa.arweave.net',
        port: '',
        pathname: '/gruWCdbBNGKihc36vW9LmH6FZ9yyX2Foe6ItmZzpK-Q/**',
      },
      {
        protocol: 'https',
        hostname: 'loopexchange.art',
        port: '',
        pathname: '/collection/watercolordreams/**',
      },
    ],
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
};

module.exports = withMDX(nextConfig);
