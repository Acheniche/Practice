import { CartItem } from '../../types/cartItem'

export interface ProductListProps {
  items: CartItem[]
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}
