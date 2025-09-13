import { Routes,Route } from 'react-router-dom'
import { useDirection } from './hooks/useDirection'
import Home from './components/Home'
import Layout from './components/Layout'
import Forgotpass from './components/auth/Forgotpass'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Resetpass from './components/auth/Resetpass'
import Verifyemail from './components/auth/Verifyemail'
import Category from './components/categories/Category'
import Cart from './components/orders/Cart'
import Checkout from './components/orders/Checkout'
import Confirmorder from './components/orders/Confirmorder'
import Refund from './components/orders/Refund'
import Thanks from './components/orders/Thanks'
import Product from './components/products/Product'
import Products from './components/products/Products'
import Myorders from './components/profile/Myorders'
import Personalinfo from './components/profile/Personalinfo'
import Update from './components/profile/Update'
import Wishlist from './components/profile/Wishlist'
import Missing from './components/Missing'
import { ToastContainer } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import 'react-toastify/dist/ReactToastify.css';
import Search from './components/products/Search'
import Subcategory from './components/categories/Subcategory'
function App() {
  const {i18n}=useTranslation();
  useDirection();
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='forgot-pass' element={<Forgotpass/>}/>
        <Route path='reset-pass' element={<Resetpass/>}/>
        <Route path='verify-email' element={<Verifyemail/>}/>
        <Route path='category/:name' element={<Category/>}/>
        <Route path='sub-category/:name' element={<Subcategory/>}/>
        <Route path='product/:name' element={<Product/>}/>
        <Route path='products' element={<Products/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='confirm-order' element={<Confirmorder/>}/>
        <Route path='refund' element={<Refund/>}/>
        <Route path='thanks' element={<Thanks/>}/>
        <Route path='profile' element={<Personalinfo/>}/>
        <Route path='update-profile' element={<Update/>}/>
        <Route path='myorders' element={<Myorders/>}/>
        <Route path='wishlist' element={<Wishlist/>}/>
        <Route path='search/:name' element={<Search/>}/>
      </Route>
       <Route path="*" element={<Missing />} />
    </Routes>
    <ToastContainer position={`${i18n.language==="ar"?"top-right":"top-left"}`} autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={i18n.language==="ar"?true:false} pauseOnFocusLoss draggable pauseOnHover theme='light'  />
    </>
  )
}

export default App
