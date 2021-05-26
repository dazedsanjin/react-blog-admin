/*
 * @Author: shaoqing
 * @Date: 2021-05-24 10:33:43
 * @LastEditTime: 2021-05-26 17:57:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\pages\login\login.js
 */
import React, { Component } from 'react'
import { login } from '../../api/api'
import './home.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focusStatus: [false, false, false, false, false],
      isRegister: false,
      isAdd: false
    }
  }
  /**
   * @description: 渲染input组件
   * @param {*} props
   * @return {*}
   */
  renderInput = (label, index, isPassword) => {
    return (
      <div className="input">
        <label className={`${this.state.focusStatus[index] ? 'label active' : 'label'}`}>{label}</label>
        <input
          type={isPassword ? 'password' : 'text'}
          autoComplete="false"
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          data-id={index}
        ></input>
        <span className={`${this.state.focusStatus[index] ? 'progress active' : 'progress'}`}></span>
      </div>
    )
  }
  /**
   * @description: 处理input聚焦事件
   * @param {*} e
   * @return {*}
   */
  handleInputFocus = (e) => {
    const id = e.target.dataset.id
    let focusStatus = this.state.focusStatus
    focusStatus[id] = true
    this.setState({
      focusStatus: focusStatus
    })
  }
  /**
   * @description: 处理input失焦事件
   * @param {*} e
   * @return {*}
   */
  handleInputBlur = (e) => {
    const id = e.target.dataset.id
    const value = e.target.value
    if (value) return
    let focusStatus = this.state.focusStatus
    focusStatus[id] = false
    this.setState({
      focusStatus: focusStatus
    })
  }
  /**
   * @description: 登录接口
   * @param {*}
   * @return {*}
   */
  login = async () => {
    // let res = await axios.get('http://127.0.0.1:6060/user/getAllUser ')
    let res = await login()
    console.log('res', res)
  }
  /**
   * @description: 注册接口
   * @param {*}
   * @return {*}
   */
  register = async () => {
    console.log('注册')
  }
  /**
   * @description: 弹窗状态切换位注册状态
   * @param {*}
   * @return {*}
   */
  goToRegister = () => {
    const isRegister = this.state.isRegister
    this.setState({ isRegister: !isRegister })
  }
  render() {
    return (
      <div className="home">
        <div className="container">
          <div className="login">
            <div className="title">Login</div>
            <form>
              {this.renderInput('Username', 0, false)}
              {this.renderInput('Password', 1, true)}
            </form>
            <div className="button">
              <button onClick={this.login}>
                <span>GO</span>
              </button>
            </div>
          </div>
          <div className={`${this.state.isRegister ? 'active register' : 'register'}`}>
            <div className="add">
              <span className="shape" onClick={this.goToRegister}></span>
            </div>
            <div className="title">REGISTER</div>
            <form>
              {this.renderInput('Email', 2, false)}
              {this.renderInput('Username', 3, false)}
              {this.renderInput('Password', 4, true)}
            </form>
            <div className="button">
              <button onClick={this.register}>
                <span>NEXT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
