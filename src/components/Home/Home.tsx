import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import './style.css'
import { getAllProducts } from '../../store/reducers/ActionCreators'

function Home() {
  const dispatch = useAppDispatch()
  const { products } = useAppSelector((state) => state.getAllProductsReducer)

  useEffect(() => {
    dispatch(getAllProducts())
  })

  return (
    <>
      <div>{JSON.stringify(products, null, 2)}</div>
    </>
  )
}

export default Home
