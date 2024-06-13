import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { themeSlice } from '../../store/reducers/ThemeSlice'
import './styles.css'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from '../Login/firebase'

function Header() {
  const [user] = useAuthState(auth)
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
      <Link to="/">Main</Link>
      {!user ? <Link to="/login">Login</Link> : null}
      {!user ? <Link to="/registration">Registration</Link> : null}
      {user ? <button onClick={logout}>Выйти</button> : null}
    </header>
  )
}

export default Header
