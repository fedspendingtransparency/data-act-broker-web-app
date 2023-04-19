const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin({ branch: true }); // 'rev-parse HEAD' is default command to find latest commit

module.exports = {
    entry: {
        app: "../src/index.js"
    },
    output: {
        // https://webpack.js.org/guides/caching/
        publicPath: "/",
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "../public")
    },
    context: path.resolve(__dirname, "../src"),
    resolve: {
        extensions: [".js", ".jsx", ".md", ".mdx"],
        modules: ["node_modules", path.resolve(__dirname, "src/_scss")],
        fallback: { querystring: require.resolve("querystring-es3") }
    },
    optimization: {
        splitChunks: { chunks: 'all' },
        moduleIds: 'deterministic' // so that file hashes don't change unexpectedly
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx$/,
                exclude: /node_modules\.*/,
                loader: "babel-loader" // the babel loader tells webpack to compile JS/JSX files using Babel
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                include: /\.(eot|ttf|woff|woff2|png|svg|ico|gif|jpg|md)$/,
                loader: 'file-loader',
                type: 'javascript/auto',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
            favicon: path.resolve(__dirname, "../src/graphics/favicon.ico")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        // new webpack.HashedModuleIdsPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '*.xml',
                    to: path.resolve(__dirname, "../public"),
                    context: path.resolve(__dirname, '../'),
                    noErrorOnMissing: true
                },
                {
                    from: '*.xml',
                    to: path.resolve(__dirname, "../public"),
                    context: path.resolve(__dirname, '../'),
                    noErrorOnMissing: true
                },
                {
                    from: 'robots.txt',
                    to: path.resolve(__dirname, "../public"),
                    context: path.resolve(__dirname, '../'),
                    noErrorOnMissing: true
                },
                {
                    from: 'redirect-config.json',
                    to: path.resolve(__dirname, "../public"),
                    context: path.resolve(__dirname, '../'),
                    noErrorOnMissing: true
                }
            ]
        })
        // new webpack.HashedModuleIdsPlugin() // so that file hashes don't change unexpectedly
    ]
};
