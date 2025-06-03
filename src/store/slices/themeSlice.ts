import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '../../types';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../utils/constants';

interface ThemeState {
  currentTheme: Theme;
  isLoading: boolean;
}

const initialState: ThemeState = {
  currentTheme: 'light',
  isLoading: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload;
      // Lưu theme vào storage
      storage.setItem(STORAGE_KEYS.THEME, action.payload);
    },
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      // Lưu theme vào storage
      storage.setItem(STORAGE_KEYS.THEME, state.currentTheme);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Export actions
export const { setTheme, toggleTheme, setLoading } = themeSlice.actions;

// Export reducer
export default themeSlice.reducer; 