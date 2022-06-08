import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import accountReducer from './accountSlice';

const store = configureStore({
  reducer: {
    userState: userReducer,
    accountState: accountReducer,
  },
});

export { store };

// Infer the `RootState` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
