import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch } from "../storeProvider/store";
import { useSelector } from "react-redux";
import { StateSchema } from "../storeProvider/store/stateSchema";

// По умолчанию useDispatch не знает о кастомных типах,
// поэтому нужно передавать свой тип AppDispatch,
// чтобы он работал корректно с асинхронными действиями и Redux Toolkit
export const useAppDispatch: () => AppDispatch = useDispatch; // кастомный хук для работы с асинхронными thunks

// тоже самон с useSelector
// Чтобы каждый раз не указывать дженерик явно, можно создать свою обертку
// делает код чище и избавляет от необходимости повторять типизацию в каждом вызове useSelector
// удобнее использовать useAppSelector вместо useSelector, он автоматически будет знать тип состояния
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
