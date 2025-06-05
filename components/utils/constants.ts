export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile/update',
} as const;

export const NAVIGATION = {
  HOME: 'Home',
  BOOKMARKS: 'Bookmarks',
  CHATBOT: 'ChatBot',
  GRID: 'Grid',
  PROFILE: 'Profile',
} as const;

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const LAYOUT = {
  TAB_BAR_HEIGHT: 60,
  LOGO_SIZE: 60,
  ICON_SIZE: 24,
  BORDER_RADIUS: 15,
} as const; 