import { useState, useEffect } from 'react'
import { CartItem } from '../../types/cartItem'
import { auth } from '../../utils/firebase'
import { getCartItems, clearCart } from './CartControls/controlFunctions'
import CartItems from '../CartItem'
import './index.css'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [thankYouMessage, setThankYouMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getCartItems()
      setItems(cartItems)
    }
    fetchCartItems()
  }, [auth.currentUser])

  const handleShopNow = () => {
    if (items.length > 0) {
      setIsModalOpen(true)
    }
  }

  const handleConfirmPurchase = async () => {
    await clearCart()
    setItems([])
    setIsModalOpen(false)
    setThankYouMessage('Спасибо за покупку!')
  }

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div className="Cart">
      {thankYouMessage ? (
        <p>{thankYouMessage}</p>
      ) : (
        <>
          <CartItems items={items} setItems={setItems} />
          {items.length === 0 ? (
            <>
              <h1>Cart is empty(</h1>
              <button onClick={() => navigate(`/shop`)}>Go to shop</button>
            </>
          ) : (
            <>
              <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
              <button onClick={handleShopNow}>Shop now</button>
            </>
          )}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Confirm Purchase</h2>
                <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                <ul>
                  {items.map((item) => (
                    <li key={item.id}>
                      {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
                <button onClick={handleConfirmPurchase}>Confirm</button>
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Cart
