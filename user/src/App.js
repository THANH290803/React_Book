import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './Web/Index'
import Shop from './Web/Shop/shop'
import ProductDetail from './Web/ProductDetail/ProductDetail'
import Cart from './Web/Cart/Cart'
import Login from './Web/Login/Login'
import CheckOut from './Web/CheckOut/CheckOut'
import BookByCategory from './Web/FetDataByCategory/BookByCategory';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Wrap Routes around Route components */}
          <Route path="/" element={<Index />} /> {/* Use 'element' prop instead of 'component' */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/bookbycategories/:categoryId" element={<BookByCategory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
