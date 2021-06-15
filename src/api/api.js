/*
 * @Author: your name
 * @Date: 2021-05-25 15:26:56
 * @LastEditTime: 2021-06-04 13:27:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\api\api.js
 */
import { get, post } from './http'
// 登录
export const postLogin = (data) => post('/login', data)
// 注册
export const postRegister = (data) => post('/register', data)
// 获取服务端publickey
export const getPublicKey = (params) => get('/publicKey', params)
// 创建文章
export const postCreateArticle = (data) => post('/article/create', data)
