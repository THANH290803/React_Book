import React from 'react';
import { Link, NavLink } from 'react-router-dom';


function Header() {
    return (
        <>
            <header id="header">
                {/*header*/}
                <div className="header_top">
                    {/*header_top*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="contactinfo">
                                    <ul className="nav nav-pills">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-phone" /> +2 95 01 88 821
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-envelope" /> info@domain.com
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="social-icons pull-right">
                                    <ul className="nav navbar-nav">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-facebook" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-linkedin" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-dribbble" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-google-plus" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*/header_top*/}
                <div className="header-middle">
                    {/*header-middle*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="logo pull-left">
                                    <a href="index.html">
                                        <img src="images/home/logo.png" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="shop-menu pull-right">
                                    <ul className="nav navbar-nav">
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-user" /> Tài khoản
                                            </a>
                                        </li>
                                        {/* <li>
                                            <a href="#">
                                                <i className="fa fa-star" /> Wishlist
                                            </a>
                                        </li> */}
                                        {/* <li>
                                            <a href="checkout.html">
                                                <i className="fa fa-crosshairs" /> Checkout
                                            </a>
                                        </li> */}
                                        <li>
                                            <Link to={'/cart'}>
                                                <i className="fa fa-shopping-cart" /> Giỏ hàng
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={'/login'}>
                                                <i className="fa fa-lock" /> Đăng nhập
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*/header-middle*/}
                <div className="header-bottom">
                    {/*header-bottom*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="navbar-header">
                                    <button
                                        type="button"
                                        className="navbar-toggle"
                                        data-toggle="collapse"
                                        data-target=".navbar-collapse"
                                    >
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                    </button>
                                </div>
                                <div className="mainmenu pull-left">
                                    <ul className="nav navbar-nav collapse navbar-collapse">
                                        <li>
                                            <NavLink exact to={'/'} activeClassName="active">
                                                Trang chủ
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink exact to={'/shop'} activeClassName="active">
                                                Cửa hàng
                                                {/* <i className="fa fa-angle-down" /> */}
                                            </NavLink>
                                            {/* <ul role="menu" className="sub-menu">
                                                <li>
                                                    <a href="shop.html">Products</a>
                                                </li>
                                                <li>
                                                    <a href="product-details.html">Product Details</a>
                                                </li>
                                                <li>
                                                    <a href="checkout.html">Checkout</a>
                                                </li>
                                                <li>
                                                    <a href="cart.html">Cart</a>
                                                </li>
                                                <li>
                                                    <a href="login.html">Login</a>
                                                </li>
                                            </ul> */}
                                        </li>
                                        <li>
                                            <a href="#">
                                                Bài viết
                                                {/* <i className="fa fa-angle-down" /> */}
                                            </a>
                                            {/* <ul role="menu" className="sub-menu">
                                                <li>
                                                    <a href="blog.html">Blog List</a>
                                                </li>
                                                <li>
                                                    <a href="blog-single.html">Blog Single</a>
                                                </li>
                                            </ul> */}
                                        </li>
                                        {/* <li>
                                            <a href="404.html">404</a>
                                        </li> */}
                                        <li>
                                            <a href="contact-us.html">Liên hệ</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="search_box pull-right">
                                    <input type="text" placeholder="Tìm kiếm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*/header-bottom*/}
            </header>
            {/*/header*/}
        </>
    )
}

export default Header;