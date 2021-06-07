/*
 * @Author: shaoqing
 * @Date: 2021-06-04 13:35:10
 * @LastEditTime: 2021-06-07 18:28:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\pages\article\article.js
 */
import React, { Component } from 'react'
import markdownIt from 'markdown-it'
import './article.scss'
import '../../assets/gothic/gothic.css'
const md = new markdownIt()
class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parseMarkdownContent: ''
    }
  }
  /**
   * @description: 处理textArea Change事件
   * @param {*} e
   * @return {*}
   */
  handleTextareaChange = (e) => {
    const value = e.target.value
    this.setState({ parseMarkdownContent: md.render(value) })
  }
  render() {
    return (
      <div className="article">
        <div className="article-header">
          <input className="title-input" placeholder="输入文章标题..."></input>
          <div className="release-btn">发布</div>
        </div>
        <div className="article-navbar"></div>
        <div className="article-content">
          <div className="article-edit">
            <textarea className="textarea" onChange={this.handleTextareaChange}></textarea>
          </div>
          <div className="article-preview">
            <div className="html" dangerouslySetInnerHTML={{ __html: this.state.parseMarkdownContent }}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Article
