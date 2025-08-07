/* eslint no-param-reassign:
["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]  */
import { createSlice } from '@reduxjs/toolkit';
import type { ModalStateType } from 'src/types/state';

const initialState: ModalStateType = {
  isOpen: false,
  type: null,
  item: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.type = payload.type;
      state.item = payload.item;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
