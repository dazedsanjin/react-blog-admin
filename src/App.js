import Home from './pages/home/home'
import Article from './pages/article/article'
import './App.scss'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/article" component={Article}></Route>
          <Redirect to="/home"></Redirect>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
