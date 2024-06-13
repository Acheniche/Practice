import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import './style.css'
import { getAllProducts } from '../../store/reducers/ActionCreators'
import ProductList from './ProductList'

function Home() {
  const dispatch = useAppDispatch()
  const { products, isLoading, error } = useAppSelector(
    (state) => state.getAllProductsReducer
  )

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  return (
    <>
      <ProductList products={products} isLoading={false} error={''} />
      <div>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {JSON.stringify(products, null, 2)}
      </div>
    </>
  )
}

export default Home
