import { ProductState } from '../../store/reducers/GetAllProductsSlice'
import eye from '../../assets/eye-svgrepo-com 1.svg'
import heart from '../../assets/heart-svgrepo-com 1.svg'
import cart from '../../assets/shopping-cart 1 (1).svg'

const ProductList = ({ products }: ProductState) => {
  return (
    <div className="product-list">
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img src={product.image} alt={product.title} />
              <div className="icon-overlay">
                <span className="icon">
                  <img src={cart} />
                </span>
                <span className="icon">
                  <img src={eye} />
                </span>
                <span className="icon">
                  <img src={heart} />
                </span>
              </div>
              <button className="add-to-cart">Add to Cart</button>
            </div>
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
