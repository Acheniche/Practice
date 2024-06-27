import { combineReducers, configureStore } from '@reduxjs/toolkit'

import categoryReducer from './reducers/categorySlice'
import priceRangeReducer from './reducers/priceRangeSlice'
import productsReducer from './reducers/productsSlice'
import sortReducer from './reducers/sortSlice'
import themeReducer from './reducers/themeSlice'
import userReducer from './reducers/userSlice'

const rootReducer = combineReducers({
  themeReducer,
  userReducer,
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
