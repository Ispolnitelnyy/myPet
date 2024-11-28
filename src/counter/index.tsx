import { useState } from "react";
import "./index.scss";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount(count + 1);
  };
  const decrementHandler = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={incrementHandler}> increment </button>
      <button onClick={decrementHandler}> decrement </button>
    </div>
  );
};
