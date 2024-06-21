import { combineReducers, configureStore } from '@reduxjs/toolkit'
import themeReducer from './reducers/themeSlice'
import getAllProductsReducer from './reducers/getAllProductsSlice'
import userReducer from './reducers/userSlice'
import categoryReducer from './reducers/categorySlice'
import sortReducer from './reducers/sortSlice'
import productsReducer from './reducers/productsSlice'
import priceRangeReducer from './reducers/priceRangeSlice'
import getProductByIdReducer from './reducers/getProductByIdSlice'

const rootReducer = combineReducers({
  themeReducer,
  getAllProductsReducer,
  userReducer,
  categoryReducer,
  sortReducer,
  productsReducer,
  priceRangeReducer,
  getProductByIdReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
