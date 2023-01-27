import { configureStore, combineReducers } from '@reduxjs/toolkit';
import companySlice from '../reducers/CompanySlice';

const rootReducer = combineReducers({
  companySlice
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
