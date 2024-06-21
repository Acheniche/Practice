import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../types/product'
import { getAllProducts } from './actionCreators'

export interface ProductState {
  products: Product[]
  isLoading: boolean
  error: string
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: '',
}

export const getAllProductsSlice = createSlice({
  name: 'getAllProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.isLoading = false
          state.error = ''
          state.products = action.payload
        }
      )
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllProducts.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default getAllProductsSlice.reducer
