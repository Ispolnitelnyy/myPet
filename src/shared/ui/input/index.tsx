import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { InputHTMLAttributes, memo } from "react";

type HTMLInputProps = Omit<
   InputHTMLAttributes<HTMLInputElement>,
   "value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
   className?: string;
   value?: string;
   onChange?: (vaalue: string) => void;
   type?: string;
}



export const Input = memo((props: InputProps) => {
   const { className, value, onChange, type = 'text', ...otherProps } = props;

   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
};

   return (
      <div className={classNames(cls.input, {}, [className])}>
         <input type={type} value={value} onChange={onChangeHandler}/>
      </div>
   );
});

export default Input;
