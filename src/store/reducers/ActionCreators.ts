import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from '../../types/product'

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

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const response = await fetch(baseUrl + `/products/${id}`).then((res) =>
      res.json()
    )
    return response
  }
)

export const fetchSimilarProducts = createAsyncThunk(
  'products/fetchSimilarProducts',
  async ({ category, productId }: { category: string; productId: number }) => {
    const response = await fetch(baseUrl + `/products`).then((res) =>
      res.json()
    )
    const filteredProducts = response.filter(
      (product: Product) =>
        product.category === category && product.id !== productId
    )
    return filteredProducts.slice(0, 3)
  }
)
