import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUserCart } from '../../models/IUserCart'
import { getUserCart } from './ActionCreators'

export interface UserCartState {
  cart: IUserCart[]
  isLoading: boolean
  error: string
}

const initialState: UserCartState = {
  cart: [],
  isLoading: false,
  error: '',
}

export const getUserCartSlice = createSlice({
  name: 'getUserCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserCart.fulfilled,
        (state, action: PayloadAction<IUserCart[]>) => {
          state.isLoading = false
          state.error = ''
          state.cart = action.payload
        }
      )
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserCart.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default getUserCartSlice.reducer
