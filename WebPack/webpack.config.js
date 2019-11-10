const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

/*
Apenas 1 bundle
 entry: ["babel-polyfill", "./src/index.js"],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
*/

module.exports = {
    //entry: './src/index.js',
    entry: {
        babelpolyfill: "babel-polyfill",
        index: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist/bundle'),
        filename: '[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new UglifyJsPlugin({
                //    cache: true,
                //    parallel: true,
                //    sourceMap: true
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css.css"
        })
    ],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/,
                use: [
                    // style-loader
                    //{ loader: 'style-loader' },
                    { loader: MiniCssExtractPlugin.loader },
                    // css-loader
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    // sass-loader
                    { loader: 'sass-loader' }
                ]
            },
            /*{
                test: /\.scss$/,
                use: [
                    // style-loader
                    { loader: 'style-loader' },
                    // css-loader
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    // sass-loader
                    { loader: 'sass-loader' }
                ]
            }*/
            {
                test: /\.(scss)$/,
                use: [{
                    //loader: 'style-loader', // injeta CSS na página
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader', // traduz CSS em módulos commonJS
                }, {
                    loader: 'postcss-loader', // Executa tarefas do postcss
                    options: {
                        plugins: function () { // plugins postcss, podem ser exportados para o postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader' // compila Sass em CSS
                }]
            },

        ]

    },
    devServer: {
        contentBase: './dist',
        port: 9000
    }
};

