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
  SEARCH: 'Search',
  SCHEDULE: 'Schedule',
  PROFILE: 'Profile',
} as const; 