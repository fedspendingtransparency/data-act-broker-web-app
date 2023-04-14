const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
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
            new TerserPlugin(),
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
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader", options: { url: true, sourceMap: false } },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: false,
                            sassOptions: {
                                includePaths: ["./src/_scss", "./node_modules"]
                            }
                        }
                    }
                ]
            }
        ]
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
                BROKER_API: process.env.BROKER_API
                    ? JSON.stringify(process.env.BROKER_API)
                    : JSON.stringify("http://localhost:9999/v1/active_user/"),
                BROKER_CALLBACK: process.env.BROKER_CALLBACK
                    ? JSON.stringify(process.env.BROKER_CALLBACK)
                    : JSON.stringify("http://localhost:3000/#/auth"),
                GA_TRACKING_ID: process.env.GA_TRACKING_ID
                    ? JSON.stringify(process.env.GA_TRACKING_ID)
                    : JSON.stringify(""),
                PUBLIC_FILES: process.env.PUBLIC_FILES
                    ? JSON.stringify(process.env.PUBLIC_FILES)
                    : JSON.stringify(""),
                CAS_ROOT: process.env.CAS_ROOT
                    ? JSON.stringify(process.env.CAS_ROOT)
                    : JSON.stringify("https://login.max.gov"),
                IS_DEV: JSON.stringify('false'),
                IS_LOCAL: process.env.IS_LOCAL && process.env.IS_LOCAL === 'true'
                    ? JSON.stringify('true')
                    : JSON.stringify('false')
            }
        })
    ]
});
