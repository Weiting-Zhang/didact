let rootInstance = null;

export function render(element, container) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
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

function reconcile(parentDom, instance, element) {
  debugger;
  if (instance === null) {
    debugger;
    const newInstance = instantiate(element); // 第一次实例化完成（包含 childInstances)
    parentDom.appendChild(newInstance.dom); // 此时的 dom，已经收集好了所有子元素
    return newInstance; // 返回并存储到 rootInstance 中，供下次 render 时使用
  } else if (!element) {
    // 更新时删除了该节点
    parentDom.removeChild(instance.dom);
    return null;
  } else if (instance.element.type === element.type) {
    // 上次 render 的 element type 和本次将要 render 的 element type 相同
    // 更新 dom 属性
    updateDomProperties(instance.dom, instance.element.props, element.props);
    // 更新 childInstances
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else {
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom); // 暴力替换
    return newInstance; // 返回并存储到 rootInstance 中，供下次 render 时使用
  }
}

function updateDomProperties(dom, prevProps, nextProps) {
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

function instantiate(element) {
  const { type, props } = element;

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
}
