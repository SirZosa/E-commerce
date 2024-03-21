import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout/layout.jsx';
import Home from './pages/home/home.jsx'
import ProductPage from './pages/productPage/productPage.jsx';
import ProductsCategory from './pages/producs-category/productCategory.jsx';
import Cart from './pages/cart/cart.jsx';
import Checkout from './pages/checkout/checkout.jsx';
import Orders from './pages/Orders/orders.jsx';



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element ={<Home/>}/>
          <Route path='category/:id' element={<ProductsCategory/>}>
            <Route path='page/:pageNum' element={<ProductsCategory/>}/>
          </Route>
          <Route path='product/:id' element={<ProductPage/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='orders' element={<Orders/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
