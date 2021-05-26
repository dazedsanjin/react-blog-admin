/*
 * @Author: shaoqing
 * @Date: 2021-05-25 15:21:27
 * @LastEditTime: 2021-05-25 16:39:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\api\axios.js
 */
import Axios from 'axios'
const axios = Axios.create({
  baseURL: 'http://127.0.0.1:6060',
  timeout: 60000
})

axios.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    const data = response.data.data
    const code = response.data.code
    if (code === 200) {
      return data
    }
  },
  (error) => {
    console.log('error', error)
  }
)

export default axios
