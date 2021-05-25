/*
 * @Author: shaoqing
 * @Date: 2021-05-25 15:24:56
 * @LastEditTime: 2021-05-25 15:26:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\api\http.js
 */
import axios from 'axios'

export const get = (url, params) => {
  return axios({
    url: url,
    method: 'get',
    params
  })
}

export const post = (url, data) => {
  return axios({
    url: url,
    method: 'post',
    data
  })
}
