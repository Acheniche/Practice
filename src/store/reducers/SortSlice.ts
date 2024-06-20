import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SortState {
  sortBy: 'asc' | 'desc'
}

const initialState: SortState = {
  sortBy: 'asc',
}

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<'asc' | 'desc'>) {
      state.sortBy = action.payload
    },
  },
})

export const { setSort } = sortSlice.actions
export default sortSlice.reducer
