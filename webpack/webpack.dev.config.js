const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "development",
    devtool: "eval",
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "public")
        },
        host: "0.0.0.0", // this allows VMs to access the server
        port: 3000,
        allowedHosts: "all",
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader", options: { url: true, sourceMap: true } },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
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
        new webpack.DefinePlugin({
            'process.env': {
                BROKER_API: process.env.BROKER_API
                    ? JSON.stringify(process.env.BROKER_API)
                    : JSON.stringify("http://localhost:9999/v1/active_user/"),
                BROKER_CALLBACK: process.env.BROKER_CALLBACK
                    ? JSON.stringify(process.env.BROKER_CALLBACK)
                    : JSON.stringify("http://localhost:3002/#/auth"),
                GA_TRACKING_ID: process.env.GA_TRACKING_ID
                    ? JSON.stringify(process.env.GA_TRACKING_ID)
                    : JSON.stringify(""),
                PUBLIC_FILES: process.env.PUBLIC_FILES
                    ? JSON.stringify(process.env.PUBLIC_FILES)
                    : JSON.stringify(""),
                CAS_ROOT: process.env.CAS_ROOT
                    ? JSON.stringify(process.env.CAS_ROOT)
                    : JSON.stringify("https://login.test.max.gov"),
                CAIA_ROOT: process.env.CAIA_ROOT
                    ? JSON.stringify(process.env.CAIA_ROOT)
                    : JSON.stringify("https://caia-dev.treasury.gov"),
                CAIA_CLIENT: process.env.CAIA_CLIENT
                    ? JSON.stringify(process.env.CAIA_CLIENT)
                    : JSON.stringify(""),
                IS_DEV: JSON.stringify('true'),
                IS_LOCAL: process.env.IS_LOCAL && process.env.IS_LOCAL === 'true'
                    ? JSON.stringify('true')
                    : JSON.stringify('false')
            }
        })
    ]
});
