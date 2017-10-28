const Path = require('path')
const Webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')

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

    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader?{"modifyVars":{"primary-color": "#1A1A1A"}}',
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'flow', 'react'],
                        plugins: [
                            'transform-class-properties',
                            ['import', { libraryName: 'antd', style: true }],
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
        new HtmlPlugin({
            template: 'templates/main.html',
        }),
    ],
}
