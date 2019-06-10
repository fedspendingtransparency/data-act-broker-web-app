const path = require("path");
const merge = require("webpack-merge");

const getCommonConfig = require("./webpack.common");

module.exports = (env) => merge(getCommonConfig(env), {
    mode: "development",
    devtool: "eval",
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        host: "0.0.0.0", // this allows VMs to access the server
        port: 3000,
        disableHostCheck: true
    }
});
