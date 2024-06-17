import './Cart.css'

const CartItems = ({ cart }: any) => {
  return (
    <div className="cart-list">
      <div className="products-list">
        {cart.map((product: any) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CartItems
