const Path = require('path')
const FS = require('fs')
const Webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')

let settings = FS.readFileSync('./settings/development.json')

module.exports = {
    entry: ['babel-polyfill', './source/application.js'],
    devtool: 'source-map',

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

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader?cacheDirectory',
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
        new Webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            DEBUG: true,
        }),
        new Webpack.DefinePlugin(JSON.parse(settings)),
        new HtmlPlugin({
            template: 'templates/main.html',
        }),
    ],
}
