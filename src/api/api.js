/*
 * @Author: your name
 * @Date: 2021-05-25 15:26:56
 * @LastEditTime: 2021-05-25 16:14:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\api\api.js
 */
import { get } from './http'
// 登录
export const login = (params) => get('/user/getAllUser', params)
