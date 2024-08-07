import React, { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import { useLocation, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function HeaderPage() {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/category');
            setCategories(response.data);
        } catch (error) {
            console.error('There was an error fetching the categories!', error);
        }
    };

    const [totalProducts, setTotalProducts] = useState(0);

    const fetchTotalProducts = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`http://127.0.0.1:8000/api/totalAmount/${user.id}`);
            setTotalProducts(response.data.total_products);
        } catch (error) {
            console.error('Error fetching total products:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchTotalProducts();
        handleFetchMember();
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        setTotalProducts(0);
        setIsAuthenticated(false);
        localStorage.setItem('logoutMessage', 'Đăng xuất thành công. Hẹn gặp lại bạn!');
        navigate('/');
    };

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [member, setMember] = useState({});

    const handleFetchMember = async () => {
        try {
            // Gọi API của Laravel để lấy thông tin member dựa trên memberId
            const response = await axios.get(`http://127.0.0.1:8000/api/member/members/${user.id}`);
            // Cập nhật state member với dữ liệu từ API
            setMember(response.data);
        } catch (error) {
            console.error('Error fetching member:', error);
        }
    };
    const [showLoginMessage, setShowLoginMessage] = useState(false);
    // const navigate = useNavigate();

    const handleCartClick = () => {
        if (!user) {
            setShowLoginMessage(true);
            setTimeout(() => {
                setShowLoginMessage(false);
            }, 5000); // Hide the modal after 3 seconds
        } else {
            navigate('/cart/' + user.id);
        }
    };

    const handleClose = () => setShowLoginMessage(false);

    return (
        <>
            {/* Topbar Start */}
            <div className="container-fluid">
                <div className="row align-items-center py-3 px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <Link to={'/'} className="text-decoration-none">
                            <h1 className="m-0 display-5 font-weight-semi-bold">
                                <span className="text-primary font-weight-bold border px-3 mr-1">
                                    E
                                </span>
                                Book Store
                            </h1>
                        </Link>
                    </div>
                    <div className="col-lg-6 col-6 text-left">
                        <form action="">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm kiếm sản phẩm"
                                />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-transparent text-primary">
                                        <i className="fa fa-search" />
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-3 col-6 text-right">
                        <a type='button' className="btn border" onClick={handleCartClick}>
                            <i className="fas fa-shopping-cart text-primary" />
                            <span className="badge">{totalProducts}</span>
                        </a>
                        <Modal show={showLoginMessage} onHide={handleClose}>
                            <Modal.Header>
                                <Modal.Title>Thông báo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Bạn phải đăng nhập thì mới vào được trang giỏ hàng.</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
            {/* Topbar End */}
            {/* Navbar Start */}
            <div className="container-fluid">
                <div className="row border-top px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <a
                            className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                            data-toggle="collapse"
                            href="#navbar-vertical"
                            style={{ height: 65, marginTop: "-1px", padding: "0 30px" }}
                        >
                            <h6 className="m-0">Danh mục</h6>
                            <i className="fa fa-angle-down text-dark" />
                        </a>
                        <nav
                            className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light"
                            id="navbar-vertical"
                            style={{ width: "calc(100% - 30px)", zIndex: 1 }}
                        >
                            <div
                                className="navbar-nav w-100 overflow-hidden"
                                style={{ height: 410 }}
                            >
                                {/* <div className="nav-item dropdown">
                                    <a href="#" className="nav-link" data-toggle="dropdown">
                                        Dresses <i className="fa fa-angle-down float-right mt-1" />
                                    </a>
                                    <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                        <a href="" className="dropdown-item">
                                            Men's Dresses
                                        </a>
                                        <a href="" className="dropdown-item">
                                            Women's Dresses
                                        </a>
                                        <a href="" className="dropdown-item">
                                            Baby's Dresses
                                        </a>
                                    </div>
                                </div> */}
                                {categories.map(category => (
                                    <a type='button' className="nav-item nav-link" key={category.id} onClick={() => window.location.href = `/ProductByCategory/${category.id}?name=${category.name}`}>
                                        {category.name}
                                    </a>
                                ))}
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0 display-5 font-weight-semi-bold">
                                    <span className="text-primary font-weight-bold border px-3 mr-1">
                                        E
                                    </span>
                                    Book Store
                                </h1>
                            </a>
                            <button
                                type="button"
                                className="navbar-toggler"
                                data-toggle="collapse"
                                data-target="#navbarCollapse"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div
                                className="collapse navbar-collapse justify-content-between"
                                id="navbarCollapse"
                            >
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to={'/'} className="nav-item nav-link">
                                        Trang chủ
                                    </Link>
                                    <NavLink to={'/shop'} href="shop.html" className="nav-item nav-link" activeClassName="active">
                                        Cửa hàng
                                    </NavLink>
                                    {/* <a href="detail.html" className="nav-item nav-link">
                                        Shop Detail
                                    </a>
                                    <div className="nav-item dropdown">
                                        <a
                                            href="#"
                                            className="nav-link dropdown-toggle"
                                            data-toggle="dropdown"
                                        >
                                            Pages
                                        </a>
                                        <div className="dropdown-menu rounded-0 m-0">
                                            <a href="cart.html" className="dropdown-item">
                                                Shopping Cart
                                            </a>
                                            <a href="checkout.html" className="dropdown-item">
                                                Checkout
                                            </a>
                                        </div>
                                    </div> */}
                                    <a href="contact.html" className="nav-item nav-link">
                                        Liên hệ
                                    </a>
                                </div>
                                <div className="navbar-nav ml-auto py-0">
                                    {isAuthenticated ? (
                                        <>
                                            <NavLink to={'/account'} className="nav-item nav-link" activeClassName="active">
                                                {member.username}
                                            </NavLink>
                                            <div className="nav-item nav-link">/</div>
                                            <a type='button' className="nav-item nav-link" onClick={handleLogout}>
                                                Đăng xuất
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <NavLink to={'/login'} className="nav-item nav-link" activeClassName="active">
                                                Đăng nhập
                                            </NavLink>
                                            <div className="nav-item nav-link">/</div>
                                            <NavLink to={'/register'} className="nav-item nav-link" activeClassName="active">
                                                Đăng ký
                                            </NavLink>
                                        </>
                                    )}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Navbar End */}
        </>
    );
}

export default HeaderPage;