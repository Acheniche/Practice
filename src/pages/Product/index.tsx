import './index.css'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import logo1 from '../../assets/Icon color (2).svg'
import logo2 from '../../assets/Icon color (3).svg'
import logo3 from '../../assets/Icon color (4).svg'
import logo5 from '../../assets/Icon color (6).svg'
import ProductGallery from '../../components/ProductGallery'
import ProductList from '../../components/ProductList'
import {
  fetchProductById,
  fetchSimilarProducts,
} from '../../store/reducers/actionCreators'
import { AppDispatch, RootState } from '../../store/store'
import { addItemToCart } from '../Cart/CartControls/controlFunctions'

const Product = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const product = useSelector(
    (state: RootState) => state.productsReducer.product
  )
  const similarProducts = useSelector(
    (state: RootState) => state.productsReducer.similarProducts
  )
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

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

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  return (
    <div className="product-page">
      {product && (
        <div className="product-page-details">
          <ProductGallery image={product.image} />
          <div className="product-info">
            <h1>{product.title}</h1>
            <h2 className="price">${product.price}</h2>
            <button
              className="product-add-to-cart"
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
            <div
              className={`description ${showFullDescription ? 'show' : 'hide'}`}
            >
              <p>{product.description}</p>
            </div>
            <div
              className={`additional-info ${showFullDescription ? 'show' : 'hide'}`}
            >
              <div className="social-icons">
                <a>
                  <Link to="/">
                    <img src={logo1} alt="LinkedIn" />
                  </Link>
                </a>
                <a>
                  <Link to="/">
                    <img src={logo5} alt="Facebook" />
                  </Link>
                </a>
                <a>
                  <Link to="/">
                    <img src={logo3} alt="Instagram" />
                  </Link>
                </a>
                <a>
                  <Link to="/">
                    <img src={logo2} alt="Twitter" />
                  </Link>
                </a>
              </div>
              <h4>
                Categories: <span className="category">{product.category}</span>
              </h4>
            </div>
            <button className="view-more" onClick={toggleDescription}>
              {showFullDescription ? 'View less <' : 'View more >'}
            </button>
          </div>
        </div>
      )}
      {product && (
        <div
          className={`descriptionContainer ${isOpen ? 'open' : ''}`}
          onClick={toggleOpen}
        >
          <div className="title">
            Description
            <span className={`toggleArrow ${isOpen ? 'up' : 'down'}`}>ᐯ</span>
          </div>
          <p className={`text ${isOpen ? 'open' : ''}`}>
            {product.description}
          </p>
        </div>
      )}

      <h2>Similar Items</h2>
      <div className="similar-products">
        <ProductList
          products={similarProducts}
          isLoading={false}
          error={''}
          product={null}
          similarProducts={[]}
        />
      </div>
    </div>
  )
}

export default Product
