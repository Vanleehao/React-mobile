const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config")
const utils = require("./utils")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = webpackMerge(baseWebpackConfig,{
    // 指定构建环境  
    mode:"production",
    plugins:[
        new HtmlWebpackPlugin({
            filename: utils.resolve('./../dist/index.html'),
            template: 'index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new CleanWebpackPlugin()
    ],
})