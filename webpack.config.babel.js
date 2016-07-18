import webpack from 'webpack';

export default {
	entry: './src/js/app.jsx',
	output: {
		path: './public/js',
        publicPath: 'js/',
        filename: 'app.js',
        chunkFilename: 'chunk.[chunkhash].js'
    },
    devtool: 'eval',
    debug: true,
    cache: true,
	module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.json$/,
            loader: 'json-loader'
        },{
            test: /\/node_modules\/aws-sdk/,
            loader: 'transform?aws-sdk/dist-tools/transform'
        }]
    },
    node: {
        fs: "empty"
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('./public/js/manifest.json')
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true)
    ]
};