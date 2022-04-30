/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-30 23:02:58
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-30 23:34:41
 */

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children?.map(child => typeof child === "object" ? child : createTextElement(child))
    }
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  }
}

export { createElement }

