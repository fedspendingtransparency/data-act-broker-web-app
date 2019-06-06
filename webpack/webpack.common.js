const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const isProduction = (process.env.NODE_ENV === 'production');

const gitRevisionPlugin = new GitRevisionPlugin({ branch: true }); // 'rev-parse HEAD' is default command to find latest commit

console.log("Commit Hash for this build: ", gitRevisionPlugin.commithash());
console.log("Branch for this build: ", gitRevisionPlugin.branch());

module.exports = {
    entry: path.resolve(__dirname, 'src/js/app'),
    output: {
        // https://webpack.js.org/guides/caching/
        publicPath: "/",
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "public")
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ["node_modules", path.resolve(__dirname, "src/_scss")]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                // all imported code from node_modules is a single file
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 20
                },
                // code shared between at least 2 modules, is put into a common chunk file
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.js$|jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader' // the babel loader tells webpack to compile JS/JSX files using Babel
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                "css-loader"
            ]
        },
        {
            test: /\.scss$/,
            use: [
                { loader: MiniCssExtractPlugin.loader },
                { loader: "css-loader", options: { url: false, sourceMap: !isProduction } },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: !isProduction,
                        includePaths: ["./src/_scss", "./node_modules"]
                    }
                }
            ]
        },
        {
            include: /\.(eot|ttf|woff|woff2|png|svg|ico|gif|jpg)$/,
            loader: 'file-loader',
            query: {
                name: '[path][name].[ext]'
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new webpack.HashedModuleIdsPlugin() // so that file hashes don't change unexpectedly
    ]
};
