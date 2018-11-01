/* webpack.client.js */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const utils = require('./../../build/utils')
const projectRoot = path.resolve(__dirname, '..');

function resolve (dir) {
    return path.join(__dirname, '../../', dir)
}


module.exports = {
    entry: [path.join(projectRoot, 'entry-client.js')],
    output: {
        path: path.join(projectRoot, 'dist'),
        filename: 'bundle.client.js',
        publicPath: "/"
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/,
                query: {
                    'presets': ['env', 'stage-2']
                },
            },
            {
                test:/\.css$/,
                use:['vue-style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"client"',
            'process.env.NODE_ENV': '"development"',
        }),
        new ExtractTextPlugin({ filename: 'common.[chunkhash].css' }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../../static'),
                to: "static",
                ignore: ['.*']
            }
        ])
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': resolve('src')
        }
    }
};