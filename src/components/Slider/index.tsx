import './index.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProductsState } from '../../types/productsState'

const Slider = ({ products }: ProductsState) => {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length)
    }, 5000)

    return () => clearInterval(slideInterval)
  }, [products.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="slider-container">
      <div className="slider">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <img src={product.image} alt={product.title} />
            <div className="slide-info-container">
              <div className="slide-info">
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <button onClick={() => navigate(`/product/${product.id}`)}>
                  View Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="dots">
        {products.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Slider
