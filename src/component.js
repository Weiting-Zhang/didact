import { reconcile } from './reconciler'

export default class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
    this.shouldUpdate = true;
  }

  setState(partialState) {
    // 同步更新 state
    this.state = Object.assign({}, this.state, partialState);
    scheduleWork(this);
  }
}

Component.prototype.isReactComponent = true;

function scheduleWork(component) {
  if (component.shouldUpdate) {
    component.shouldUpdate = false;
    // 异步更新 dom
    Promise.resolve().then(() => {
      updateInstance(component.__internalInstance);
      component.shouldUpdate = true;
    })
  }
}

function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const element = internalInstance.element;
  reconcile(parentDom, internalInstance, element);
}
