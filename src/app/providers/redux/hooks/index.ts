import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch } from "../storeProvider/config/store";
import { useSelector } from "react-redux";
import { StateSchema } from "../storeProvider/config/stateSchema";

// По умолчанию useDispatch не знает о кастомных типах,
// поэтому нужно передавать свой тип AppDispatch,
// чтобы он работал корректно с асинхронными действиями и Redux Toolkit
// export const useAppDispatch: () => AppDispatch = useDispatch; // кастомный хук для работы с асинхронными thunks
// дока предлагает
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types

// тоже самон с useSelector
// Чтобы каждый раз не указывать дженерик явно, можно создать свою обертку
// делает код чище и избавляет от необходимости повторять типизацию в каждом вызове useSelector
// удобнее использовать useAppSelector вместо useSelector, он автоматически будет знать тип состояния
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
