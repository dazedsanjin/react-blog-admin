/*
 * @Author: shaoqing
 * @Date: 2021-05-24 10:33:43
 * @LastEditTime: 2021-05-25 15:30:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\pages\login\login.js
 */
import React, { Component } from 'react'
import { login } from '../../api/api'
import './home.scss'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userNameInput: false,
      passwordInput: false
    }
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.login = this.login.bind(this)
  }
  handleInputFocus(e) {
    const type = e.target.dataset.type
    if (Object.is(type, 'username')) {
      this.setState({ userNameInput: true })
    } else if (Object.is(type, 'password')) {
      this.setState({ passwordInput: true })
    }
  }
  handleInputBlur(e) {
    const type = e.target.dataset.type
    if (Object.is(type, 'username')) {
      this.setState({ userNameInput: false })
    } else if (Object.is(type, 'password')) {
      this.setState({ passwordInput: false })
    }
  }
  async login() {
    console.log('登录')
  }
  render() {
    return (
      <div className="home">
        <div className="container">
          <div className="login">
            <div className="title">Login</div>
            <div className="username">
              <label className={`${this.state.userNameInput ? 'focus' : ''}`}>Username</label>
              <input type="text" name="name" onFocus={this.handleInputFocus} onBlur={this.handleInputBlur} data-type="username"></input>
              <span></span>
            </div>
            <div className="password">
              <label className={`${this.state.passwordInput ? 'focus' : ''}`}>Password</label>
              <input type="password" name="name" onFocus={this.handleInputFocus} onBlur={this.handleInputBlur} data-type="password"></input>
              <span></span>
            </div>
            <div className="button">
              <button onClick={this.login}>
                <span>GO</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
