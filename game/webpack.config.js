const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        app: ['./src/a.js'],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },

    plugins: [],

    devtool: 'source-map',

    devServer: {
        port: 8086,
        contentBase: ['./external', './src'],
        historyApiFallback: true,
        watchOptions: {
            ignored: /node_modules/,
        },
    },
}
