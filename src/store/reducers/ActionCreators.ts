import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAllProducts = createAsyncThunk(
  'products',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products').then(
        (res) => res.json()
      )
      console.log(response)
      return response
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить данные')
    }
  }
)
