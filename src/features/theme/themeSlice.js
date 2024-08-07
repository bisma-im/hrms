import { createSlice } from '@reduxjs/toolkit';
import { lightTheme, darkTheme } from 'config/themes';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: lightTheme // default theme
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme.mode === 'light' ? darkTheme : lightTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
