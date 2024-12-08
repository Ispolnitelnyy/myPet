import Button from "shared/ui/button";
import { getCounterValue } from "./model/selectors/getCounterValue";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "./model/slice";

export const Counter = () => {
   const dispatch = useDispatch();
   const counterValue = useSelector(getCounterValue);

   const increment = () => {
      dispatch(counterActions.increment());
   };
   const decrement = () => {
      dispatch(counterActions.decrement());
   };
   return (
      <div>
         <h1>{counterValue}</h1>
         <Button onClick={increment}>increment</Button>
         <Button onClick={decrement}>decrement</Button>
      </div>
   );
};

export default Counter;
