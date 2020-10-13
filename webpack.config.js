const path = require('path')

module.exports = {
    mode: 'development',
    entry: './frontend/main.js',
    output: {
        path: path.resolve(__dirname, 'public', 'js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.(png|jpg|svg)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "../img/"
                }
            }
        }]
    },
    devtool: 'source-map'
}