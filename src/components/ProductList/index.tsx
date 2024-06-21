import { ProductState } from '../../store/reducers/getAllProductsSlice'
import eye from '../../assets/eye-svgrepo-com 1.svg'
import heart from '../../assets/heart-svgrepo-com 1.svg'
import cart from '../../assets/shopping-cart 1 (1).svg'
import { addItemToCart } from '../Cart/CartControls/controlFunctions'
import './index.css'
import { useNavigate } from 'react-router-dom'

const ProductList = ({ products }: ProductState) => {
  const navigate = useNavigate()

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
              <button
                className="add-to-cart"
                onClick={() =>
                  addItemToCart({
                    id: product.id,
                    name: product.title,
                    description: product.description,
                    imageUrl: product.image,
                    price: product.price,
                    category: product.category,
                    quantity: 1,
                  })
                }
              >
                Add to Cart
              </button>
            </div>
            <div
              className="product-details"
              onClick={() => navigate(`/product/${product.id}`)}
            >
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
