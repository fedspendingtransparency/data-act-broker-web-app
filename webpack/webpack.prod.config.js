const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const merge = require('webpack-merge');

const getCommonConfig = require('./webpack.common');

module.exports = (env) => merge(getCommonConfig(env), {
    mode: "production",
    stats: {
        assets: true,
        chunks: true,
        builtAt: true,
        cached: true,
        version: true,
        warnings: true
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                styles: {
                    // all css in one file -- https://github.com/webpack-contrib/mini-css-extract-plugin
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 300000
        }),
        new webpack.DefinePlugin({
            'process.env': {
                API: process.env.API
                    ? JSON.stringify(process.env.API)
                    : JSON.stringify("https://broker-api.usaspending.gov/v1/"),
                API_CALLBACK: process.env.API_CALLBACK
                    ? JSON.stringify(process.env.API_CALLBACK)
                    : JSON.stringify("https://broker.usaspending.gov/#/auth"),
                GA_TRACKING_ID: process.env.GA_TRACKING_ID
                    ? JSON.stringify(process.env.GA_TRACKING_ID)
                    : JSON.stringify(""),
                CAS_ROOT: JSON.stringify("https://login.max.gov"),
                IS_DEV: JSON.stringify('false')
            }
        })
    ]
});
