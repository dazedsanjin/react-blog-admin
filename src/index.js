import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import Home from './pages/home/home'
import Article from './pages/article/article'
import './style.scss'

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/article" component={Article}></Route>
          <Redirect to="/home"></Redirect>
        </Switch>
      </HashRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
