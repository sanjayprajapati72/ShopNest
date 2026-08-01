import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ReturnPolicy from './pages/ReturnPolicy';
import Disclaimer from './pages/Disclaimer';
import Register from './pages/Register';
import Login from './pages/Login';
import MagicLink from "./pages/MagicLink";
import MagicLogin from "./pages/MagicLogin";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess'

import AdminDashboard from './admin/AdminDashboard';
import Addproduct from './admin/AddProduct';
import AdminProducts from './admin/AdminProducts';
import EditProduct from './admin/EditProduct';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from './admin/AdminUsers';
import AdminCancelledOrders from './admin/AdminCancelledOrders';
import AdminOrderStatus from "./admin/AdminOrderStatus";



const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />

        <Route path="/magic-link"element={<MagicLink />}/>

        <Route path="/magic-login/:token"element={<MagicLogin />}/>
        

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/return" element={<ReturnPolicy />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<Addproduct />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/cancelled-orders" element={<AdminCancelledOrders />} />
        <Route path="/admin/orders/:status"element={<AdminOrderStatus />}/>



      </Routes>

      <Footer />
    </Router>
  );
};

export default App;