/** @jsx didact.createElement */

const React = didact;
const ReactDOM = didact;
// const useState = didact.useState;
const withState = didact.withState;
const useReducer = didact.useReducer

const Counter = withState(
  function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <div>
        Count: {state.count}
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
      </div>
    );
  }
)

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

ReactDOM.render(<Counter/>, document.getElementById("root"));
