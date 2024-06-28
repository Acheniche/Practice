import './index.css'

import { useEffect,useState } from 'react'

interface ProductGalleryProps {
  image: string
}

const ProductImageGallery = ({ image }: ProductGalleryProps) => {
  const images = Array(4).fill(image)
  const [selectedImage, setSelectedImage] = useState(images[0])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setSelectedImage(images[activeIndex])
  }, [activeIndex])

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index)
  }

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="container">
      <div className="imageColumn">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className="imageThumbnail"
            onClick={() => handleThumbnailClick(index)}
            alt={`Thumbnail ${index + 1}`}
          />
        ))}
      </div>
      <img src={selectedImage} className="largeImage" alt="Selected" />
      <div className="indicatorContainer">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductImageGallery
