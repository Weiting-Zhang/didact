import { deepEqual } from "./dom-utils";

let rootInstance = null;

export function render(element, container) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
}

export function reconcile(parentDom, instance, element) {
  if (instance === null) {
    const newInstance = instantiate(element); // 第一次实例化完成（包含 childInstances)
    parentDom.appendChild(newInstance.dom); // 此时的 dom，已经收集好了所有子元素
    return newInstance; // 返回并存储到 rootInstance 中，供下次 render 时使用
  } else if (!element) {
    // 更新时删除了该节点
    parentDom.removeChild(instance.dom);
    return null;
  } else if (instance.publicInstance && instance.element.type === element.type) {
    // 类组件
    const { childInstance: prevChildInstance, publicInstance } = instance;
    const childElement = publicInstance.render();
    const childInstance = reconcile(parentDom, prevChildInstance, childElement);
    instance.childInstance = childInstance;
    instance.dom = childInstance.dom;
    return instance;
  } else if (instance.element.type === element.type && typeof element.type === 'function') {
    // 函数式组件
    const { childInstance: prevChildInstance } = instance;
    const childElement = element.type(element.props);
    const childInstance = reconcile(parentDom, prevChildInstance, childElement);
    instance.childInstance = childInstance;
    instance.dom = childInstance.dom;
    return instance;
  } else if (instance.element.type === element.type && typeof element.type === 'string') {
    // dom 标签
    if (!deepEqual(element.props, instance.element.props)) {
      // 新旧 props 有不同
      // 更新 dom 属性
      updateDomProperties(instance.dom, instance.element.props, element.props);
      // 更新 childInstances
      instance.childInstances = reconcileChildren(instance, element);
    }
    instance.element = element;
    return instance;
  } else {
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom); // 暴力替换
    return newInstance; // 返回并存储到 rootInstance 中，供下次 render 时使用
  }
}

function instantiate(element) {
  const { type, props } = element;
  const isDomElement = typeof type === 'string';
  const isClassComponent = typeof type === 'function'
    && type.prototype.isReactComponent;
  if (isDomElement) {
    // Create DOM element
    const isTextElement = type === "TEXT ELEMENT";
    const dom = isTextElement
      ? document.createTextNode("")
      : document.createElement(type);

    updateDomProperties(dom, [], props);

    // Instantiate and append children
    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);
    childInstances.forEach(child => {
      dom.appendChild(child.dom);
    });

    // return to reconcile
    const instance = { dom, element, childInstances };
    return instance;
  } else if (isClassComponent) {
    // class
    const instance = {};
    const publicInstance = createPublicInstance(element, instance);
    const childElement = publicInstance.render();
    const childInstance = instantiate(childElement);
    const dom = childInstance.dom;
    Object.assign(instance, { dom, element, childInstance, publicInstance });
    return instance;
  } else {
    // function component
    const instance = {};
    const childElement = type(props);
    const childInstance = instantiate(childElement);
    const dom = childInstance.dom;
    Object.assign(instance, { dom, element, childInstance });
    return instance;
  }
}

function reconcileChildren(instance, element) {
  const prevChildInstances = instance.childInstances;
  const childElements = element.props.children || [];
  const count = Math.max(prevChildInstances.length, childElements.length);
  const childInstances = [];
  for (let i = 0; i < count; i++) {
    const childInstance = reconcile(
      instance.dom,
      prevChildInstances[i] || null,
      childElements[i]
    );
    if (childInstance) {
      // 过滤掉已移除的 instance
      childInstances.push(childInstance);
    }
  }
  return childInstances;
}

function createPublicInstance(element, internalInstance) {
  const { type, props } = element;
  const publicInstance = new type(props);
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
}

function updateDomProperties(dom, prevProps, nextProps) {
  // 低版本的 rollup 会报错，因为 acorn Parser 没有支持对象 spread 语法
  // https://github.com/rollup/rollup/issues/1613
  // 升级 rollup 版本即可
  const { children: prevChildren, ...prevOtherProps } = prevProps;
  const { children: nextChildren, ...nextOtherProps } = nextProps;

  if (deepEqual(prevOtherProps, nextOtherProps)) {
    // 如果除了 children 属性 新旧 props 都相同
    // 则跳过 DOM 属性更新
    return;
  }

  const isEvent = name => name.startsWith("on");
  const isAttribute = name => !isEvent(name) && name != "children";

  // Remove event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove attributes
  Object.keys(prevProps)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = null;
    });

  // Set attributes
  Object.keys(nextProps)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}
