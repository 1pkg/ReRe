const Path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const DefinePlugin = require('extended-define-webpack-plugin');
const FlowPlugin = require('flow-babel-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlInlineSourcePlugin = require('html-webpack-inline-source-plugin');

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
		new CleanPlugin('build'),
		new DefinePlugin({
		  'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new FlowPlugin(),
		new MinifyPlugin(),
		new UglifyPlugin(),
		new HtmlPlugin({
			template: 'templates/main.html',
			inlineSource: '.(js|css)$',
		}),
		new HtmlInlineSourcePlugin(),
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
