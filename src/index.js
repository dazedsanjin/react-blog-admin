/*
 * @Author: your name
 * @Date: 2021-06-12 18:43:05
 * @LastEditTime: 2022-02-06 15:24:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \react-blog-admin\src\index.js
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import reportWebVitals from './reportWebVitals'
import Home from './pages/home/home'
import Article from './pages/article/article'
import Antd from './pages/antd/antd'
import 'antd/dist/antd.css'
import './style.scss'

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <HashRouter>
          <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/article" component={Article}></Route>
            <Route path="/antd" component={Antd}></Route>
            <Redirect to="/home"></Redirect>
          </Switch>
        </HashRouter>
      </div>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
