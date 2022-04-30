/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-30 23:22:08
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-30 23:32:42
 */

function render(element, container) {
  const dom =
    element.type == "TEXT_ELEMENT" ?
      document.createTextNode("") :
      document.createElement(element.type)

  const isProperty = key => key != "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(key => {
      dom[key] = element.props[key]
    })
  element.props.children?.forEach(child => render(child, dom))

  container.appendChild(dom)
}

export { render }