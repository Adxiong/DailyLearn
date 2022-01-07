/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-07 22:34:42
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-08 00:25:01
 */


class HashRouter {
  constructor () {
    this.routers = {}
    window.addEventListener( "hashchange", this.load.bind(this), false)
  }

  register( hash, callback) {
    this.routers[hash] = callback
  } 

  registerIndex( callback ) {
    this.routers['index'] = callback
  }

  registerNotFound (callback) {
    this.routers['404'] = callback
  }

  registerError (callback) {
    this.routers['error'] = callback
  }

  load () {
    const hash = location.hash.split(1)
    const handler
    if (!hash) {
      handler = this.routers.index
    } else if (!this.routers.hasOwnPropetry(hash)) {
      handler = this.routers['404'] || function(){}
    } else {
      handler = this.routers[hash]
    }

    try {
      handler.apply(this)
    } catch(e) {
      console.error(e);
      (this.routers['error'] || function(){}).call(this, e)
    }
  }
}