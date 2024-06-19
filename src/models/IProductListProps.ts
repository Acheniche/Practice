import { CartItem } from './ICartItem'

export interface ProductListProps {
  items: CartItem[]
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}
