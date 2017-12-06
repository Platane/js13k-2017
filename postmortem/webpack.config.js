const path = require('path')
const webpack = require('webpack')
const Visualizer = require('webpack-visualizer-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const production = 'production' === process.env.NODE_ENV

const createEnvVarArray = () => {
    const o = {}
    ;['NODE_ENV', 'PATHNAME_BASE']
        .filter(name => name in process.env)
        .forEach(name => (o[`process.env.${name}`] = `"${process.env[name]}"`))

    return o
}

module.exports = {
    entry: {
        app: ['./src/index.js', './src/index.html'],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: production ? '[hash:8].js' : '[name].js',
        publicPath: process.env.PATHNAME_BASE || '/',
    },

    resolve: {
        alias: {
            react: 'preact',
            'react-dom': 'preact',
        },
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

            {
                test: /\.html?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].html',
                        },
                    },
                ],
            },

            {
                test: /\.md?$/,
                use: [
                    {
                        loader: './script/markdown-loader',
                    },
                ],
            },

            {
                test: /\.(gif|jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new Visualizer(),

        new WebpackAssetsManifest({
            output: path.resolve(__dirname, './dist', 'assetManifest.json'),
        }),

        !production && new webpack.NamedModulesPlugin(),

        new webpack.DefinePlugin(createEnvVarArray()),

        production && new webpack.optimize.ModuleConcatenationPlugin(),

        production &&
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                comments: false,
            }),
    ].filter(Boolean),

    devtool: 'source-map',

    devServer: {
        port: 8082,
        contentBase: false,
        historyApiFallback: true,
        watchOptions: {
            ignored: /node_modules/,
        },
    },
}
