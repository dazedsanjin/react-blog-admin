/*
 * @Author: shaoqing
 * @Date: 2021-06-25 10:32:28
 * @LastEditTime: 2021-06-25 18:06:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog\config\paths.js
 */
const path = require('path')
const fs = require('fs')

// 获取当前工作目录
const appDirectory = fs.realpathSync(process.cwd())
// 从相对路径中解析绝对路径
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)
// 默认的模块扩展名
const moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx', 'json']
// 解析模块路径
const resolveModule = (resolveFn, filePath) => {
  // 查看文件存不存在
  const extension = moduleFileExtensions.find((suffix) => fs.existsSync(resolveFn(`${filePath}.${suffix}`)))
  if (extension) {
    return resolveFn(`${filePath}.${extension}`)
  }
  return resolveFn(`${filePath}.js`)
}

module.exports = {
  appBuild: resolveApp('build'), // 打包路径
  appPublic: resolveApp('public'), // 静态资源路径
  appHtml: resolveApp('public/index.html'), // html 模板路径
  appIndexJs: resolveModule(resolveApp, 'src/index'), // 打包入口路径
  appNodeModules: resolveApp('node_modules'), // node_modules 路径
  appSrc: resolveApp('src') // 主文件入口路径
}
