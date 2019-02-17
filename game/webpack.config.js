const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        app: ['./src/game.js'],
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
        contentBase: ['./src', './node_modules/aframe/dist'],
        historyApiFallback: true,
        watchOptions: {
            ignored: /node_modules/,
        },
    },
}
