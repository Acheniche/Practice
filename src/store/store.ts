import { combineReducers, configureStore } from '@reduxjs/toolkit'
import themeReducer from './reducers/ThemeSlice'
import getAllProductsReducer from './reducers/GetAllProductsSlice'
import getAllUsersReducer from './reducers/GetAllUsersSlice'
import userReducer from './reducers/UserSlice'
import getUserCartReducer from './reducers/GetUserCartSlice'

import categoryReducer from './reducers/CategorySlice'
import sortReducer from './reducers/SortSlice'
import productsReducer from './reducers/ProductsSlice'
import priceRangeReducer from './reducers/PriceRangeSlice'

const rootReducer = combineReducers({
  themeReducer,
  getAllProductsReducer,
  getAllUsersReducer,
  userReducer,
  getUserCartReducer,
  categoryReducer,
  sortReducer,
  productsReducer,
  priceRangeReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
