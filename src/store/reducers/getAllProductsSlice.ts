import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../models/IProduct'
import { getAllProducts } from './ActionCreators'

export interface ProductState {
  products: IProduct[]
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
        (state, action: PayloadAction<IProduct[]>) => {
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
  // [getAllProducts.fulfilled.type]: (state, action: PayloadAction<IProduct[]>) =>{
  //     state.isLoading = false;
  //     state.error = '';
  //     state.products = action.payload;
  // },
  // [getAllProducts.pending.type]: (state) => {
  //     state.isLoading = true;
  // },
  // [getAllProducts.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  // }
})

export default getAllProductsSlice.reducer
