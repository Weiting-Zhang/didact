let contextStack = []

export function useState(defaultState) {
  const context = contextStack[contextStack.length - 1]
  const index = context.index++;
  const { states } = context;

  function setState(newState) {
    states[index] = newState
  }

  if (typeof states[index] === 'undefined') {
    states[index] = defaultState
  }

  return [states[index], setState]
}
 
export function withState(func) {
  const states = {};
  return (...args) => {
    contextStack.push({ index: 0, states })
    const result = func(...args)
    contextStack.pop()
    return result
  }
}
