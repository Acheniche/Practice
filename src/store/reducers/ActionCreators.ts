import { createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = 'https://fakestoreapi.com'

export const getAllProducts = createAsyncThunk(
  'products',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(baseUrl + '/products').then((res) =>
        res.json()
      )
      return response
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить данные')
    }
  }
)
