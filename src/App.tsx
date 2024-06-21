import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Registration from './components/Registration'
import Login from './components/Login'
import Cart from './components/Cart'
import Shop from './components/Shop'

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          {/* add other routes */}
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App
