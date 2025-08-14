/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type {
  FetchedCurrentUser,
  UserSettingsStateType,
  UserSettingsThunkType,
} from 'src/types/slices';
import routes from '../routes';

export const fetchUserSettings = createAsyncThunk<UserSettingsThunkType>(
  'userSettings/fetchUserSettings',
  async () => {
    const response = await axios.get(routes.userProfilePath());
    return response.data;
  },
);

export const updateUserSettings = createAsyncThunk<
  FetchedCurrentUser,
  { id: number; data: Partial<FetchedCurrentUser> }
>('userSettings/updateUserSettings', async ({ id, data }) => {
  const response = await axios.put(routes.updateUserSettingsPath(id), data);
  return response.data;
});

const initialState: UserSettingsStateType = {
  language: '',
  theme: '',
  avatar: null,
  loadingStatus: 'idle',
};

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSettings.fulfilled, (state, { payload }) => {
        state.language = payload.currentUser?.language;
        state.theme = payload.currentUser?.theme;
        state.avatar = payload.currentUser?.avatar_base64;
      })
      .addCase(updateUserSettings.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(updateUserSettings.fulfilled, (state, { payload }) => {
        state.loadingStatus = 'idle';
        state.avatar = payload.avatar_base64;
      })
      .addCase(updateUserSettings.rejected, (state) => {
        state.loadingStatus = 'failed';
      });
  },
});

export const { actions } = userSettingsSlice;

export default userSettingsSlice.reducer;
