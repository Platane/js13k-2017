const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const production = 'production' === process.env.NODE_ENV

const createEnvVarArray = () => {
    const o = {}
    ;['NODE_ENV']
        .filter(name => name in process.env)
        .forEach(name => (o[`process.env.${name}`] = `"${process.env[name]}"`))

    return o
}

module.exports = {
    entry: {
        app: ['./src/index.js', './src/index.html'],
        worker: './src/worker/run',
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: process.env.PATHNAME_BASE || '/',
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
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                minimize: production,
                                importLoaders: true,
                                localIdentName: production
                                    ? '[hash:8]'
                                    : '[path][name]---[local]',
                            },
                        },
                    ],
                }),
            },
        ],
    },

    plugins: [
        !production && new webpack.NamedModulesPlugin(),

        new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),

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
