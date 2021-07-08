/*
 * @Author: shaoqing
 * @Date: 2021-06-24 09:39:53
 * @LastEditTime: 2021-07-08 17:35:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\config\webpack.dev.js
 */
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = require('./webpack.common')({
  mode: 'development',
  plugins: [
    new ESLintPlugin({
      fix: false,
      extensions: ['js', 'jsx'],
      exclude: ['/node_modules/', 'build'],
      cache: true
    })
  ],
  stats: 'errors-only' // 控制台仅控制错误信息
})
