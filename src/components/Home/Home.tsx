import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import './style.css'
import { getAllProducts } from '../../store/reducers/ActionCreators'
import ProductList from './ProductList'

function Home() {
  const dispatch = useAppDispatch()
  const { products, isLoading, error } = useAppSelector(
    (state) => state.getAllProductsReducer
  )
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const toggleViewAll = () => {
    setShowAll(!showAll)
  }

  return (
    <>
      <div className="view-all-container">
        <h2>Shop The Latest</h2>
        <button onClick={toggleViewAll}>
          {showAll ? 'View Less' : 'View All'}
        </button>
      </div>
      <ProductList
        products={showAll ? products : products.slice(0, 6)}
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
