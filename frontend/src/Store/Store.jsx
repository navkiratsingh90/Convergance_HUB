import { configureStore } from '@reduxjs/toolkit'
// import AuthReducer from '../Features/Auth/AuthSlice'
import ThemeReducer from '../Features/ThemeSlice';

export const store = configureStore({
  reducer: {
		Theme : ThemeReducer
    
  },
});