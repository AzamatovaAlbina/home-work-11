import React, { useReducer } from "react";

const counterReducer = (state, action) => {
  if (action.type === "PLUS") {
    return state + 1;
  }
  if (action.type === "MINUS") {
    if (state > 1) {
      return state - 1;
    }
    return state
  }
};
// const initialState = {
//     counter: 0
// }
const Counter = () => {
  const [counter, dispatchCounter] = useReducer(counterReducer, 0);

  const plusFunc = () => {
    dispatchCounter({ type: "PLUS" });
  };

  const minusFunc = () => {
    dispatchCounter({ type: "MINUS" });
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={minusFunc}>-</button>
      <button onClick={plusFunc}>+</button>
    </div>
  );
};

export default Counter;
