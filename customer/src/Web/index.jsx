import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from "../Component/Header"
import Footer from "../Component/Footer";
import HeaderPage from "../Component/HeaderPage";


function Index() {
    const [newProducts, setNewProducts] = useState([]);
    const [hotProducts, setHotProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/book');
            const products = response.data;

            // Giới hạn số lượng sản phẩm mới hiển thị thành 8
            const newProductsList = products.slice(0, 8);
            setNewProducts(newProductsList);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const fetchHotProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/book/hotBook');
            setHotProducts(response.data);
        } catch (error) {
            console.error('Error fetching hot products: ', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchHotProducts();
    }, []);

    // Add to cart
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [userId, setuserId] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
            setuserId(userData.id); // Set member ID from user data
        }
    }, []);

    const addToCart = async (product) => {
        if (!userId) {
            alert('User not logged in');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cart', {
                user_id: userId,
                items: [
                    {
                        book_id: product.id,
                        quantity: 1
                    }
                ]
            });
            console.log(response.data);
            setCartItems([...cartItems, product]);
            alert('Added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add to cart. Please try again.');
        }
    };


    return (
        <>
            <Header />
            {/* Featured Start */}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5 pb-3">
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div
                            className="d-flex align-items-center border mb-4"
                            style={{ padding: 30 }}
                        >
                            <h1 className="fa fa-check text-primary m-0 mr-3" />
                            <h5 className="font-weight-semi-bold m-0">Sản phẩm chất lượng</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div
                            className="d-flex align-items-center border mb-4"
                            style={{ padding: 30 }}
                        >
                            <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" />
                            <h5 className="font-weight-semi-bold m-0">Miễn phí vận chuyển</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div
                            className="d-flex align-items-center border mb-4"
                            style={{ padding: 30 }}
                        >
                            <h1 className="fas fa-exchange-alt text-primary m-0 mr-3" />
                            <h5 className="font-weight-semi-bold m-0">Hoàn trả trong 14 ngày</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div
                            className="d-flex align-items-center border mb-4"
                            style={{ padding: 30 }}
                        >
                            <h1 className="fa fa-phone-volume text-primary m-0 mr-3" />
                            <h5 className="font-weight-semi-bold m-0">Hỗ trợ 24/7</h5>
                        </div>
                    </div>
                </div>
            </div>
            {/* Featured End */}
            {/* Categories Start */}
            {/* <div className="container-fluid pt-5">
                <div className="row px-xl-5 pb-3">
                    <div className="col-lg-4 col-md-6 pb-1">
                        <div
                            className="cat-item d-flex flex-column border mb-4"
                            style={{ padding: 30 }}
                        >
                            <p className="text-right">15 Products</p>
                            <a href="" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-1.jpg" alt="" />
                            </a>
                            <h5 className="font-weight-semi-bold m-0">Men's dresses</h5>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 pb-1">
                        <div
                            className="cat-item d-flex flex-column border mb-4"
                            style={{ padding: 30 }}
                        >
                            <p className="text-right">15 Products</p>
                            <a href="" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-2.jpg" alt="" />
                            </a>
                            <h5 className="font-weight-semi-bold m-0">Women's dresses</h5>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 pb-1">
                        <div
                            className="cat-item d-flex flex-column border mb-4"
                            style={{ padding: 30 }}
                        >
                            <p className="text-right">15 Products</p>
                            <a href="" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-3.jpg" alt="" />
                            </a>
                            <h5 className="font-weight-semi-bold m-0">Baby's dresses</h5>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 pb-1">
                        <div
                            className="cat-item d-flex flex-column border mb-4"
                            style={{ padding: 30 }}
                        >
                            <p className="text-right">15 Products</p>
                            <a href="" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-4.jpg" alt="" />
                            </a>
                            <h5 className="font-weight-semi-bold m-0">Accerssories</h5>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 pb-1">
                        <div
                            className="cat-item d-flex flex-column border mb-4"
                            style={{ padding: 30 }}
                        >
                            <p className="text-right">15 Products</p>
                            <a href="" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-5.jpg" alt="" />
                            </a>
                            <h5 className="font-weight-semi-bold m-0">Bags</h5>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 pb-1">
                        <div
                            className="cat-item d-flex flex-column border mb-4"
                            style={{ padding: 30 }}
                        >
                            <p className="text-right">15 Products</p>
                            <a href="" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-6.jpg" alt="" />
                            </a>
                            <h5 className="font-weight-semi-bold m-0">Shoes</h5>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* Categories End */}
            {/* Products Start */}
            <div className="container-fluid pt-5">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5" style={{ textTransform: 'uppercase' }}>
                        <span className="px-2">Sản phẩm mới</span>
                    </h2>
                </div>
                <div className="row px-xl-5 pb-3">
                    {newProducts.map(product => {
                        if (product.amount > 0) {
                            return (
                                <>
                                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={product.id}>
                                        <div className="card product-item border-0 mb-4">
                                            <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0" style={{ textAlign: 'center' }}>
                                                <img className="img-fluid" src={product.img} alt="" style={{ width: '250px', height: '376px' }} />
                                            </div>
                                            <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                                <h6 className="text-truncate mb-3">{product.name}</h6>
                                                <div className="d-flex justify-content-center">
                                                    <h6>{product.price.toLocaleString('vi-VN')} VND</h6>
                                                    {/* <h6 className="text-muted ml-2">
                                        <del>$123.00</del>
                                    </h6> */}
                                                </div>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between bg-light border">
                                                <Link to={'/detail/' + product.id} className="btn btn-sm text-dark p-0">
                                                    <i className="fas fa-eye text-primary mr-1" />
                                                    Xem chi tiết
                                                </Link>
                                                {product.amount > 0 ? (
                                                    <a type='button' onClick={() => addToCart(product)} className="btn btn-sm text-dark p-0">
                                                        <i className="fas fa-shopping-cart text-primary mr-1" />
                                                        Thêm vào giỏ hàng
                                                    </a>
                                                ) : (
                                                    <button type="button" className="btn btn-sm text-dark p-0" disabled>
                                                        <i className="fas fa-shopping-cart text-muted mr-1" />
                                                        Hết hàng
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })}
                </div>
            </div>
            {/* Products End */}
            {/* Offer Start */}
            <div className="container-fluid offer pt-5">
                <div className="row px-xl-5">
                    <div className="col-md-6 pb-4">
                        <div className="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
                            <img src="img/Banner2.png" alt="" />
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <h5 className="text-uppercase text-primary mb-3">
                                    20% off the all order
                                </h5>
                                <h1 className="mb-4 font-weight-semi-bold">Spring Collection</h1>
                                <a href="" className="btn btn-outline-primary py-md-2 px-md-3">
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 pb-4">
                        <div className="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
                            <img src={'/img/Banner1.jpg'} alt="" />
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <h5 className="text-uppercase text-primary mb-3">
                                    20% off the all order
                                </h5>
                                <h1 className="mb-4 font-weight-semi-bold">Winter Collection</h1>
                                <a href="" className="btn btn-outline-primary py-md-2 px-md-3">
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Offer End */}
            {/* Products Start */}
            <div className="container-fluid pt-5">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5" style={{ textTransform: 'uppercase' }}>
                        <span className="px-2">Sản phẩm hot</span>
                    </h2>
                </div>
                <div className="row px-xl-5 pb-3">
                    {hotProducts.map(product => {
                        if (product.amount > 0) {
                            return (
                                <>
                                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={product.id}>
                                        <div className="card product-item border-0 mb-4">
                                            <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0" style={{ textAlign: 'center' }}>
                                                <img className="img-fluid" src={product.img} alt="" style={{ width: '250px', height: '376px' }} />
                                            </div>
                                            <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                                <h6 className="text-truncate mb-3">{product.name}</h6>
                                                <div className="d-flex justify-content-center">
                                                    <h6>{product.price.toLocaleString('vi-VN')} VND</h6>
                                                    {/* <h6 className="text-muted ml-2">
                                        <del>$123.00</del>
                                    </h6> */}
                                                </div>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between bg-light border">
                                                <Link to={'/detail/' + product.id} className="btn btn-sm text-dark p-0">
                                                    <i className="fas fa-eye text-primary mr-1" />
                                                    Xem chi tiết
                                                </Link>
                                                {product.amount > 0 ? (
                                                    <a type='button' onClick={() => addToCart(product)} className="btn btn-sm text-dark p-0">
                                                        <i className="fas fa-shopping-cart text-primary mr-1" />
                                                        Thêm vào giỏ hàng
                                                    </a>
                                                ) : (
                                                    <button type="button" className="btn btn-sm text-dark p-0" disabled>
                                                        <i className="fas fa-shopping-cart text-muted mr-1" />
                                                        Hết hàng
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })}
                </div>
            </div>
            {/* Products End */}
            {/* Vendor Start */}
            <div className="container-fluid py-5">
                <div className="row px-xl-5">
                    <div className="col">
                        <div className="owl-carousel vendor-carousel">
                            <div className="vendor-item border p-4">
                                <img src="img/vendor-1.jpg" alt="" />
                            </div>
                            <div className="vendor-item border p-4">
                                <img src="img/vendor-2.jpg" alt="" />
                            </div>
                            <div className="vendor-item border p-4">
                                <img src="img/vendor-3.jpg" alt="" />
                            </div>
                            <div className="vendor-item border p-4">
                                <img src="img/vendor-4.jpg" alt="" />
                            </div>
                            <div className="vendor-item border p-4">
                                <img src="img/vendor-5.jpg" alt="" />
                            </div>
                            <div className="vendor-item border p-4">
                                <img src="img/vendor-6.jpg" alt="" />
                            </div>
                            <div className="vendor-item border p-4">
                                <img src="img/vendor-7.jpg" alt="" />
                            </div>
                            <div className="vendor-item border p-4">
                                <img src="img/vendor-8.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Vendor End */}
            <Footer />
        </>
    );
}

export default Index;