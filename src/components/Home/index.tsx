import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import './index.css'
import { getAllProducts } from '../../store/reducers/actionCreators'
import ProductList from '../ProductList/index'
import { Link } from 'react-router-dom'

function Home() {
  const dispatch = useAppDispatch()
  const { products, isLoading, error } = useAppSelector(
    (state) => state.productsReducer
  )

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  return (
    <>
      <div className="view-all-container">
        <h2>Shop The Latest</h2>
        <Link to="/shop">
          <p>View All</p>
        </Link>
      </div>
      <ProductList
        products={products.slice(0, 6)}
        isLoading={false}
        error={''}
      />
      <div>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
      </div>
    </>
  )
}

export default Home
