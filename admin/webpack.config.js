'use strict';

let webpack = require('webpack');
let path = require('path');
const devmode = (process.env.npm_lifecycle_event === 'start');
const port = 3000;

function getEntrySources(sources) {
	if (devmode) {
		sources.push(`webpack-dev-server/client?http://localhost:${port}`);
		sources.push('webpack/hot/only-dev-server');
	}

	return sources;
}

module.exports = {
	devtool: devmode ? 'eval-source-map' : undefined,
	entry: {
		bundle: getEntrySources([
			'./app/app.jsx'
		])
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: `http://localhost:${port}/`,
		filename: devmode ? 'dist/app.js' : 'app.js',
	},
	resolve: {
		root: [path.resolve('.')],
	},
	devServer: {
		port: port,
		hot: true,
		progress: true,
		inline: true,
		debug: true		
	},
	module: {
		preLoaders: [{
			test: /\.(js|jsx)$/,
			loader: 'source-map-loader'
		}],
		loaders: [{
			test: /\.(js|jsx)$/,
			loaders: ['react-hot', 'babel-loader'],
			exclude: /node_modules/
		}, {
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		}, {
			test: /\.json$/,
        	loader: 'json-loader'
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			DEBUG: devmode 
		})
	]
};
