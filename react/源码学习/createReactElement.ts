/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-27 11:48:16
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-27 12:07:22
 */

import ReactElement from "./ReactElement"
import { hasValidKey, hasValidRef } from "./utils"

function createReactElement(type, config, children){
  let propName 
  let ref = null
  let key = null
  let props: Record<string, any> = {}
  // config 中提取出key和ref

 if(config) {
  if(hasValidKey(config)) {
    key = config.key
  }

  if(hasValidRef(config)) {
    ref = config.ref
  }

  //除去key ref 加入props中
  for(propName in config) {
    if(config.hasOwnProperty(propName)){
      props[propName] = config[propName]
    }
  }
 }

 //处理children
 const childrenLen = arguments.length - 2

 if(childrenLen == 1) {
   props.children = children
 }else {
   const childrenArray = Array(arguments)
   for( let i = 0; i < arguments.length; i++) {
    childrenArray[i] = arguments[i+2]
   }

   props.children = childrenArray
 }

 //返回reactElement
 return ReactElement(type, key, ref, props)
}



export default createReactElement