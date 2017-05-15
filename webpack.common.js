var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
var helpers = require('./helpers');

module.exports = {

    entry: './src/main.ts',

    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            { test: /\.css/, loader: "style-loader!css-loader" },
            { test: /\.png/, loader: "url-loader?limit=100000&minetype=image/png" },
            { test: /\.jpg/, loader: "file-loader" }
            // ,
            // {
            //     test: /\.css$/,
            //     exclude: helpers.root('src', 'public'),
            //     loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap')
            // },
            // {
            //     test: /\.css$/,
            //     include: helpers.root('app', 'public'),
            //     loader: 'raw-loader'
            // }
        ]
    },

    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['app', 'vendor', 'polyfills']
        // }),

        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};
