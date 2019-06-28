const merge = require('webpack-merge');

const dev = require('./webpack.dev.config')({ globalConstantFile: 'dev' });

module.exports = merge(dev, {
    devtool: "inline-source-map"
});
