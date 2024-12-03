import { useState } from "react";
import classes from "./index.module.scss";
export const Counter = () => {
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount(count + 1);
  };
  const decrementHandler = () => {
    setCount(count - 1);
  };

  return (
    <div className={classes.red}>
      <h1>{count}</h1>
      <button onClick={incrementHandler}> increment </button>
      <button onClick={decrementHandler}> decrement </button>
    </div>
  );
};
