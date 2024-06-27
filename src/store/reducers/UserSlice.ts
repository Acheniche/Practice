import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '../../types/user'

interface UserState {
  User: IUser | null
}

const initialState: UserState = {
  User: null,
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.User = action.payload
    },
  },
})

export default userSlice.reducer
