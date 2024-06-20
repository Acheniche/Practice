import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

interface FetchProductsParams {
  category: string
  sort: 'asc' | 'desc'
  minPrice: number
  maxPrice: number
  searchQuery: string
}

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

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [] as Product[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message as string
      })
  },
})

export default productsSlice.reducer
