import { createSlice } from '@reduxjs/toolkit';
import { AccountInterface } from '../types/interfaces/accountInterface';
import initialState from './initialState';
import { RootState } from './store';

export const accountSlice = createSlice({
  name: 'accountState',
  initialState: initialState.account,
  reducers: {
    setAccount: (state, action) => {
      const newState: AccountInterface = action.payload;
      return newState;
    },
  },
});

export const { setAccount } = accountSlice.actions;
export const account = (state:RootState) => state.accountState;
export default accountSlice.reducer;
