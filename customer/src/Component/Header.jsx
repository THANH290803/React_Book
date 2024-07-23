import React, { useEffect, useState } from 'react';
import { useLocation, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function Header() {
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
        window.dispatchEvent(new Event('userLoggedOut'));
        navigate('/');
    };

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
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
                        <a href="" className="btn border">
                            <i className="fas fa-heart text-primary" />
                            <span className="badge">0</span>
                        </a>
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
            <div className="container-fluid mb-5">
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
                            className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
                            id="navbar-vertical"
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
                                    <Link to={'/ProductByCategory/' + category.id + '?name=' + category.name} className="nav-item nav-link" key={category.id}>
                                        {category.name}
                                    </Link>
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
                                    <Link to={'/'} className="nav-item nav-link active">
                                        Trang chủ
                                    </Link>
                                    <Link to={'/shop'} href="shop.html" className="nav-item nav-link">
                                        Cửa hàng
                                    </Link>
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
                                            <Link to={'/account'} className="nav-item nav-link">
                                                Tài khoản
                                            </Link>
                                            <div className="nav-item nav-link">/</div>
                                            <a type='button' className="nav-item nav-link" onClick={handleLogout}>
                                                Đăng xuất
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <Link to={'/login'} className="nav-item nav-link">
                                                Đăng nhập
                                            </Link>
                                            <div className="nav-item nav-link">/</div>
                                            <Link to={'/register'} className="nav-item nav-link">
                                                Đăng ký
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </nav>
                        <div
                            id="header-carousel"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner">
                                <div className="carousel-item active" style={{ height: 410 }}>
                                    <img className="img-fluid" src={'https://thxuandinh.thuvien.edu.vn/htmlib/assets/img/Home/slide-2.png'} alt="Image" />
                                    {/* <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: 700 }}>
                                            <h4 className="text-light text-uppercase font-weight-medium mb-3">
                                                10% Off Your First Order
                                            </h4>
                                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                                                Fashionable Dress
                                            </h3>
                                            <a href="" className="btn btn-light py-2 px-3">
                                                Shop Now
                                            </a>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="carousel-item" style={{ height: 410 }}>
                                    <img className="img-fluid" src={'https://www.fahasa.com/media/wysiwyg/Thang-3-2020/1-Banner-chinh_920x420.jpg'} alt="Image" />
                                    {/* <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: 700 }}>
                                            <h4 className="text-light text-uppercase font-weight-medium mb-3">
                                                Giảm 10% cho đơn hàng đầu tiên của bạn
                                            </h4>
                                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                                                Giá cả hợp lý
                                            </h3>
                                            <a href="" className="btn btn-light py-2 px-3">
                                                Shop Now
                                            </a>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#header-carousel"
                                data-slide="prev"
                            >
                                <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                                    <span className="carousel-control-prev-icon mb-n2" />
                                </div>
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#header-carousel"
                                data-slide="next"
                            >
                                <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                                    <span className="carousel-control-next-icon mb-n2" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Navbar End */}
        </>
    );
}

export default Header;