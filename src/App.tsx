import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/header'
import Home from './components/Home/Home'
import Registration from './components/Registration/Registration'
import Login from './components/Login/Login'
import Cart from './components/Cart/Cart'
import Shop from './components/Shop/Shop'

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
