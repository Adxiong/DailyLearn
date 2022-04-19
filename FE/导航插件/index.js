/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-19 22:27:43
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-19 22:27:43
 */

function createMenuNav() {
  console.log("sdfsdf")
  var div = document.createElement("div")
  div.innerText = "🚀\nLikes"
  div.class = 'tm_navMenuBtn'
  div.style.width = "50px"
  div.style.height = "50px"
  div.style.display = "flex"
  div.style.justifyContent = "center"
  div.style.textAlign = "center"
  div.style.alignItems = "center"
  div.style.backgroundColor = "#fff"
  div.style.border = "1px solid #e3e5e7"
  div.style.position = "fixed"
  div.style.top = "30%"
  div.style.right = "10px"
  div.style.borderRadius = "8px"
  div.style.zIndex = 99999
  document.body.appendChild(div)
}


createMenuNav()
