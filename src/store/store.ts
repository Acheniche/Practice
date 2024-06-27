import { combineReducers, configureStore } from '@reduxjs/toolkit'

import categoryReducer from './reducers/categorySlice'
import priceRangeReducer from './reducers/priceRangeSlice'
import productsReducer from './reducers/productsSlice'
import sortReducer from './reducers/sortSlice'
import themeReducer from './reducers/themeSlice'

const rootReducer = combineReducers({
  themeReducer,
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
