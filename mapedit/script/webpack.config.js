const fs = require('fs')
const path = require('path')
const WebpackAssetsManifest = require('webpack-assets-manifest')

module.exports = {
    entry: {
        index: [
            path.join(__dirname, '../src/index.ts'),
            path.join(__dirname, '../src/index.html'),
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.(js)|(tsx?)$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },

            {
                test: [/\.html?$/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new WebpackAssetsManifest({
            output: path.resolve(__dirname, '../dist', 'assetManifest.json'),
        }),
    ],

    devtool: false,

    devServer: {
        port: 8080,
        contentBase: [
            path.join(__dirname, '../../game/src'),
            path.join(
                __dirname,
                '../../game/node_modules/aframe/gh-pages/dist'
            ),
        ],
        watchOptions: {
            ignored: /node_modules/,
        },
        before: function(app) {
            app.get('/game', function(req, res) {
                const game = fs
                    .readFileSync(
                        path.join(__dirname, '../../game/src/index.html')
                    )
                    .toString()

                res.write(game)
                res.end()
            })
        },
    },
}
