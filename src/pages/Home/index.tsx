import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import './index.css'
import { getAllProducts } from '../../store/reducers/actionCreators'
import ProductList from '../../components/ProductList/index'
import { Link } from 'react-router-dom'
import Slider from '../../components/Slider'

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
      <Slider
        products={products.slice(0, 5)}
        isLoading={false}
        error={''}
        product={null}
        similarProducts={[]}
      />
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
        product={null}
        similarProducts={[]}
      />
      <div>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
      </div>
    </>
  )
}

export default Home
