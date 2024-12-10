import { classNames } from "shared/helpers/classNames";
import cls from "./index.module.scss";
import { InputHTMLAttributes, memo, useEffect, useRef, useState } from "react";

// HTMLInputProps чтобы избежать конфликта типов, так как input по дефолту уже принимает value и onChange
type HTMLInputProps = Omit<
   InputHTMLAttributes<HTMLInputElement>,
   "value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
   className?: string;
   value?: string;
   onChange?: (vaalue: string) => void; // меняет value
   type?: string;
   plaseholder?: string; // для кастомного plaseholder
   autofocus?: boolean; // чтобы автоматом ставилась каретка при монтировании
}

// оборачиваем компонент в memo чтобы избежать лишних перерисовок
export const Input = memo((props: InputProps) => {
   const {
      className,
      value,
      onChange,
      type = "text",
      placeholder,
      autofocus,
      ...otherProps
   } = props;

   const ref = useRef<HTMLInputElement>(null); // определяем ссылку на HTMLInputElement
   const [isFocused, setIsFocused] = useState(false); // чтобы каретка не мерцала по дефолту
   const [caretPosition, setCaretPosition] = useState(0);

   useEffect(() => {
      if (autofocus) {
         // устанавливаем автофокус для отобожения кретки при монтировании
         setIsFocused(true);
         // ставим физически каретку в инпут
         // в поле curren находится инпут и вызываем у него focus()
         ref.current?.focus();
      }
   }, [autofocus]);

   // стандартный input аргументом принимает event
   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value); // тут отдаем сразу value при event
      setCaretPosition(e.target.value.length); // при event меняем позицию каретки
   };

   const onBlur = () => {
      setIsFocused(false);
   };
   const onFocus = () => {
      setIsFocused(true);
   };

   // для того чтобы коретка была подвижна к месту где курсор
   const onSelect: React.ReactEventHandler<HTMLInputElement> = (e) => {
      const target = e.target as HTMLInputElement;
      // selectionStart определяет какой текст выбран
      setCaretPosition(target.selectionStart || 0);
   };

   return (
      <div className={classNames(cls.inputwrapper, {}, [className])}>
         {placeholder && (
            <div className={cls.placeholder}>{`${placeholder}>`}</div>
         )}
         <div className={cls.caretwrapper}>
            <input
               ref={ref}
               type={type}
               value={value}
               onChange={onChangeHandler}
               className={cls.input}
               onFocus={onFocus}
               onBlur={onBlur}
               onSelect={onSelect}
               {...otherProps}
            />
            {isFocused && (
               <span
                  className={cls.caret}
                  style={{ left: `${caretPosition * 9}px` }}
               ></span>
            )}
         </div>
      </div>
   );
});

export default Input;
