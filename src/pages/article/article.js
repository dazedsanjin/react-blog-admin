/*
 * @Author: shaoqing
 * @Date: 2021-06-04 13:35:10
 * @LastEditTime: 2021-07-08 17:34:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-blog-admin\src\pages\article\article.js
 */
import React, { Component } from 'react'
import MarkdownIt from 'markdown-it'
import { BoldOutlined, ItalicOutlined, StrikethroughOutlined } from '@ant-design/icons'
import './article.scss'
import hljs from 'highlight.js'
import { postCreateArticle } from '../../api/api'
import 'highlight.js/styles/github.css'
import '../../assets/github.css'

const md = new MarkdownIt({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`
      } catch (__) {
        return
      }
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})
let scrolling = 0
let scrollTimer
class Article extends Component {
  constructor(props) {
    super(props)
    this.editRef = React.createRef()
    this.previewRef = React.createRef()
    this.state = {
      parseMarkdownContent: '',
      title: ''
    }
  }

  /**
   * @description: 处理title Change 事件
   * @param {*} e
   * @return {*}
   */
  handleTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  /**
   * @description: 处理scroll事件
   * @param {*} e
   * @return {*}
   */
  handleScroll = (type, e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target
    const ratio = scrollTop / (scrollHeight - clientHeight)

    if (Object.is(type, 'edit')) {
      if (scrolling === 0) scrolling = 1
      if (scrolling === 2) return
      this.evaluateSyncScroll(this.previewRef.current, ratio)
    } else {
      if (scrolling === 0) scrolling = 2
      if (scrolling === 1) return
      this.evaluateSyncScroll(this.editRef.current, ratio)
    }
  }

  /**
   * @description: 同步滚动
   * @param {*} e
   * @return {*}
   */
  evaluateSyncScroll = (target, ratio) => {
    const { scrollHeight, clientHeight } = target
    target.scrollTop = (scrollHeight - clientHeight) * ratio

    if (scrollTimer) clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      scrolling = 0
      clearTimeout(scrollTimer)
    }, 200)
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

  /**
   * @description: 处理文字
   * @param {*}
   * @return {*}
   */
  handleText = (text, symbol) => {
    const { selectionStart, selectionEnd, value } = this.editRef.current
    const newValue = selectionStart === selectionEnd
      ? value.slice(0, selectionStart) + symbol + text + symbol + value.slice(selectionEnd)
      : value.slice(0, selectionStart) + symbol + value.slice(selectionStart, selectionEnd) + symbol + value.slice(selectionEnd)
    this.editRef.current.value = newValue
    this.setState({ parseMarkdownContent: md.render(newValue) })
  }

  /**
   * @description: 字体加粗
   * @param {*} e
   * @return {*}
   */
  handleAddBold = () => {
    this.handleText('加粗文字', '**')
  }

  /**
   * @description: 字体斜体
   * @param {*}
   * @return {*}
   */
  handleAddItalic = () => {
    this.handleText('斜体文字', '*')
  }

  /**
   * @description: 字体删除
   * @param {*}
   * @return {*}
   */
  handleAddOutlined = () => {
    this.handleText('删除文字', '~~')
  }

  /**
   * @description: 发布文章
   * @param {*}
   * @return {*}
   */
  releaseArticle = async () => {
    const result = await postCreateArticle({
      title: this.state.title,
      content: this.editRef.current.value
    })
    console.log('result', result)
  }

  render() {
    return (
      <div className="article">
        <div className="article-header">
          <input className="title-input" placeholder="输入文章标题..." onChange={this.handleTitleChange}></input>
          <div className="release-btn" onClick={this.releaseArticle}>
            发布
          </div>
        </div>
        <div className="article-navbar">
          <div className="article-navbar-left">
            <BoldOutlined className="icon" onClick={this.handleAddBold} />
            <ItalicOutlined className="icon" onClick={this.handleAddItalic} />
            <StrikethroughOutlined className="icon" onClick={this.handleAddOutlined} />
          </div>
        </div>
        <div className="article-content">
          <textarea className="article-edit" ref={this.editRef} onChange={this.handleTextareaChange} onScroll={(e) => this.handleScroll('edit', e)}></textarea>
          <div
              className="article-preview"
              ref={this.previewRef}
              dangerouslySetInnerHTML={{ __html: this.state.parseMarkdownContent }}
              onScroll={(e) => this.handleScroll('preview', e)}
          ></div>
        </div>
      </div>
    )
  }
}

export default Article
