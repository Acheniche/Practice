import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PriceRangeState {
  minPrice: number
  maxPrice: number
}

const initialState: PriceRangeState = {
  minPrice: 0,
  maxPrice: 1000,
}

const priceRangeSlice = createSlice({
  name: 'priceRange',
  initialState,
  reducers: {
    setPriceRange(
      state,
      action: PayloadAction<{ minPrice: number; maxPrice: number }>
    ) {
      state.minPrice = action.payload.minPrice
      state.maxPrice = action.payload.maxPrice
    },
  },
})

export const { setPriceRange } = priceRangeSlice.actions
export default priceRangeSlice.reducer
