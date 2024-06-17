import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../models/IUser'
import { getAllUsers } from './ActionCreators'

export interface UserState {
  users: IUser[]
  isLoading: boolean
  error: string
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
}

export const getAllUsersSlice = createSlice({
  name: 'getAllUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.isLoading = false
          state.error = ''
          state.users = action.payload
        }
      )
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllUsers.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default getAllUsersSlice.reducer
