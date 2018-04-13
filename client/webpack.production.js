const Path = require('path')
const FS = require('fs')
const Webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const FaviconsPlugin = require('favicons-webpack-plugin')
const WebappManifestPlugin = require('webapp-manifest-plugin')
const OnBuildPlugin = require('on-build-webpack')

let settings = FS.readFileSync('./settings/production.json')

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
                        presets: ['env', 'react'],
                        plugins: [
                            [
                                'babel-plugin-root-import',
                                {
                                    rootPathPrefix: '~',
                                    rootPathSuffix: 'source/',
                                },
                            ],
                            'transform-class-properties',
                            'babel-plugin-transform-object-rest-spread',
                        ],
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
        new Webpack.DefinePlugin(JSON.parse(settings)),
        new HtmlPlugin({
            template: 'templates/main.html',
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
        new FaviconsPlugin({
            logo: Path.join(__dirname, 'templates', 'logo.png'),
            prefix: 'icn/',
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
            FS.unlink(Path.join(__dirname, 'build', 'icn', 'manifest.json'))
            FS.unlink(Path.join(__dirname, 'build', 'icn', 'manifest.webapp'))
        }),
    ],
}
