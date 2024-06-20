import { useDispatch, useSelector } from 'react-redux'
import './Shop.css'
import RangeSlider from './components/RangeSlider'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../store/store'
import { fetchProducts } from '../../store/reducers/ProductsSlice'
import ProductList from './ProductList'
import SearchIcon from '../../assets/Icon color (1).svg'

const Shop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector(
    (state: RootState) => state.productsReducer.items
  )

  const [minPrice, setMinPrice] = useState<number>(40)
  const [maxPrice, setMaxPrice] = useState<number>(180)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [categories, setCategories] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState(products)

  const handleSliderChange = (newMinValue: number, newMaxValue: number) => {
    setMinPrice(newMinValue)
    setMaxPrice(newMaxValue)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        'https://fakestoreapi.com/products/categories'
      ).then((data) => data.json())
      setCategories(response)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    dispatch(
      fetchProducts({
        category: '',
        sort: 'asc',
        minPrice: 0,
        maxPrice: 1000,
        searchQuery: '',
      })
    )
  }, [dispatch])

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  const handleFilter = () => {
    dispatch(
      fetchProducts({
        category: selectedCategory,
        sort: sortBy,
        minPrice,
        maxPrice,
        searchQuery,
      })
    )
  }

  return (
    <>
      <h1>Shop</h1>
      <div className="ShopComponent">
        <div className="Filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleFilter}>
              <img src={SearchIcon} alt="Search" />
            </button>
          </div>
          <div>
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Shop By</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              onChange={(e) => setSortBy(e.target.value as 'asc' | 'desc')}
            >
              <option value="asc">Price (Low to High)</option>
              <option value="desc">Price (High to Low)</option>
            </select>
          </div>
          <RangeSlider
            min={0}
            max={1000}
            step={1}
            initialMinValue={minPrice}
            initialMaxValue={maxPrice}
            onChange={handleSliderChange}
          />
          <div>
            <button onClick={handleFilter}>Filter</button>
          </div>
        </div>
        <ProductList products={filteredProducts} />
      </div>
    </>
  )
}

export default Shop
