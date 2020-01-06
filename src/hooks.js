import { reconcile } from './reconciler'
import Component from './component'

let contextStack = []

export function useState(defaultState) {
  const context = contextStack[contextStack.length - 1]
  const index = context.index++;
  const { states, instance } = context;

  function setState(newState) {
    const { dom, element } = instance;
    states[index] = newState;
    reconcile(dom.parentNode, instance, element);
  }

  if (typeof states[index] === 'undefined') {
    states[index] = defaultState
  }

  return [states[index], setState]
}

export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
 
export function withState(func) {
  const states = {};
  // 这里把函数式组件转化成了类组件
  // 方便通过 __internalInstance 去获得更新时的上下文
  return ((...args) => {
    class withHooks extends Component {
      render () {
        contextStack.push({ index: 0, states, instance: this.__internalInstance  })
        const result = func(...args)
        contextStack.pop()
        return result;
      }
    }
    withHooks.displayName = func.name;
    return withHooks;
  })()
}
