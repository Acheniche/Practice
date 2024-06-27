export interface RangeSliderProps {
  min: number
  max: number
  step: number
  initialMinValue: number
  initialMaxValue: number
  onChange: (minValue: number, maxValue: number) => void
}
