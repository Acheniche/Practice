import { ProductState } from '../../store/reducers/GetAllProductsSlice'

const ProductList = ({ products }: ProductState) => {
  return (
    <div className="product-list">
      <h2>Shop The Latest</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
