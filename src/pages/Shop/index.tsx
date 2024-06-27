import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { fetchProducts } from '../../store/reducers/actionCreators'
import RangeSlider from '../../components/RangeSlider'
import './index.css'
import SearchIcon from '../../assets/Icon color (1).svg'
import ProductList from '../../components/ProductList'
import FilterIcon from '../../assets/filter (1) 2.svg'

const Shop = () => {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector(
    (state: RootState) => state.productsReducer.products
  )

  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(1000)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [categories, setCategories] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const handleSliderChange = (newMinValue: number, newMaxValue: number) => {
    setMinPrice(newMinValue)
    setMaxPrice(newMaxValue)
  }

  const filterProducts = (minPrice: number, maxPrice: number) => {
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

  const handleFilter = () => {
    filterProducts(minPrice, maxPrice)
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

  useEffect(() => {
    if (filtersOpen) {
      document.body.classList.add('filters-open')
    } else {
      document.body.classList.remove('filters-open')
    }
  }, [filtersOpen])

  return (
    <>
      <h1>Shop The Latest</h1>
      <div className="ShopComponent">
        <button className="filters-button" onClick={() => setFiltersOpen(true)}>
          <img src={FilterIcon} alt="Filter" />
          Filters
        </button>
        <div className={`Filters ${filtersOpen ? 'open' : ''}`}>
          <button
            className="close-filters"
            onClick={() => setFiltersOpen(false)}
          >
            &times;
          </button>
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
          <div className="price-filter-container">
            <RangeSlider
              min={0}
              max={1000}
              step={1}
              initialMinValue={minPrice}
              initialMaxValue={maxPrice}
              onChange={handleSliderChange}
              onFilter={filterProducts}
            />
          </div>
        </div>
        <ProductList
          products={filteredProducts}
          isLoading={false}
          error={''}
          product={null}
          similarProducts={[]}
        />
      </div>
    </>
  )
}

export default Shop
