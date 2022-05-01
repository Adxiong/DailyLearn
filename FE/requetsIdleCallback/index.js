/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-05-01 11:09:41
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-01 23:08:40
 */

let nextFiberReconcileWork = null
let wipRoot = null


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

function isEventListenerAttr(key, value) {
  return typeof value == 'function' && key.startsWith('on');
}

function isStyleAttr(key, value) {
  return key == 'style' && typeof value == 'object';
}

function isPlainAttr(key, value) {
  return typeof value != 'object' && typeof value != 'function';
}

const setAttribute = (dom, key, value) => {
  if (key === 'children') {
    return;
  }

  if (key === 'nodeValue') {
    dom.textContent = value;
  } else if (isEventListenerAttr(key, value)) {
    const eventType = key.slice(2).toLowerCase();
    dom.addEventListener(eventType, value);
  } else if (isStyleAttr(key, value)) {
    Object.assign(dom.style, value);
  } else if (isPlainAttr(key, value)) {
    dom.setAttribute(key, value);
  }
};


function createDom(fiber) {
  const dom = fiber.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type);

  for (const prop in fiber.props) {
    setAttribute(dom, prop, fiber.props[prop]);
  }

  return dom;
}

function reConcile(fiber) {
  let index = 0
  let prevSibling = null
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  while (index < fiber.props.children.length) {
    const element = fiber.props.children[index]
    // console.log(element);
    const newFiber = {
      type: element.type,
      props: element.props,
      dom: null,
      child: null,
      parent: fiber
    }
    if (index === 0) {
      fiber.child = newFiber
    } else if (element) {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}

function performNextWork(fiber) {
  let nextFiber = null
  reConcile(fiber)

  if (fiber.child) {
    return fiber.child
  }

  nextFiber = fiber

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
  return nextFiber

}

function commitWork(fiber) {
  if (!fiber) {
    return
  }
  let domParentFiber = fiber.parent

  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom
  if (fiber.dom != null) {
    domParent.appendChild(fiber.dom)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function commitRoot() {
  if (!wipRoot) return
  commitWork(wipRoot.child)
  wipRoot = null
}

function workLoop(idleDeadline) {
  let shouldYield = false
  if (nextFiberReconcileWork && !shouldYield) {
    nextFiberReconcileWork = performNextWork(nextFiberReconcileWork)
    shouldYield = idleDeadline.timeRemaining() < 1
  }
  if (!nextFiberReconcileWork) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}


function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    }
  }
  nextFiberReconcileWork = wipRoot
}


const app = createElement("div", {
  class: "container",
  style: {
    width: "100px",
    height: "100px",
    backgroundColor: "#f40"
  },
}, createElement("h1", {
  class: "title"
}, "登黄鹤楼"), createElement("p", {
  class: "context"
}, "欲穷千里目"), createElement("p", {
  class: "context"
}, "更上一层楼"))


render(app, document.getElementById("root"))

requestIdleCallback(workLoop)
