/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-07 22:46:45
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-07 23:19:00
 */

class HistoryRouter {
  constructor () {
    this.routers = {}
    this.listenLink()
    this.listenPopState()
  }

  listenPopState () {
    window.addEventListener('popstate', (e) => {
      const state = e.state || {}
      const path = state.path || ""
      this.delPathHandler(path)
    },false)
  }
  
  listenLink () {
    window.addEventListener('click', (e) => {
      const dom = e.target
      if (dom.target.toUpperCase() === 'A' && dom.target.getAttribute('href')){
        e.preventDefault()
        this.push(dom.getAttribute('href'))
      }
    } )
  }

  load () {
    const path = location.pathname
    this.delPathHandler(path)
  }
  register (path, callback) {
    this.routers[path] = callback
  }

  registerIndex (path, callback) {
    this.routers[path] = callback
  }

  registerNotFound (callback) {
    this.routers['404'] = callback
  }

  registerError (callback) {
    this.routers['error'] = callback
  }

  push (path) {
    history.pushState({path}, null, path)
    this.delPathHandler(path)
  }

  replace (path) {
    history.replaceState({path}, null, path)
    this.delPathHandler(path)
  }

  delPathHandler (path) {
    const handler
    if (!this.routers.hasOwnProperty(path)) {
      handler = this.routers['404'] || function() {}
    } else {
      handler = this.routers[path]
    }

    try{
      handler.call(this)
    } catch(e) {
      console.error(e)
      (this.routers['error'] || function(){}).call(this,e)
    }
  }
}