import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import Product from './pages/Product'
import NotFound from './pages/NotFound'
import Contact from './pages/Contact'

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
          <Route path="/product/:id" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App
