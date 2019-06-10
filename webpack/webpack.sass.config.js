const merge = require('webpack-merge');

const dev = require('./webpack.dev.config')('dev');

module.exports = merge(dev, {
    devtool: "inline-source-map"
});
