/*
 * @Author: shaoqing
 * @Date: 2021-06-24 09:39:46
 * @LastEditTime: 2021-07-08 17:46:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\config\webpack.common.js
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const paths = require('./paths')

module.exports = function (options) {
  const isEnvDevelopment = options.mode === 'development'
  const isEnvProduction = options.mode === 'production'
  return {
    mode: options.mode,
    bail: isEnvProduction, // 生产环境下，出现错误，停止继续打包
    devtool: isEnvProduction ? false : 'cheap-module-source-map', // sourceMap 类型
    cache: isEnvDevelopment, // 开发环境下，缓存生成的webpack模块，改善构建速度
    entry: paths.appIndexJs,
    output: {
      path: isEnvProduction ? paths.appBuild : undefined,
      filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : isEnvDevelopment && 'static/js/[name].js',
      chunkFilename: isEnvProduction ? 'static/js/[name].[contenthash:8].chunk.js' : isEnvDevelopment && 'static/js/[name].chunk.js',
      publicPath: './' // public 引入link script 路径 ./static/js
    },
    module: {
      rules: [
        {
          oneOf: [
            // 匹配 停止遍历
            {
              test: /\.(js|jsx)$/,
              include: paths.appSrc,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    cacheDirectory: true // 缓存loader执行结果（node_modules/.cache）
                  }
                }
              ]
            },
            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: [
                isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader', // 将 CSS 提取到单独的文件
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2, // 2 => postcss-loader, sass-loader （允许css-loader 前有多少loader应用）
                    sourceMap: true
                  }
                },
                'postcss-loader',
                'sass-loader'
              ]
            },
            {
              test: /\.(scss|sass)$/,
              exclude: /\.module\.(scss|sass)$/,
              use: [
                isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2,
                    sourceMap: true
                  }
                },
                'postcss-loader',
                'sass-loader'
              ]
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
              type: 'asset', // 替代webpack4 url-loader
              generator: {
                filename: 'static/images/[hash][ext]'
              },
              parser: {
                dataUrlCondition: {
                  maxSize: 1024 * 4 // 小于4KB 均已base64 格式存储
                }
              }
            },
            {
              test: /\.(eot|svg|ttf|woff|woff2?)$/,
              type: 'asset/resource', // 替代webpack4 file-loader
              generator: {
                filename: 'static/fonts/[hash][ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CompressionPlugin({
        // gzip压缩配置
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10kb的数据进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      }),
      new HtmlWebpackPlugin({
        inject: true, // 依赖scriptLoading方式向html注入静态资源（默认：延迟加载）
        template: paths.appHtml
      }),
      new webpack.DefinePlugin({
        NODE_ENV: isEnvProduction && JSON.stringify('production') // 设置全局访问变量
      }),
      ...options.plugins
    ],
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new CssMinimizerPlugin({
          // 压缩css
          parallel: true
        }),
        new TerserPlugin({
          // 压缩js
          parallel: true,
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          }
        })
      ],
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      modules: [paths.appNodeModules],
      extensions: ['.js', '.jsx', '.json'], // 相同文件名 按这个后缀名顺序解析
      alias: {
        '@/src': paths.appSrc,
        '@/public': paths.appPublic
      },
      fallback: {
        crypto: false
      }
    },
    devServer: {},
    stats: options.stats // 控制台编译/打包 警告、错误输出
  }
}
