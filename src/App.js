
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import About from './pages/About';
import PageNF from './pages/PageNotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/ForgotPassword';
import AdminRoute from './components/Routes/AdminAuth';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateProduct from './pages/Admin/CreateProduct.js';
import CreateCategory from './pages/Admin/CreateCategory.js';
import Users from './pages/Admin/Users.js';
import Orders from './pages/user/Orders.js';
import Profile from './pages/user/Profile.js';
import Products from './pages/Admin/Products.js';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/Cart';

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path='user' element={<Dashboard/>}/>
          <Route path='user/profile' element={<Profile/>}/>
          <Route path='user/orders' element={<Orders/>}/>
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard/>}/>
          <Route path='admin/profile' element={<AdminDashboard/>}/>
          <Route path='admin/products' element={<Products/>}/>
          <Route path='admin/create-product' element={<CreateProduct/>}/>
          <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
          <Route path='admin/create-category' element={<CreateCategory/>}/>
          <Route path='admin/users' element={<Users/>}/>
        </Route>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/product/:slug' element={<ProductDetails/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/*' element={<PageNF/>}/>
      </Routes>
    </>
  );
}

export default App;
