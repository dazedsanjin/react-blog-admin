/*
 * @Author: your name
 * @Date: 2021-05-25 15:26:56
 * @LastEditTime: 2021-06-02 16:32:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\api\api.js
 */
import { get, post } from './http'
// 登录
export const postLogin = (data) => get('/login', data)
// 注册
export const postRegister = (data) => post('/register', data)
