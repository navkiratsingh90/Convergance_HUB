import { createSlice } from '@reduxjs/toolkit';
import { FaLastfmSquare } from 'react-icons/fa';

const initialState = {
	darkMode: true
};

const ThemeSlice = createSlice({
  name: 'Theme',
  initialState,
  reducers: {
		handleTheme: (state,action) => {
			state.darkMode = !state.darkMode
		}
  },
});

// Export actions
export const {handleTheme} = ThemeSlice.actions;

// Export reducer
export default ThemeSlice.reducer;