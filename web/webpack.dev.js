const Path = require('path');
const FlowPlugin = require('flow-babel-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

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
		contentBase: './build',
	},

	plugins: [
		new FlowPlugin(),
		new HtmlPlugin({
			template: 'static/index.html',
		}),
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
