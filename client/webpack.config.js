const Path = require('path')
const Fs = require('fs')
const Webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = env => {
    let webpack = {
        target: 'web',
        entry: [
            'babel-polyfill',
            `./source/${env.mode === 'cordova' ? 'cordova' : 'web'}.js`,
        ],
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
                {
                    test: /\.modernizr$/,
                    use: ['modernizr-loader', 'json-loader'],
                },
                { test: /\.modernizrrc.js$/, use: ['modernizr-loader'] },
            ],
        },
        resolve: {
            alias: { modernizr$: Path.join(__dirname, '.modernizr') },
        },
        plugins: [
            new Webpack.EnvironmentPlugin({
                NODE_ENV: env.debug ? 'development' : 'production',
                DEBUG: env.debug || false,
            }),
            new Webpack.DefinePlugin(
                Object.assign(
                    {
                        ENV_MODE: `"${
                            env.mode === 'cordova' ? 'cordova' : 'web'
                        }"`,
                    },
                    JSON.parse(Fs.readFileSync(`./settings/${env.mode}.json`)),
                ),
            ),
        ],
    }

    switch (env.mode) {
        case 'development':
            webpack.devtool = 'source-map'
            webpack.devServer = {
                host: '0.0.0.0',
                port: 8080,
                inline: true,
                contentBase: './dump/build',
                historyApiFallback: true,
            }
            webpack.plugins.push(
                new HtmlPlugin({
                    template: './static/web.html',
                }),
            )
            break

        default:
            webpack.plugins.push(
                new HtmlPlugin({
                    template: `./static/${
                        env.mode === 'cordova' ? 'cordova' : 'web'
                    }.html`,
                    hash: true,
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
                new UglifyPlugin({
                    parallel: true,
                    sourceMap: false,
                }),
                new CleanPlugin('./dump/build'),
            )

            switch (env.mode) {
                case 'production':
                    webpack.plugins.push(
                        new CopyPlugin([
                            { from: './static/fonts/', to: './fonts/' },
                            { from: './static/icons/', to: './icons/' },
                            {
                                from: './static/manifest.json',
                                to: './manifest.json',
                            },
                            {
                                from: './static/site.webmanifest',
                                to: './site.webmanifest',
                            },
                            {
                                from: './static/browserconfig.xml',
                                to: './browserconfig.xml',
                            },
                            { from: './static/og.jpeg', to: './og.jpeg' },
                        ]),
                    )
                    break

                case 'cordova':
                    webpack.plugins.push(
                        new CopyPlugin([
                            { from: './static/fonts/', to: './fonts/' },
                            { from: './static/config.xml', to: './config.xml' },
                            {
                                from: './static/resource.xml',
                                to: './resource.xml',
                            },
                            {
                                from: './static/cordova.json',
                                to: './cordova.json',
                            },
                        ]),
                        {
                            apply: compiler => {
                                compiler.hooks.compilation.tap(
                                    'after-build',
                                    compilation => {
                                        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
                                            'after-build',
                                            (data, callback) => {
                                                data.html = data.html.replace(
                                                    /\"\//g,
                                                    '"',
                                                )
                                                callback(null, data)
                                            },
                                        )
                                    },
                                )
                            },
                        },
                    )
                    break
            }
    }
    return webpack
}
