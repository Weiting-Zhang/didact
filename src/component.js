import { reconcile } from './reconciler'

export default class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState);
    updateInstance(this.__internalInstance);
  }
}

Component.prototype.isComponent = true;

function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const element = internalInstance.element;
  reconcile(parentDom, internalInstance, element);
}
