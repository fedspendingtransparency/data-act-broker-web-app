import webpack from 'webpack';

export default {
	entry: './src/js/app.jsx',
	output: {
		path: './public/webpack',
		publicPath: 'webpack/',
		filename: 'app.js',
		chunkFilename: 'support.[chunkhash].js'
	},
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
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};