const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const Path = require('path');

module.exports = {
	entry: './source/application.js',

	output: {
		publicPath: '/build',
		path: Path.join(__dirname, 'build'),
		filename: 'bundle.js',
	},

	devServer: {
		host: 'localhost',
		port: 8080,
		inline: true,
	},

	plugins: [
		new HtmlWebpackPlugin({template: 'static/index.html'}),
    new FlowBabelWebpackPlugin(),
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: { presets: ['es2015', 'react',] },
			},
			{
				test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
				loader: 'file-loader',
			},
   ],
	},
};
