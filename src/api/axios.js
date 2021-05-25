/*
 * @Author: shaoqing
 * @Date: 2021-05-25 15:21:27
 * @LastEditTime: 2021-05-25 15:24:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\api\axios.js
 */
import axios from 'axios'
axios.defaults.timeout = 60000
axios.defaults.baseURL = ''

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
    } else {
      console.log('data', data)
    }
  },
  (error) => {
    console.log('error', error)
  }
)

export default axios
