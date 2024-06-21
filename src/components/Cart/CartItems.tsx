import { ProductListProps } from '../../types/productListProps'
import './index.css'
import {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
} from './CartControls/controlFunctions'

const CartItems = ({ items, setItems }: ProductListProps) => {
  const handleRemoveItem = async (itemId: number) => {
    await removeItemFromCart(itemId)
    const cartItems = await getCartItems()
    setItems(cartItems)
  }

  const handleAddItem = async (item: {
    id: number
    name: string
    description: string
    imageUrl: string
    price: string
    category: string
    quantity?: number
  }) => {
    await addItemToCart({
      id: item.id,
      name: item.name,
      description: item.description,
      imageUrl: item.imageUrl,
      price: parseFloat(item.price),
      category: item.category,
      quantity: 1,
    })
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
            <p>{item.price}</p>
            <button onClick={() => handleRemoveItem(item.id)}>
              Remove One
            </button>
            <h3>Quantity:{item.quantity}</h3>
            <button
              onClick={() =>
                handleAddItem({
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  imageUrl: item.imageUrl,
                  price: item.price.toString(),
                  category: item.category,
                  quantity: 1,
                })
              }
            >
              Add One
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CartItems
