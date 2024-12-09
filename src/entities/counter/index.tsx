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
         <h1 data-testid="counter-value">{counterValue}</h1>
         <Button data-testid="increment" onClick={increment}>
            increment
         </Button>
         <Button data-testid="decrement" onClick={decrement}>
            decrement
         </Button>
      </div>
   );
};

export default Counter;
