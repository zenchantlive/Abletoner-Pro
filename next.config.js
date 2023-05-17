/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["prisma", "@prisma/client"],
  },
};

module.exports = {
  ...nextConfig,
  env: {
    // Export envs to browser side
    appName: process.env.APP_NAME,
    appLogo: process.env.APP_LOGO,
    appSummary: process.env.APP_SUMMARY,
    appThemeColor: process.env.APP_THEME_COLOR,
    exampleInput: process.env.EXAMPLE_INPUT,
  },
  httpAgentOptions: {
    keepAlive: true,
  },
};


module.exports = nextConfig;
