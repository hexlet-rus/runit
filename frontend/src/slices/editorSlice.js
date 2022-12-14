/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'editor',
  initialState: {
    error: false,
    isFetching: false,
    code: '// Write your code in JS\n',
    savedCode: '// Write your code in JS\n',
    isAllSaved: true,
  },
  reducers: {
    setCodeAndSavedCode(state, { payload }) {
      state.code = payload;
      state.savedCode = payload;
      state.isAllSaved = true;
    },
    updateCode(state, { payload }) {
      state.code = payload;
      state.isAllSaved = state.code === state.savedCode;
    },
    updateSavedCode(state, { payload }) {
      state.savedCode = payload;
      state.isAllSaved = state.code === state.savedCode;
    },
  },
});
const isAuthenticated = async () => {
  const response = await axios.get('api/users/profile');
  return response.user;
};

export const getData = async () => {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    return null;
  }
  const data = await axios.post('api/snippets', { code: '' });
  return data.data.id;
};

export const { actions } = slice;

export default slice.reducer;
