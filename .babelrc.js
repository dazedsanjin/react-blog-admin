/*
 * @Author: shaoqing
 * @Date: 2021-06-25 16:47:09
 * @LastEditTime: 2021-07-08 18:12:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\.babelrc.js
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry', // 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill
        corejs: '3.9.1', // Babel 7.4.0 开始，@babel/polyfill被弃用
        targets: {
          chrome: '58',
          ie: '11'
        }
      }
    ],
    [
      '@babel/preset-react',
      {
        development: process.env.NODE_ENV === 'development'
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }], // 把类和对象的装饰器编译成 ES5 代码
    ['@babel/plugin-proposal-class-properties', { loose: true }], // 转换静态类属性以及使用属性初始值化语法声明的属性
    ['@babel/plugin-proposal-private-methods', { loose: true }], // 转换私有方法
    '@babel/plugin-syntax-dynamic-import', // 支持动态加载 import
    ['@babel/transform-runtime']
  ]
}
