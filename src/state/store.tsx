import {
  configureStore, combineReducers, AnyAction, Reducer,
} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import accountReducer from './accountSlice';

const combinedReducer = combineReducers({
  userState: userReducer,
  accountState: accountReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'logout') {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,

});

export { store };

// Infer the `RootState` types from the store itself
export type RootState = ReturnType<typeof combinedReducer>;
