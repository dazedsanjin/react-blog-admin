/*
 * @Author: your name
 * @Date: 2022-02-06 15:01:15
 * @LastEditTime: 2022-02-08 20:14:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \react-blog-admin\src\pages\antd\antd.js
 */
import React, { Component } from 'react'
import { Upload, Button } from 'antd'
import './antd.scss'

const uploadProps = {
  name: 'file',
  action: '',
  multiple: false
}

class Antd extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleFileChange = (info) => {
    console.log('change', info)
  }

  render() {
    return (
      <div className="antd">
        <Upload {...uploadProps} onChange={this.handleFileChange}>
          <Button>上传图片</Button>
        </Upload>
      </div>
    )
  }
}

export default Antd
