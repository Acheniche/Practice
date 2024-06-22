import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../types/product'
import {
  fetchProductById,
  fetchProducts,
  fetchSimilarProducts,
  getAllProducts,
} from './actionCreators'
import { ProductsState } from '../../types/productsState'

const initialState: ProductsState = {
  products: [],
  product: null,
  similarProducts: [],
  error: null,
  isLoading: false,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.isLoading = false
          state.products = action.payload
          state.error = null
        }
      )
      .addCase(getAllProducts.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.isLoading = false
          state.product = action.payload
          state.error = null
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Something went wrong'
      })
      .addCase(
        fetchSimilarProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.similarProducts = action.payload
        }
      )
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.isLoading = false
          state.products = action.payload
          state.error = null
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Something went wrong'
      })
  },
})

export default productsSlice.reducer
