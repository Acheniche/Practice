import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { themeSlice } from '../../store/reducers/ThemeSlice'
import './styles.css'

function Header() {
  const { isOn } = useAppSelector((state) => state.themeReducer)
  const dispatch = useAppDispatch()
  const { changeTheme } = themeSlice.actions

  const handleChange = () => {
    dispatch(changeTheme())
  }

  useEffect(() => {
    document.body.style.backgroundColor = isOn ? '#000000' : '#ffffff'
  }, [isOn])

  return (
    <header>
      <h1 className="Logo">Modsen SHOPPE</h1>
      <div className="toggle-container">
        <input
          type="checkbox"
          id="toggle-button"
          className="toggle-button"
          checked={isOn}
          onChange={handleChange}
        />
        <label htmlFor="toggle-button" className="toggle-label"></label>
      </div>
    </header>
  )
}

export default Header
