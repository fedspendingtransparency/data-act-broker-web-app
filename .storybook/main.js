/** @type { import('@storybook/react-webpack5').StorybookConfig } */

const webpack = require("webpack");
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
    "@storybook/addon-styling-webpack",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async (config, { cache }) => {
    cache.set = () => Promise.resolve();
    return {
      ...config,
      plugins: [
        ...config.plugins,
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
          })],
      module: { ...config.modules, rules: [...config.module.rules, ...commonConfig.module.rules, ...devConfig.module.rules ]}
    }
  }
};
export default config;
