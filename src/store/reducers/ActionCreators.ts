import { createAsyncThunk } from '@reduxjs/toolkit'

import { FetchProductsParams } from '../../types/fetchProductsParams'
import { Product } from '../../types/product'

const baseUrl = 'https://fakestoreapi.com'

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
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

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({
    category,
    sort,
    minPrice,
    maxPrice,
    searchQuery,
  }: FetchProductsParams) => {
    const response = await fetch('https://fakestoreapi.com/products').then(
      (data) => data.json()
    )
    let products: Product[] = response

    if (category) {
      products = products.filter((product) => product.category === category)
    }
    if (searchQuery) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    products = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    )

    if (sort === 'asc') {
      products.sort((a, b) => a.price - b.price)
    } else {
      products.sort((a, b) => b.price - a.price)
    }

    return products
  }
)
