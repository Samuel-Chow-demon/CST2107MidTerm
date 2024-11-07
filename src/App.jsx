import { useState } from 'react'
import {useRoutes} from 'react-router-dom'
import './App.css'
import cartContext from '../context/cartContext'
import productContext from '../context/productContext'
import { navItemAndPath, NAV_HOME, NAV_PRODUCT_DETAILS, NAV_CART, NAV_CHECKOUT } from '../constant';
import NavBar from '../components/NavBar'
import NotFoundPage from '../pages/NotFoundPage'
import Home from '../pages/Home'
import ProductDetailsPage from '../pages/ProductDetail'
import CartPage from '../pages/Cart'
import CheckoutPage from '../pages/Checkout'

function App() {

  // Object of Cart Items
  const [cartItems, setCartItem] = useState({})
  // List of Product Items
  const [productItems, setProductItem] = useState([])

  const routes = useRoutes([

    {
      path : navItemAndPath[NAV_HOME],
      element: <Home />
    },
    {
      path : `${navItemAndPath[NAV_PRODUCT_DETAILS]}/:id`,
      element: <ProductDetailsPage />
    },
    {
      path : navItemAndPath[NAV_CART],
      element: <CartPage />
    },
    {
      path : navItemAndPath[NAV_CHECKOUT],
      element: <CheckoutPage />
    },
    {
      path : '*',
      element: <NotFoundPage />
    }
  ])

  return (
    <productContext.Provider value={{
        productItems,
        setProductItem
      }}>
      <cartContext.Provider value={{
        cartItems,
        setCartItem
      }}>
        <NavBar />
        {routes}
      </cartContext.Provider>
    </productContext.Provider>
  )
}

export default App
