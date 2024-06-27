import './index.css'

import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import search from '../../assets/Icon color.svg'
import logo from '../../assets/Modsen SHOPPE.svg'
import cart from '../../assets/shopping-cart 1.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { themeSlice } from '../../store/reducers/themeSlice'
import { auth, logout } from '../../utils/firebase'

const Header = () => {
  const [user] = useAuthState(auth)
  const { isOn } = useAppSelector((state) => state.themeReducer)
  const dispatch = useAppDispatch()
  const { changeTheme } = themeSlice.actions
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLDivElement>(null)

  const handleChange = () => {
    dispatch(changeTheme())
  }

  useEffect(() => {
    document.body.style.backgroundColor = isOn ? '#707070' : '#ffffff'
  }, [isOn])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (
      menuRef.current &&
      !menuRef.current.contains(target) &&
      !burgerRef.current?.contains(target)
    ) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>
      </div>
      <div className="header-controls">
        <nav className={`desktop-nav ${menuOpen ? 'hide' : ''}`}>
          <Link to="/shop">Shop</Link>
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
          <Link to="/">
            <img src={search} className="logo" alt="search" />
          </Link>
          <Link to="/cart">
            <img src={cart} className="logo" alt="cart" />
          </Link>
          {!user ? <Link to="/login">Login</Link> : null}
          {!user ? <Link to="/registration">Registration</Link> : null}
          {user ? <a onClick={handleLogout}>Logout</a> : null}
        </nav>
        <div className="icons">
          <Link to="/cart" className="cart-icon">
            <img src={cart} className="logo" alt="cart" />
          </Link>
          <div className="burger" ref={burgerRef} onClick={toggleMenu}>
            <div className={`line ${menuOpen ? 'open' : ''}`}></div>
            <div className={`line ${menuOpen ? 'open' : ''}`}></div>
            <div className={`line ${menuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
          <nav>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link to="/blog" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/help" onClick={() => setMenuOpen(false)}>
              Help
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <Link to="/search" onClick={() => setMenuOpen(false)}>
              Search
            </Link>
            {!user ? (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            ) : null}
            {!user ? (
              <Link to="/registration" onClick={() => setMenuOpen(false)}>
                Registration
              </Link>
            ) : null}
            {user ? (
              <a
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
              >
                Logout
              </a>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
