/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-17 22:44:25
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-17 23:06:12
 */

class PubSub {
  private event: Record<string, any> = {}
  
  constructor () {
  }

  on (name: string, cb: () => any) {
    if (!this.event[name]) {
      this.event[name] = cb
    } else {
      this.event[name] = [ ...this.event[name], cb]
    }
  }

  emit (name: string) {
    if(this.event[name]){
      this.event[name]()
    } else if(Array.isArray(this.event[name])){
      this.event[name].forEach( (cb: any) => {
        cb()
      })
    }
  }

  remove (name: string) {
    if(this.event[name]){
      this.event[name] = null
      delete this.event[name]
    }
  }
}


module.exports = PubSub
