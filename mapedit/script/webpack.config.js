const fs = require("fs")
const path = require("path")
const webpack = require("webpack")

module.exports = {
    entry: {
        index: [
            path.join(__dirname, "../src/index.ts"),
            path.join(__dirname, "../src/index.html"),
        ],
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
        publicPath: "/",
    },

    module: {
        rules: [
            {
                test: /\.(js)|(tsx?)$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },

            {
                test: [/\.html?$/],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                        },
                    },
                ],
            },
        ],
    },

    devtool: false,
}
