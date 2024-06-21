import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../types/product'
import { fetchProductById, fetchSimilarProducts } from './actionCreators'

interface ProductsState {
  product: Product | null
  similarProducts: Product[]
  error: string | null
  isLoading: boolean
}

const initialState: ProductsState = {
  product: null,
  similarProducts: [],
  error: null,
  isLoading: false,
}

const productsByIdSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.product = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Something went wrong'
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload
      })
  },
})

export default productsByIdSlice.reducer
