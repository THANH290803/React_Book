import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./Web/index";
import Shop from "./Web/Shop";
import Detail from "./Web/Detail";
import Cart from "./Web/Cart";
import Checkout from "./Web/CheckOut";
import ProductByCategory from "./Web/ProductByCategory";
import Login from "./Web/Login";
import Register from "./Web/Register";
import SucessOrder from "./Web/SucessOrder/SucessOrder";
import Account from "./Web/Account/Account";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/ProductByCategory/:id" element={<ProductByCategory />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sucess_order" element={<SucessOrder />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
