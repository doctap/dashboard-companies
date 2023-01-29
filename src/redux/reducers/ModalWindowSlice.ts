import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IModal {
  indexModal: number
  isShow: boolean
  idCompany: number
}

const initialState: IModal = {
  idCompany: 0,
  isShow: false,
  indexModal: 0
};

export const modalWindowSlice = createSlice({
  name: 'modalConfirm',
  initialState,
  reducers: {
    manageWindow (state, action: PayloadAction<IModal>) {
      state.isShow = action.payload.isShow;
      state.idCompany = action.payload.idCompany;
      state.indexModal = action.payload.indexModal;
    },
    showHideWindow (state, action: PayloadAction<boolean>) {
      state.isShow = action.payload;
    }
  }
});

export default modalWindowSlice.reducer;
