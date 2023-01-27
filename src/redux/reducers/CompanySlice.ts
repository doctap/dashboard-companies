import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ICompany, IItems } from '../../api';

const initialState: IItems<ICompany> = {
  items: [],
  error: '',
  isLoading: false
};

export const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    companiesFetching (state) {
      state.isLoading = true;
    },
    companiesFetchingSuccess (state, action: PayloadAction<ICompany[]>) {
      state.isLoading = false;
      state.error = '';
      state.items = action.payload;
    },
    companiesFetchingError (state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default companySlice.reducer;
