import type { NextConfig } from "next";

const withBundleAnalyzer =
  process.env.ANALYZE === "true"
    ? require("@next/bundle-analyzer")({ enabled: true })
    : (config: NextConfig) => config;

const cspOkList = [
  "https://seattlekink.com",
  "https://*.seattlekink.org",
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
];
const cspHeader = `
  default-src 'self' blob: data: ${cspOkList.join(" ")};
  script-src 'self' 'unsafe-eval' 'unsafe-inline' ${cspOkList.join(" ")};
  style-src 'self' 'unsafe-inline' ${cspOkList.join(" ")};
  img-src 'self' blob: data: ${cspOkList.join(" ")};
  object-src 'none';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;
const ppHeader = `
    payment=("${cspOkList.join('" "')}")
`;

const buildId = process.env.GIT_HASH || new Date().toLocaleDateString("en-US");
const isProd = process.env.NODE_ENV === "production";
const isSpikeCpu = process.env.SPIKE_CPU === "true";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx"],
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
  transpilePackages: ["next-image-export-optimizer"],
  generateBuildId: () => buildId,
  env: {
    NEXT_PUBLIC_BUILD_ID_ENV: buildId,
  },
  experimental: {
    cpus: isSpikeCpu || !isProd ? 8 : 3,
    globalNotFound: true,
    webpackMemoryOptimizations: isProd,
    serverSourceMaps: !isProd,
    inlineCss: !isProd,
  },
  generateEtags: isProd,
  compress: isProd,
  productionBrowserSourceMaps: false,
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: cspHeader.replace(/\n/g, ""),
        },
        {
          key: "Permissions-Policy",
          value: ppHeader.replace(/\n/g, ""),
        },
      ],
    },
  ],
};

export default withBundleAnalyzer(nextConfig);
