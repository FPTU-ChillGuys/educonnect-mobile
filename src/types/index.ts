import { NAVIGATION } from '../utils/constants';

export type RootStackParamList = {
  [NAVIGATION.HOME]: undefined;
  [NAVIGATION.BOOKMARKS]: undefined;
  [NAVIGATION.CHATBOT]: undefined;
  [NAVIGATION.GRID]: undefined;
  [NAVIGATION.PROFILE]: undefined;
};

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'vi'; 