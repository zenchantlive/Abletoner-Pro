const path = require('path');

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
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // define your custom aliases here
      '@components': path.resolve(__dirname, './components'),
      'config-server': path.resolve(__dirname, './config-server'),
    };
    return config;
  },
};
