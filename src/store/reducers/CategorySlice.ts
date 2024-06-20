import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CategoryState {
  selectedCategory: string
  categories: string[]
}

const initialState: CategoryState = {
  selectedCategory: '',
  categories: [],
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload
    },
    selectCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload
    },
  },
})

export const { setCategories, selectCategory } = categorySlice.actions
export default categorySlice.reducer
