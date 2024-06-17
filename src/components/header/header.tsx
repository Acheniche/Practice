import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { themeSlice } from '../../store/reducers/ThemeSlice'
import './header.css'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from '../Login/firebase'
import logo from '../../assets/Modsen SHOPPE.svg'
import search from '../../assets/Icon color.svg'
import cart from '../../assets/shopping-cart 1.svg'
import { userSlice } from '../../store/reducers/UserSlice'

function Header() {
  const [user] = useAuthState(auth)
  const { isOn } = useAppSelector((state) => state.themeReducer)
  const dispatch = useAppDispatch()
  const { changeTheme } = themeSlice.actions
  const { setUser } = userSlice.actions

  const handleChange = () => {
    dispatch(changeTheme())
  }

  useEffect(() => {
    document.body.style.backgroundColor = isOn ? '#707070' : '#ffffff'
  }, [isOn])

  const handleLogout = () => {
    logout()
    dispatch(setUser(null))
  }

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>
      </div>
      <div className="header-controls">
        <nav>
          <a>
            <Link to="/shop">Shop</Link>
          </a>
          <div className="separator"></div>
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

          <a className="logo">
            <Link to="/">
              <img src={search} className="logo" alt="logo" />
            </Link>
          </a>
          <a className="logo">
            <Link to="/cart">
              <img src={cart} className="logo" alt="logo" />
            </Link>
          </a>
          {!user ? <Link to="/login">Login</Link> : null}
          {!user ? <Link to="/registration">Registration</Link> : null}
          {user ? <a onClick={handleLogout}>Logout</a> : null}
        </nav>
      </div>
    </header>
  )
}

export default Header
