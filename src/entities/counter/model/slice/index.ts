
import { createSlice } from '@reduxjs/toolkit'
import { CounterSchema } from '../types'


const initialState: CounterSchema = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit позволяет нам писать «мутирующую» логику в редукторах. Это
      // на самом деле не изменяет состояние, поскольку использует библиотеку Immer,
      // который обнаруживает изменения в «черновом состоянии» и создает совершенно новый
      // неизменное состояние, основанное на этих изменениях
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

// Создатели действий генерируются для каждой функции редуктора случая.
export const {actions: counterActions  } = counterSlice
export const {reducer: counterReducer  } = counterSlice
