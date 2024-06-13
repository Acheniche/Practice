import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
  isOn: boolean
}

const initialState: ThemeState = {
  isOn: false,
}

export const themeSlice = createSlice({
  name: 'Theme',
  initialState,
  reducers: {
    changeTheme(state) {
      state.isOn = !state.isOn
    },
  },
})

export default themeSlice.reducer
