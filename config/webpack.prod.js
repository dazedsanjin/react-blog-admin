/*
 * @Author: shaoqing
 * @Date: 2021-06-24 09:40:00
 * @LastEditTime: 2021-07-08 16:06:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\config\webpack.prod.js
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WebpackBarPlugin = require('webpackbar')

module.exports = require('./webpack.common')({
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBarPlugin(), // 打包进度条
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    new BundleAnalyzerPlugin() // 包体积分析
  ],
  stats: 'errors-only' // 控制台仅显示错误信息
})
