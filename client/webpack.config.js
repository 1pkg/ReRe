const Path = require('path')
const Fs = require('fs')
const Webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const InlinePlugin = require('html-webpack-inline-source-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const OnBuildPlugin = require('on-build-webpack')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = env => {
    let webpack = {
        target: 'web',
        entry: ['babel-polyfill', './source/application.js'],
        output: {
            publicPath: '/',
            path: Path.join(__dirname, 'dump', 'build'),
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
                                        rootPathSuffix: './source/',
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
            new Webpack.EnvironmentPlugin({
                NODE_ENV: env.mode,
                DEBUG: env.debug || false,
            }),
            new Webpack.DefinePlugin(
                JSON.parse(Fs.readFileSync(`./settings/${env.mode}.json`)),
            ),
        ],
    }
    if (env.debug) {
        webpack.devtool = 'source-map'
        webpack.devServer = {
            host: 'localhost',
            port: 8080,
            inline: true,
            contentBase: './dump/build',
            historyApiFallback: true,
        }
        webpack.plugins.push(
            new HtmlPlugin({
                template: './static/main.html',
            }),
        )
    } else {
        webpack.plugins.push(
            new CopyPlugin([
                { from: './static/fonts/', to: './fonts/' },
                { from: './static/icons/', to: './icons/' },
                { from: './static/manifest.json', to: './manifest.json' },
                { from: './static/site.webmanifest', to: './site.webmanifest' },
                {
                    from: './static/browserconfig.xml',
                    to: './browserconfig.xml',
                },
            ]),
            new HtmlPlugin({
                template: './static/main.html',
                inlineSource: /\.jsx?$/,
                minify: {
                    html5: true,
                    collapseInlineTagWhitespace: true,
                    collapseWhitespace: true,
                    keepClosingSlash: true,
                    minifyCSS: true,
                    minifyJS: true,
                    minifyURLs: true,
                    quoteCharacter: '"',
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeEmptyElements: false,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    sortAttributes: true,
                    sortClassName: true,
                    useShortDoctype: true,
                },
            }),
            new InlinePlugin(),
            new UglifyPlugin({
                parallel: true,
                sourceMap: false,
            }),
            new OnBuildPlugin(function() {
                Fs.unlink(Path.join(__dirname, 'dump', 'build', 'bundle.js'))
            }),
            new CleanPlugin('./dump/build'),
        )
    }
    return webpack
}
