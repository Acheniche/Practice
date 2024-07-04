import {
  addItemToCart,
  getCartItems,
  removeAllItemsFromCart,
  removeItemFromCart,
} from '../../pages/Cart/CartControls/controlFunctions'
import { CartItem } from '../../types/cartItem'
import { ProductListProps } from './types'

const CartItems = ({ items, setItems }: ProductListProps) => {
  const handleRemoveItem = async (itemId: number) => {
    await removeItemFromCart(itemId)
    const cartItems = await getCartItems()
    setItems(cartItems)
  }

  const handleAddItem = async (item: CartItem) => {
    await addItemToCart(item)
    const cartItems = await getCartItems()
    setItems(cartItems)
  }

  const handleRemoveAllItems = async (itemId: number) => {
    await removeAllItemsFromCart(itemId)
    const cartItems = await getCartItems()
    setItems(cartItems)
  }

  return (
    <div className="cart-list">
      <div className="products-list">
        {items.map((item) => (
          <div key={item.id} className="product-item">
            <img src={item.imageUrl} alt={item.name} />
            <h3>{item.name}</h3>
            <h2>${item.price.toFixed(2)}</h2>
            <button
              onClick={() => handleRemoveItem(item.id)}
              data-cy="remove-one"
            >
              Remove One
            </button>
            <h3>Quantity: {item.quantity}</h3>
            <button onClick={() => handleAddItem(item)} data-cy="add-one">
              Add One
            </button>
            <button
              onClick={() => handleRemoveAllItems(item.id)}
              data-cy="remove-all"
            >
              Remove All
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CartItems
