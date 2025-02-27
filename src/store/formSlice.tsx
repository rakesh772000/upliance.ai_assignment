import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
}

interface FormState {
  users: UserData[];
}

const initialState: FormState = {
  users: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<UserData>) {
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = formSlice.actions;
export default formSlice.reducer;