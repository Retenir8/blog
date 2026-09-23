import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingIncludes: { '/*': ['./content/**/*'] },
  poweredByHeader: false,
};

export default nextConfig;
