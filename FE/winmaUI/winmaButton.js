/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-11-17 21:41:19
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-11-17 22:22:23
 */
class WinmaButton extends HTMLElement {
  constructor() {
    super();
    this.init()
  }

  init() {
    const shadow = this.attachShadow({ mode: "open" });

    const size = this.getAttribute("size")
    const type = this.getAttribute("type")
    const border = this.hasAttribute('border') ? "border" : ""
    const shape = this.getAttribute("shape")

    const div = document.createElement("div");
    div.setAttribute("class", ['winma_btn', size, type, border, shape].join(" "));
    console.log(this.textContent)
    div.textContent = this.textContent
    // this.removeChild(this.textContent)


    const style = document.createElement("style");
    style.textContent = `
      .winma_btn {
        display:inline-block;
        line-height:30px;
        text-align: center;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
      }
      .default {
        padding:5px 15px;
        border-radius:8px;
      }
      .circle{
        padding:10px;
        border-radius:50%;
      }
      .round{
        padding:10px 30px;
        border-radius:50px;
      }
      .small {
        font-size:12px;
      }
      .middle {
        font-size: 18px;
      }
      .large {
        font-size: 24px
      }
      .primary {
        color: #fff;
        background-color:#1890ff;
      }
    `
    shadow.appendChild(style)
    shadow.appendChild(div)

  }
}

customElements.define('winma-button', WinmaButton)
