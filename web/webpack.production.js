const Path = require('path');
const FS = require('fs');
const Webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const FlowPlugin = require('flow-babel-webpack-plugin');
const ObfuscatorPlugin = require('webpack-obfuscator');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');
const WebappManifestPlugin = require('webapp-manifest-plugin');
const OnBuildPlugin = require('on-build-webpack');

module.exports = {
	entry: './source/application.js',

	output: {
		publicPath: '/',
		path: Path.join(__dirname, 'build'),
		filename: 'bundle.js',
	},

	module: {
		rules: [
		 {
			 test: /\.jsx?$/,
			 exclude: /(node_modules)/,
			 use: {
				 loader: 'babel-loader',
				 options: {
					 presets: ['env', 'flow', 'react',],
					 plugins: ['transform-class-properties',]
				 },
			 },
		 },
	 ],
	},

	plugins: [
		new CleanPlugin('build'),
		new Webpack.EnvironmentPlugin({
			NODE_ENV: 'production',
			DEBUG: false,
		}),
		new FlowPlugin(),
		new ObfuscatorPlugin({
			compact: true,
			controlFlowFlattening: true,
			controlFlowFlatteningThreshold: 0.5,
			deadCodeInjection: true,
			deadCodeInjectionThreshold: 0.5,
			debugProtection: false,
			debugProtectionInterval: false,
			disableConsoleOutput: true,
		  log: false,
			mangle: false,
			renameGlobals: false,
			rotateStringArray: true,
			selfDefending: false,
			stringArray: true,
			stringArrayEncoding: 'base64',
			stringArrayThreshold: 1.0,
			unicodeEscapeSequence: false,
		}),
		new HtmlPlugin({
			template: 'templates/main.html',
			inlineSource: '.js$',
			minify: {
				collapseWhitespace: true,
				keepClosingSlash: true,
				quoteCharacter: '"',
				removeComments: true,
				removeEmptyAttributes: true,
				removeEmptyElements: false,
				removeOptionalTags: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
			},
		}),
		new HtmlInlineSourcePlugin(),
		new FaviconsPlugin({
			logo: Path.join(__dirname, '..', 'makets', 'logo.png'),
			prefix: 'icns/',
			persistentCache: false,
			background: '#FFFFFF',
			title: 'WiT?',
		}),
		new WebappManifestPlugin.default({
			name: 'What is This???',
		  shortName: 'WiT?',
		  description: 'What is This???',
		  dir: '',
		  lang: 'en-US',
		  display: 'standalone',
		  orientation: 'any',
		  startUrl: '/',
		  backgroundColor: '#FFFFFF',
		  themeColor: '#A9A9A9',
			icons: WebappManifestPlugin.FAVICON_PLUGIN,
		}),
		new OnBuildPlugin(function() {
			FS.unlink(Path.join(__dirname, 'build', 'bundle.js'));
			FS.unlink(Path.join(__dirname, 'build', 'icns', 'manifest.json'));
			FS.unlink(Path.join(__dirname, 'build', 'icns', 'manifest.webapp'));
    }),
	],
};
