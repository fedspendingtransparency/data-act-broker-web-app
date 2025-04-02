/** @type { import('@storybook/react-webpack5').StorybookConfig } */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import commonConfig from '../webpack/webpack.common';
import devConfig from '../webpack/webpack.dev.config';


const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      plugins: [ ...config.plugins, new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }) ],
      module: { ...config.modules, rules: [...config.module.rules, ...commonConfig.module.rules, ...devConfig.module.rules ]}
    }
  }
};
export default config;
