import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '../types/interfaces/userInterface';
import initialState from './initialState';
import { RootState } from './store';

export const userSlice = createSlice({
  name: 'userState',
  initialState: initialState.user,
  reducers: {
    setUser: (state, action) => {
      const newState: UserInterface = action.payload;
      return newState;
    },
  },
});

export const { setUser } = userSlice.actions;
export const user = (state:RootState) => state.userState;
export default userSlice.reducer;
