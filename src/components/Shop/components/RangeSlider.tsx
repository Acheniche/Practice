import React, { useCallback, useState } from 'react'
import { RangeSliderProps } from '../../../models/IFilter'
import './RangeSlider.css'

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  initialMinValue,
  initialMaxValue,
  onChange,
}) => {
  const [minValue, setMinValue] = useState<number>(initialMinValue)
  const [maxValue, setMaxValue] = useState<number>(initialMaxValue)
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null)

  const handleMouseDown = useCallback(
    (type: 'min' | 'max') => () => {
      setDragging(type)
    },
    []
  )

  const handleMouseUp = useCallback(() => {
    if (dragging) {
      onChange(minValue, maxValue)
      setDragging(null)
    }
  }, [dragging, minValue, maxValue, onChange])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return

      const rangeElement = document.getElementById('range-track')
      if (!rangeElement) return

      const rect = rangeElement.getBoundingClientRect()
      const offsetX = e.clientX - rect.left
      const percentage = offsetX / rect.width
      const newValue = min + percentage * (max - min)
      const roundedValue = Math.round(newValue / step) * step

      if (
        dragging === 'min' &&
        roundedValue <= maxValue &&
        roundedValue >= min
      ) {
        setMinValue(roundedValue)
      } else if (
        dragging === 'max' &&
        roundedValue >= minValue &&
        roundedValue <= max
      ) {
        setMaxValue(roundedValue)
      }
    },
    [dragging, min, max, step, minValue, maxValue]
  )

  React.useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging, handleMouseMove, handleMouseUp])

  return (
    <div className="range-slider">
      <div className="range-track" id="range-track">
        <div
          className="range-thumb"
          style={{ left: `${((minValue - min) / (max - min)) * 100}%` }}
          onMouseDown={handleMouseDown('min')}
        />
        <div
          className="range-thumb"
          style={{ left: `${((maxValue - min) / (max - min)) * 100}%` }}
          onMouseDown={handleMouseDown('max')}
        />
        <div
          className="range-highlight"
          style={{
            left: `${((minValue - min) / (max - min)) * 100}%`,
            width: `${((maxValue - minValue) / (max - min)) * 100}%`,
          }}
        />
      </div>
      <p>
        Price: ${minValue}-{maxValue}
      </p>
    </div>
  )
}

export default RangeSlider
