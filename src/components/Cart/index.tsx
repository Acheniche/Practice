import { useState, useEffect } from 'react'
import { CartItem } from '../../types/cartItem'
import { auth } from '../../utils/firebase'
import { getCartItems } from './CartControls/controlFunctions'
import CartItems from './CartItems'

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getCartItems()
      setItems(cartItems)
    }
    fetchCartItems()
  }, [auth.currentUser])

  return (
    <div>
      <h1>Cart</h1>
      <CartItems items={items} setItems={setItems} />
    </div>
  )
}

export default Cart
