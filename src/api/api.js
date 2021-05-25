/*
 * @Author: your name
 * @Date: 2021-05-25 15:26:56
 * @LastEditTime: 2021-05-25 15:28:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\api\api.js
 */
import { get, post } from './http'
// 登录
export const login = (params) => get('/login', params)
