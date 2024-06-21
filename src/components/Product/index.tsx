import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../store/store'
import {
  fetchProductById,
  fetchSimilarProducts,
} from '../../store/reducers/actionCreators'
import './index.css'
import ProductList from '../ProductList'

const Product = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const product = useSelector(
    (state: RootState) => state.getProductByIdReducer.product
  )
  const similarProducts = useSelector(
    (state: RootState) => state.getProductByIdReducer.similarProducts
  )

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (product?.category) {
      dispatch(
        fetchSimilarProducts({
          category: product.category,
          productId: product.id,
        })
      )
    }
  }, [dispatch, product])

  return (
    <div className="product-page">
      {product && (
        <div className="product-details">
          <img src={product.image} alt={product.title} />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      )}
      <h2>Similar Products</h2>
      <div className="similar-products">
        <ProductList products={similarProducts} isLoading={true} error={''} />
      </div>
    </div>
  )
}

export default Product
