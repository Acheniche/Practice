import { Product } from './product'

export interface ProductsState {
  products: Product[]
  product: Product | null
  similarProducts: Product[]
  error: string | null
  isLoading: boolean
}
