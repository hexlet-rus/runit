/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { UserSliceStateType } from 'src/types/slices';

const initialState: UserSliceStateType = {
  status: 'empty',
  userInfo: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    setUserStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const { actions } = userSlice;

export default userSlice.reducer;
