import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Component/Header';
import Sidebar from '../../Component/Sidebar';
import Footer from '../../Component/Footer';

function ProductDetail() {
    const { id } = useParams();

    const [books, setBooks] = useState([]);

    // Function to fetch data from API
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/book/show/${id}`);
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [recommendedItems, setRecommendedItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        fetchRandomBooks();
    }, []);

    const fetchRandomBooks = () => {
        axios.get('http://127.0.0.1:8000/api/book')
            .then(response => {
                setRecommendedItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching random books:', error);
            });
    };

    const handlePrevSlide = () => {
        setActiveIndex(prevIndex => {
            if (prevIndex === 0) {
                return recommendedItems.length - 3; // Lùi lại 3 quyển sách nếu đang ở slide đầu tiên
            } else {
                return prevIndex - 3; // Lùi lại 3 quyển sách
            }
        });
    };

    const handleNextSlide = () => {
        setActiveIndex(prevIndex => {
            if (prevIndex + 3 >= recommendedItems.length) {
                return 0; // Quay lại slide đầu nếu đang ở slide cuối cùng
            } else {
                return prevIndex + 3; // Di chuyển sang 3 quyển sách tiếp theo
            }
        });
    };

    return (
        <>
            <Header />
            <section>
                <div className="container">
                    <div className="row">
                        <Sidebar />
                        <div className="col-sm-9 padding-right">
                            <div className="product-details">
                                {/*product-details*/}
                                <div className="col-sm-5">
                                    <div className="view-product">
                                        <img src={'/images/shop/' + books.img} alt="" />
                                        {/* <h3>ZOOM</h3> */}
                                    </div>
                                </div>
                                <div className="col-sm-7">
                                    <div className="product-information">
                                        {/*/product-information*/}
                                        <img
                                            src="images/product-details/new.jpg"
                                            className="newarrival"
                                            alt=""
                                        />
                                        <h2>{books.name}</h2>
                                        <p>ISBN: {books.isbn}</p>
                                        {/* <img src="/images/product-details/rating.png" alt="" /> */}
                                        <span>
                                            <span>{books.price && books.price.toLocaleString('vi-VN')} VND</span>
                                            <label>Quantity:</label>
                                            <input type="text" defaultValue={3} />
                                        </span>
                                        <p>
                                            <b>Tác giả:</b> {books.author}
                                        </p>
                                        <p>
                                            <b>Năm xuất bản:</b> {books.publish_year}
                                        </p>
                                        <p>
                                            <b>Số lượng đã bán:</b> 0
                                        </p>
                                        {/* <a href="">
                                            <img
                                                src="images/product-details/share.png"
                                                className="share img-responsive"
                                                alt=""
                                            />
                                        </a> */}
                                        <br />
                                        <a type="button" className="btn btn-fefault cart" style={{margin: '0px', width: '355px'}}>
                                            <i className="fa fa-shopping-cart" /> Thêm vào giỏ hàng
                                        </a>
                                    </div>
                                    {/*/product-information*/}
                                </div>
                            </div>
                            {/*/product-details*/}
                            <div className="category-tab shop-details-tab">
                                {/*category-tab*/}
                                <div className="col-sm-12">
                                    <ul className="nav nav-tabs">
                                        {/* <li>
                                            <a href="#details" data-toggle="tab">
                                                Details
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#companyprofile" data-toggle="tab">
                                                Company Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#tag" data-toggle="tab">
                                                Tag
                                            </a>
                                        </li> */}
                                        <li className="active">
                                            <a href="#reviews" data-toggle="tab">
                                                Mô tả
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    {/* <div className="tab-pane fade" id="details">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
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
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
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
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
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
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="companyprofile">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
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
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
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
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
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
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tag">
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="images/home/gallery1.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
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
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
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
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
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
                                                        <button
                                                            type="button"
                                                            className="btn btn-default add-to-cart"
                                                        >
                                                            <i className="fa fa-shopping-cart" />
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="tab-pane fade active in" id="reviews">
                                        <div className="col-sm-12">
                                            <p>
                                                {books.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*/category-tab*/}
                            {/* <div className="recommended-items">
                                <h2 className="title text-center">Mặt hàng liên quan</h2>
                                <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                    {recommendedItems.length > 0 &&
                                        recommendedItems.map((item, index) => (
                                            <div key={index} className={`item ${index >= activeIndex && index < activeIndex + 3 ? 'active' : ''}`}>
                                                    <div className="row">
                                                    {index >= activeIndex && index < activeIndex + 3 && (
                                                        <div className="col-sm-4">
                                                            <div className="product-image-wrapper">
                                                                <div className="single-products">
                                                                    <div className="productinfo text-center">
                                                                        <img src={`/images/shop/${item.img}`} alt="" style={{ width: '150px', height: '200px' }} />
                                                                        <h2>{item.price && item.price.toLocaleString('vi-VN')} VND</h2>
                                                                        <p>{item.name}</p>
                                                                        <button type="button" className="btn btn-default add-to-cart">
                                                                            <i className="fa fa-shopping-cart" />
                                                                            Add to cart
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                    <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev" onClick={handlePrevSlide}>
                                        <i className="fa fa-angle-left" />
                                    </a>
                                    <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next" onClick={handleNextSlide}>
                                        <i className="fa fa-angle-right" />
                                    </a>
                                </div>
                            </div> */}
                            {/*/recommended_items*/}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ProductDetail;