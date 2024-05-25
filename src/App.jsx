import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home.jsx";
import Header from "./Components/Header.jsx";
import "./App.css";
import { Navigate } from "react-router-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { UserData } from "./Context/UserContext.jsx";
import Loader from "./Components/Loader.jsx";
import Verify from "./pages/verify.jsx";
import Account from "./pages/Account.jsx";
import ProductDetails from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Payment from "./pages/Payment.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import Dashboard from "./pages/Dashboard.jsx";





function App() {
  const { loading, isAuth,user } = UserData();
 
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/account" element={ isAuth?<Account />:<Login />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
            <Route path="/cart" element={!isAuth ? <Navigate to="/login" /> : <Cart />} />
            <Route path="/checkout" element={!isAuth ? <Navigate to="/login" /> : <Checkout />} />
            <Route path="/payment/:id" element={!isAuth ? <Navigate to="/login" /> : <Payment />} />
            <Route path="/ordersuccess" element={!isAuth ? <Navigate to="/login" /> : <OrderSuccess />} />
            <Route path="/orders" element={!isAuth ? <Navigate to="/login" /> : <MyOrder/>} />
            <Route path="/order/:id" element={!isAuth ? <Navigate to="/login" /> : <OrderPage/>} />
            <Route path="/admin/dashboard" element={!isAuth ? <Navigate to="/login" /> : <Dashboard  user={user}/>} />
            <Route
              path="/Register"
              element={isAuth ? <Navigate to="/" /> : <Register />} />
            <Route
              path="/verify"
              element={isAuth ? <Navigate to="/" /> : <Verify />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
