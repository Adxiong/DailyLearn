import React from 'react'
import ReactDOM from 'react-dom/client'
import { createElement } from "../myReact"
import { render } from '../myReact'

const app = React.createElement("div", {
  title: "kkk"
}, "海伦的", "bbq")

const app1 = createElement("div", {
  title: "aaa"
}, "海伦的", "bbq")


console.log(app);
console.log(app1)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   app
// )

render(app1, document.getElementById('root'))