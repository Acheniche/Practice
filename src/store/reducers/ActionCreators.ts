import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUserCart } from '../../models/IUserCart'

export const getAllProducts = createAsyncThunk(
  'products',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products').then(
        (res) => res.json()
      )
      return response
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить данные')
    }
  }
)

export const getAllUsers = createAsyncThunk('users', async (_, thunkAPI) => {
  try {
    const response = await fetch('https://fakestoreapi.com/users').then((res) =>
      res.json()
    )
    return response
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить данные')
  }
})

export const getUserCart = createAsyncThunk(
  'cart',
  async (Id: number, thunkAPI) => {
    try {
      const url = `https://fakestoreapi.com/carts/user/${Id}`
      const response = await fetch(url).then((res) => res.json())

      let carts: any[] = []

      await Promise.all(
        response.map(async (cart: IUserCart) => {
          const products = await Promise.all(
            cart.products.map(async (product: { productId: number }) => {
              const productResponse = await fetch(
                `https://fakestoreapi.com/products/${product.productId}`
              )
              const productData = await productResponse.json()
              return {
                productId: productData.id,
                title: productData.title,
                price: productData.price,
                image: productData.image,
                category: productData.category,
              }
            })
          )
          carts = carts.concat(products)
        })
      )

      return carts
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить данные')
    }
  }
)
