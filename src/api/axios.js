/*
 * @Author: shaoqing
 * @Date: 2021-05-25 15:21:27
 * @LastEditTime: 2021-06-23 10:38:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\api\axios.js
 */
import Axios from 'axios'
const axios = Axios.create({
  baseURL: 'http://121.199.30.44:6060',
  timeout: 60000
})

axios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('token')
    request.headers['token'] = token
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
