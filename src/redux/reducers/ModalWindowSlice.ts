import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IModalConfirm {
  indexModal: number
  isShow: boolean
  idCompany: number
}

const initialState: IModalConfirm = {
  idCompany: 0,
  isShow: false,
  indexModal: 0
};

export const modalConfirmSlice = createSlice({
  name: 'modalConfirm',
  initialState,
  reducers: {
    openCloseWindow (state, action: PayloadAction<IModalConfirm>) {
      state.isShow = action.payload.isShow;
      state.idCompany = action.payload.idCompany;
      state.indexModal = action.payload.indexModal;
    }
  }
});

export default modalConfirmSlice.reducer;
