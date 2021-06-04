/*
 * @Author: shaoqing
 * @Date: 2021-05-24 10:33:43
 * @LastEditTime: 2021-06-04 18:15:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\pages\login\login.js
 */
import React, { Component } from 'react'
import { postLogin, postRegister, getPublicKey } from '../../api/api'
import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'jsencrypt'
import './home.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputArr: [
        {
          value: '',
          focus: false
        },
        {
          value: '',
          focus: false
        },
        {
          value: '',
          focus: false
        },
        {
          value: '',
          focus: false
        },
        {
          value: '',
          focus: false
        }
      ],
      isRegister: false,
      isAdd: false,
      publicKey: ''
    }
  }
  componentDidMount() {
    this.obtainPublicKey()
  }
  /**
   * @description: 渲染input组件
   * @param {*} props
   * @return {*}
   */
  renderInput = (label, index, isPassword) => {
    return (
      <div className="input">
        <label className={`${this.state.inputArr[index].focus ? 'label active' : 'label'}`}>{label}</label>
        <input
          type={isPassword ? 'password' : 'text'}
          autoComplete="false"
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onChange={(e) => {
            this.handleInputChange(index, e)
          }}
          data-id={index}
        ></input>
        <span className={`${this.state.inputArr[index].focus ? 'progress active' : 'progress'}`}></span>
      </div>
    )
  }
  /**
   * @description: 处理Input Change事件
   * @param {*} e
   * @return {*}
   */
  handleInputChange = (index, e) => {
    let inputArr = this.state.inputArr
    inputArr[index].value = e.target.value
    this.setState({
      inputArr: inputArr
    })
  }
  /**
   * @description: 处理input聚焦事件
   * @param {*} e
   * @return {*}
   */
  handleInputFocus = (e) => {
    const id = e.target.dataset.id
    let inputArr = this.state.inputArr
    inputArr[id].focus = true
    this.setState({
      inputArr: inputArr
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
    let inputArr = this.state.inputArr
    inputArr[id].focus = false
    this.setState({
      inputArr: inputArr
    })
  }
  /**
   * @description: AES-256-ECB对称加密
   * @param {*}
   * @return {*}
   */
  handleEncrypt = (text, secretKey) => {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    console.log(encrypted, 'en')
    return encrypted.toString()
  }
  /**
   * @description: RSA非对称加密
   * @param {*} publicKey
   * @param {*} text
   * @return {*}
   */
  handleEncryptKey = (publicKey, text) => {
    const crypt = new JSEncrypt()
    crypt.setPublicKey(publicKey)
    return crypt.encrypt(text)
  }
  /**
   * @description: 随机生成AES secretKey
   * @param {*}
   * @return {*}
   */
  generateSecretKey = (e) => {
    e = e || 32
    const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const a = t.length
    let n = ''
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
    return n
  }
  /**
   * @description: 生成加密的key值和密码
   * @param {*}
   * @return {*}
   */
  generateEncryptParams = (password) => {
    // 前端随机生成6位字符
    const key = this.generateSecretKey(16)
    // 通过RSA公钥加密key值
    const secretkey = this.handleEncryptKey(this.state.publicKey, key)
    const encryptPassWord = this.handleEncrypt(password, key)
    console.log(encryptPassWord, encryptPassWord.length)
    return {
      secretkey,
      encryptPassWord
    }
  }
  /**
   * @description: 登录接口
   * @param {*}
   * @return {*}
   */
  login = async () => {
    const name = this.state.inputArr[0].value
    const password = this.state.inputArr[1].value
    const { secretkey, encryptPassWord } = this.generateEncryptParams(password)
    let result = await postLogin({
      name: name,
      password: encryptPassWord,
      secretkey
    })
    if (result && result.token) {
      const { token } = result
      localStorage.setItem('token', token)
    }
  }
  /**
   * @description: 注册接口
   * @param {*}
   * @return {*}
   */
  register = async () => {
    const email = this.state.inputArr[2].value
    const name = this.state.inputArr[3].value
    const password = this.state.inputArr[4].value
    const { secretkey, encryptPassWord } = this.generateEncryptParams(password)
    let result = await postRegister({
      name,
      email,
      secretkey,
      password: encryptPassWord
    })
    result && this.setState({ isRegister: false })
  }
  /**
   * @description: 获取公钥
   * @param {*}
   * @return {*}
   */
  obtainPublicKey = async () => {
    let result = await getPublicKey()
    result.publicKey && this.setState({ publicKey: result.publicKey })
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
