import React from 'react';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import Footer from '../Component/Footer';
import { Link } from 'react-router-dom';

function Index() {
    return (
        <>
            <Header />
            <section id="slider">
                {/*slider*/}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div
                                id="slider-carousel"
                                className="carousel slide"
                                data-ride="carousel"
                            >
                                <ol className="carousel-indicators">
                                    <li
                                        data-target="#slider-carousel"
                                        data-slide-to={0}
                                        className="active"
                                    />
                                    <li data-target="#slider-carousel" data-slide-to={1} />
                                    <li data-target="#slider-carousel" data-slide-to={2} />
                                </ol>
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <div className="col-sm-6">
                                            <h1>
                                                <span>E</span>-SHOPPER
                                            </h1>
                                            <h2>Free E-Commerce Template</h2>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                                aliqua.{" "}
                                            </p>
                                            <button type="button" className="btn btn-default get">
                                                Get it now
                                            </button>
                                        </div>
                                        <div className="col-sm-6">
                                            <img
                                                src="images/home/girl1.jpg"
                                                className="girl img-responsive"
                                                alt=""
                                            />
                                            <img
                                                src="images/home/pricing.png"
                                                className="pricing"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-sm-6">
                                            <h1>
                                                <span>E</span>-SHOPPER
                                            </h1>
                                            <h2>100% Responsive Design</h2>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                                aliqua.{" "}
                                            </p>
                                            <button type="button" className="btn btn-default get">
                                                Get it now
                                            </button>
                                        </div>
                                        <div className="col-sm-6">
                                            <img
                                                src="images/home/girl2.jpg"
                                                className="girl img-responsive"
                                                alt=""
                                            />
                                            <img
                                                src="images/home/pricing.png"
                                                className="pricing"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-sm-6">
                                            <h1>
                                                <span>E</span>-SHOPPER
                                            </h1>
                                            <h2>Free Ecommerce Template</h2>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                                aliqua.{" "}
                                            </p>
                                            <button type="button" className="btn btn-default get">
                                                Get it now
                                            </button>
                                        </div>
                                        <div className="col-sm-6">
                                            <img
                                                src="images/home/girl3.jpg"
                                                className="girl img-responsive"
                                                alt=""
                                            />
                                            <img
                                                src="images/home/pricing.png"
                                                className="pricing"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href="#slider-carousel"
                                    className="left control-carousel hidden-xs"
                                    data-slide="prev"
                                >
                                    <i className="fa fa-angle-left" />
                                </a>
                                <a
                                    href="#slider-carousel"
                                    className="right control-carousel hidden-xs"
                                    data-slide="next"
                                >
                                    <i className="fa fa-angle-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*/slider*/}
            <section>
                <div className="container">
                    <div className="row">
                        <Sidebar />
                        <div className="col-sm-9 padding-right">
                            <div className="features_items">
                                {/*features_items*/}
                                <h2 className="title text-center">Mặt hàng nổi bật</h2>
                                <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <Link to={'/product-detail'}>
                                                    <img src={'images/home/product1.jpg'} alt="" />
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                </Link>
                                                <a href="#" className="btn btn-default add-to-cart">
                                                    <i className="fa fa-shopping-cart" />
                                                    Thêm vào giỏ hàng
                                                </a>
                                            </div>
                                            {/* <div className="product-overlay">
                                                <div className="overlay-content">
                                                    <Link to={'/product-detail'}>
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                    </Link>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="choose">
                                            <ul className="nav nav-pills nav-justified">
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square" />
                                                        Add to wishlist
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square" />
                                                        Add to compare
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/product2.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <a href="#" className="btn btn-default add-to-cart">
                                                    <i className="fa fa-shopping-cart" />
                                                    Add to cart
                                                </a>
                                            </div>
                                            <div className="product-overlay">
                                                <div className="overlay-content">
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="choose">
                                            <ul className="nav nav-pills nav-justified">
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square" />
                                                        Add to wishlist
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square" />
                                                        Add to compare
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/product3.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <a href="#" className="btn btn-default add-to-cart">
                                                    <i className="fa fa-shopping-cart" />
                                                    Add to cart
                                                </a>
                                            </div>
                                            <div className="product-overlay">
                                                <div className="overlay-content">
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="choose">
                                            <ul className="nav nav-pills nav-justified">
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square" />
                                                        Add to wishlist
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square" />
                                                        Add to compare
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/product4.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <a href="#" className="btn btn-default add-to-cart">
                                                    <i className="fa fa-shopping-cart" />
                                                    Add to cart
                                                </a>
                                            </div>
                                            <div className="product-overlay">
                                                <div className="overlay-content">
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                            <img src="images/home/new.png" className="new" alt="" />
                                        </div>
                                        <div className="choose">
                                            <ul className="nav nav-pills nav-justified">
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square" />
                                                        Add to wishlist
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square" />
                                                        Add to compare
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/product5.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <a href="#" className="btn btn-default add-to-cart">
                                                    <i className="fa fa-shopping-cart" />
                                                    Add to cart
                                                </a>
                                            </div>
                                            <div className="product-overlay">
                                                <div className="overlay-content">
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                            <img src="images/home/sale.png" className="new" alt="" />
                                        </div>
                                        <div className="choose">
                                            <ul className="nav nav-pills nav-justified">
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square" />
                                                        Add to wishlist
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square" />
                                                        Add to compare
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <img src="images/home/product6.jpg" alt="" />
                                                <h2>$56</h2>
                                                <p>Easy Polo Black Edition</p>
                                                <a href="#" className="btn btn-default add-to-cart">
                                                    <i className="fa fa-shopping-cart" />
                                                    Add to cart
                                                </a>
                                            </div>
                                            <div className="product-overlay">
                                                <div className="overlay-content">
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
                                                    <a href="#" className="btn btn-default add-to-cart">
                                                        <i className="fa fa-shopping-cart" />
                                                        Add to cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="choose">
                                            <ul className="nav nav-pills nav-justified">
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square" />
                                                        Add to wishlist
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square" />
                                                        Add to compare
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*features_items*/}
                            <div className="category-tab">
                                {/*category-tab*/}
                                <div className="col-sm-12">
                                    <ul className="nav nav-tabs">
                                        <li className="active">
                                            <a href="#tshirt" data-toggle="tab">
                                                T-Shirt
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#blazers" data-toggle="tab">
                                                Blazers
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#sunglass" data-toggle="tab">
                                                Sunglass
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#kids" data-toggle="tab">
                                                Kids
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#poloshirt" data-toggle="tab">
                                                Polo shirt
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade active in" id="tshirt">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="blazers">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="sunglass">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="kids">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="poloshirt">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery2.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery4.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery3.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a href="#" className="btn btn-default add-to-cart">
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*/category-tab*/}
                            <div className="recommended_items">
                                {/*recommended_items*/}
                                <h2 className="title text-center">Mặt hàng liên quan</h2>
                                <div
                                    id="recommended-item-carousel"
                                    className="carousel slide"
                                    data-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend1.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <a href="#" className="btn btn-default add-to-cart">
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend2.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <a href="#" className="btn btn-default add-to-cart">
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend3.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <a href="#" className="btn btn-default add-to-cart">
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend1.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <a href="#" className="btn btn-default add-to-cart">
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend2.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <a href="#" className="btn btn-default add-to-cart">
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="images/home/recommend3.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <a href="#" className="btn btn-default add-to-cart">
                                                                <i className="fa fa-shopping-cart" />
                                                                Add to cart
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        className="left recommended-item-control"
                                        href="#recommended-item-carousel"
                                        data-slide="prev"
                                    >
                                        <i className="fa fa-angle-left" />
                                    </a>
                                    <a
                                        className="right recommended-item-control"
                                        href="#recommended-item-carousel"
                                        data-slide="next"
                                    >
                                        <i className="fa fa-angle-right" />
                                    </a>
                                </div>
                            </div>
                            {/*/recommended_items*/}
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer />
        </>
    )
}

export default Index;