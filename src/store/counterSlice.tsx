import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: Number(localStorage.getItem('counter')) || 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      if (state.count > 0) state.count--;
    },
    reset(state) {
      state.count = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;