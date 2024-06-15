import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Component/Header';
import Sidebar from '../../Component/Sidebar';
import Footer from '../../Component/Footer';
import { Link } from 'react-router-dom';


function BookByCategory() {
    const [books, setBooks] = useState([]);
    const { categoryId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    // Function to fetch data from API
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/BookByCategory/${categoryId}`);
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    // Logic for displaying current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = books.slice(indexOfFirstProduct, indexOfLastProduct);

    // Logic for handling page changes
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(books.length / productsPerPage);


    return (
        <>
            <Header />
            {/* <section id="advertisement">
                <div className="container">
                    <img src="images/shop/advertisement.jpg" alt="" />
                </div>
            </section> */}
            <section>
                <div className="container">
                    <div className="row">
                        <Sidebar />
                        <div className="col-sm-9 padding-right">
                            <div className="features_items">
                                {/*features_items*/}
                                <h2 className="title text-center">Tất cả mặt hàng</h2>
                                {currentProducts.map((book, index) => (
                                <div className="col-sm-4" key={index}>
                                    <div className="product-image-wrapper">
                                        <div className="single-products">
                                            <div className="productinfo text-center">
                                                <Link to={'/product-detail/' + book.id}>
                                                    <img src={'/images/shop/' + book.img} alt="" style={{width: '150px',height: '220px'}}/>
                                                    <h2>{book.price.toLocaleString('vi-VN')} VND</h2>
                                                    <h4 style={{color: 'black'}}>{book.name}</h4>
                                                </Link>
                                                <a href="#" className="btn btn-default add-to-cart">
                                                    <i className="fa fa-shopping-cart" />
                                                    Thêm vào giỏ hàng
                                                </a>
                                            </div>
                                            {/* <div className="product-overlay">
                                                <div className="overlay-content">
                                                    <h2>$56</h2>
                                                    <p>Easy Polo Black Edition</p>
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
                                                    <a href="">
                                                        <i className="fa fa-plus-square" />
                                                        Add to wishlist
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="">
                                                        <i className="fa fa-plus-square" />
                                                        Add to compare
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <ul className="pagination" style={{ float: 'right' }}>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li key={index} className={index + 1 === currentPage ? 'active' : ''}>
                                        <a onClick={() => paginate(index + 1)} href="#">
                                            {index + 1}
                                        </a>
                                    </li>
                                ))}
                                {currentPage < totalPages && (
                                    <li>
                                        <a
                                            onClick={() => paginate(currentPage + 1)}
                                            href="#"
                                        >
                                            »
                                        </a>
                                    </li>
                                )}
                            </ul>

                            {/*features_items*/}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            {/*/Footer*/}
        </>
    )
}



export default BookByCategory;