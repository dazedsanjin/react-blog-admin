/*
 * @Author: shaoqing
 * @Date: 2021-06-25 13:16:26
 * @LastEditTime: 2021-07-12 23:00:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\scripts\start.js
 */
const chalk = require('chalk')
const ip = require('ip')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const WebpackConfig = require('../config/webpack.dev')

// 本地服务配置
const config = {
  port: 8081,
  host: 'localhost'
}

// 服务日志
const divider = chalk.gray('-----------------------------------')
const logger = {
  error: (err) => {
    console.error(chalk.red(err))
  },
  started: (port, host, tunnelStarted) => {
    console.log(`Server started ! ${chalk.green('✓')}`)
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`)
    }
    console.log(`${chalk.bold('Access URLs:')}
    ${divider}
    Localhost:${chalk.magenta(`http://${host}:${port}`)}
    LAN: ${
      chalk.magenta(`http://${ip.address()}:${port}`) +
      (tunnelStarted ? `Proxy: ${chalk.magenta(tunnelStarted)}` : '')
    }
    ${divider}
    ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `)
  }
}

const compiler = Webpack(WebpackConfig)
const devServerOptions = {
  ...WebpackConfig.devServer,
  open: true,
  compress: true,
  stats: 'minimal'
}

const server = new WebpackDevServer(compiler, devServerOptions)
server.listen(config.port, config.host, async (err) => {
  if (err) {
    return logger.error(err.message)
  }
  logger.started(config.port, 'localhost')
})
