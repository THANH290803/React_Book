import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import HeaderPage from "../Component/HeaderPage";
import Footer from "../Component/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductByCategory() {
    const { id } = useParams();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categoryName = params.get('name');
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [productCounts, setProductCounts] = useState({
        '0-100': 0,
        '100-200': 0,
        '200-300': 0,
        '300-400': 0,
        '400-500': 0,
        '500-600': 0,
    });
    const [sortType, setSortType] = useState('');
    const [showSortDropdown, setShowSortDropdown] = useState(true);
    const itemsPerPage = 12;

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/BookByCategory/${id}`);
            const products = res.data || [];
            setProducts(products);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    // Format price for display
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + ' VND';
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle search form submission
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setCurrentPage(1); // Reset to the first page when a new search is performed
    };

    // Handle pagination click
    const handleClick = (event, pageNumber) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };

    // Handle price range checkbox change
    const handlePriceRangeChange = (event) => {
        const value = event.target.value;
        setSelectedPriceRanges((prevRanges) =>
            prevRanges.includes(value)
                ? prevRanges.filter((range) => range !== value)
                : [...prevRanges, value]
        );
    };

    // Determine price range for a product
    const getPriceRange = (price) => {
        if (price >= 0 && price <= 100000) return '0-100';
        if (price > 100000 && price <= 200000) return '100-200';
        if (price > 200000 && price <= 300000) return '200-300';
        if (price > 300000 && price <= 400000) return '300-400';
        if (price > 400000 && price <= 500000) return '400-500';
        if (price > 500000 && price <= 600000) return '500-600';
        return 'other';
    };

    // Filter products based on search term and selected price ranges
    const filterProducts = (products) => {
        let filteredProducts = products;

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedPriceRanges.length > 0) {
            filteredProducts = filteredProducts.filter(product => {
                const priceRange = getPriceRange(product.price);
                return selectedPriceRanges.includes(priceRange);
            });
        }

        if (selectedAuthors.length > 0) {
            filteredProducts = filteredProducts.filter(product => {
                const bookAuthors = product.author.split(',').map(author => author.trim());
                return selectedAuthors.some(selectedAuthor => bookAuthors.includes(selectedAuthor));
            });
        }

        return filteredProducts;
    };

    // Calculate product counts in each price range
    const calculateProductCounts = (products) => {
        const priceRanges = {
            '0-100': 0,
            '100-200': 0,
            '200-300': 0,
            '300-400': 0,
            '400-500': 0,
            '500-600': 0,
        };

        products.forEach(product => {
            const priceRange = getPriceRange(product.price);
            if (priceRanges.hasOwnProperty(priceRange)) {
                priceRanges[priceRange]++;
            }
        });

        return priceRanges;
    };

    // Sort products based on sort type
    const sortProducts = (type, products) => {
        let sortedProducts = [...products];
        if (type === 'A-Z') {
            sortedProducts.sort((a, b) => (a.name > b.name ? 1 : -1));
        } else if (type === 'high-to-low') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (type === 'low-to-high') {
            sortedProducts.sort((a, b) => a.price - b.price);
        }
        return sortedProducts;
    };

    // Fetch products when component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    // Update product counts when products change
    useEffect(() => {
        const productCounts = calculateProductCounts(products);
        setProductCounts(productCounts);
    }, [products]);

    // Handle sorting change
    const handleSortChange = (type) => {
        setSortType(type);
        setCurrentPage(1); // Reset to the first page when sorting changes
        setShowSortDropdown(false);
    };

    const resetSort = () => {
        setSortType('');
        setShowSortDropdown(true);
    };

    // Paginate filtered and sorted products
    const filteredProducts = filterProducts(products);
    const sortedProducts = sortType ? sortProducts(sortType, filteredProducts) : filteredProducts;
    const displayProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Generate array of page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sortedProducts.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const [authors, setAuthors] = useState([]);

    // Fetch unique authors
    // const fetchAuthors = async () => {
    //     try {
    //         const res = await axios.get('http://127.0.0.1:8000/api/authors');
    //         const authorsData = res.data || [];

    //         // Fetch book counts for each author
    //         const authorsWithBookCounts = await Promise.all(authorsData.map(async (author) => {
    //             const bookCountRes = await axios.get(`http://127.0.0.1:8000/api/books/count?author=${author}`);
    //             const bookCount = bookCountRes.data.count || 0;

    //             return {
    //                 name: author,
    //                 bookCount: bookCount
    //             };
    //         }));

    //         setAuthors(authorsWithBookCounts);
    //     } catch (error) {
    //         console.error('Error fetching authors: ', error);
    //     }
    // };

    const fetchAuthors = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/authors');
            const authorsData = res.data || [];

            // Split multiple authors and count individually
            const authorCounts = {};
            authorsData.forEach(authorString => {
                authorString.split(',').map(author => author.trim()).forEach(author => {
                    authorCounts[author] = (authorCounts[author] || 0) + 1;
                });
            });

            const authorsWithBookCounts = Object.entries(authorCounts).map(([author, count]) => ({
                name: author,
                bookCount: count,
            }));

            setAuthors(authorsWithBookCounts);
        } catch (error) {
            console.error('Error fetching authors: ', error);
        }
    };

    // useEffect to fetch authors when component mounts
    useEffect(() => {
        fetchAuthors();
    }, []);

    // Handle author checkbox change
    const handleAuthorChange = (event) => {
        const authorName = event.target.value;
        setSelectedAuthors((prevAuthors) =>
            prevAuthors.includes(authorName)
                ? prevAuthors.filter((author) => author !== authorName)
                : [...prevAuthors, authorName]
        );
    };

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
            if (response.data.success) {
                setCartItems([...cartItems, product]);
                toast.success(`"${product.name}" đã được thêm vào giỏ hàng thành công!`);
            } else if (response.data.out_of_stock_items.length > 0) {
                toast.error(`"${product.name}" đã hết hàng`);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error(`"${product.name}" đã được thêm vào giỏ hàng thất bại!`);
        }
    };

    return (
        <>
            <HeaderPage />
            {/* Page Header Start */}
            <div className="container-fluid bg-secondary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: 300 }}
                >
                    {categoryName &&
                        <h1 className="font-weight-semi-bold text-uppercase mb-3">{categoryName}</h1>
                    }
                    {/* <div className="d-inline-flex">
                        <p className="m-0">
                            <a href="">Trang chủ</a>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Cửa hàng</p>
                    </div> */}
                </div>
            </div>
            {/* Page Header End */}
            {/* Shop Start */}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    {/* Shop Sidebar Start */}
                    <div className="col-lg-3 col-md-12">
                        {/* Price Start */}
                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Lọc sản phẩm theo giá</h5>
                            <form>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        value="0-100"
                                        id="price-1"
                                        onChange={handlePriceRangeChange}
                                    />
                                    <label className="custom-control-label" htmlFor="price-1">
                                        0 VND - 100.000 VND
                                    </label>
                                    <span className="badge border font-weight-normal">{productCounts['0-100']}</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        value="100-200"
                                        id="price-2"
                                        onChange={handlePriceRangeChange}
                                    />
                                    <label className="custom-control-label" htmlFor="price-2">
                                        100.000 VND - 200.000 VND
                                    </label>
                                    <span className="badge border font-weight-normal">{productCounts['100-200']}</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        value="200-300"
                                        id="price-3"
                                        onChange={handlePriceRangeChange}
                                    />
                                    <label className="custom-control-label" htmlFor="price-3">
                                        200.000 VND - 300.000 VND
                                    </label>
                                    <span className="badge border font-weight-normal">{productCounts['200-300']}</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        value="300-400"
                                        id="price-4"
                                        onChange={handlePriceRangeChange}
                                    />
                                    <label className="custom-control-label" htmlFor="price-4">
                                        300.000 VND - 400.000 VND
                                    </label>
                                    <span className="badge border font-weight-normal">{productCounts['300-400']}</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        value="400-500"
                                        id="price-5"
                                        onChange={handlePriceRangeChange}
                                    />
                                    <label className="custom-control-label" htmlFor="price-5">
                                        400.000 VND - 500.000 VND
                                    </label>
                                    <span className="badge border font-weight-normal">{productCounts['400-500']}</span>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        value="500-600"
                                        id="price-6"
                                        onChange={handlePriceRangeChange}
                                    />
                                    <label className="custom-control-label" htmlFor="price-6">
                                        500.000 VND - 600.000 VND
                                    </label>
                                    <span className="badge border font-weight-normal">{productCounts['500-600']}</span>
                                </div>
                            </form>
                        </div>
                        {/* Price End */}
                        <div className="border-bottom mb-4 pb-4">
                            <h5 className="font-weight-semi-bold mb-4">Lọc theo tác giả</h5>
                            <form>
                                {authors.map(author => (
                                    // <div key={author} className="custom-control custom-checkbox mb-3">
                                    //     <input
                                    //         type="checkbox"
                                    //         className="custom-control-input"
                                    //         id={`author-${author}`}
                                    //         value={author}
                                    //         onChange={handleAuthorChange}
                                    //     />
                                    //     <label className="custom-control-label" htmlFor={`author-${author}`}>
                                    //         {author}
                                    //     </label>
                                    //     <span class="badge border font-weight-normal">1000</span>
                                    // </div>
                                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3" key={author.name}>
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={`author-${author.name}`}
                                            checked={selectedAuthors.includes(author.name)}
                                            value={author.name}
                                            onChange={handleAuthorChange}
                                        />
                                        <label className="custom-control-label" htmlFor={`author-${author.name}`}>
                                            {author.name}
                                        </label>
                                        <span className="badge border font-weight-normal">{author.bookCount}</span>
                                    </div>
                                ))}
                            </form>
                        </div>
                    </div>
                    {/* Shop Sidebar End */}
                    {/* Shop Product Start */}
                    <div className="col-lg-9 col-md-12">
                        <div className="row pb-3">
                            <div className="col-12 pb-1">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <form onSubmit={handleSearchSubmit}>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tìm kiếm theo tên"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                            <div className="input-group-append">
                                                <button className="input-group-text bg-transparent text-primary" type="submit">
                                                    <i className="fa fa-search" />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="dropdown ml-4">
                                        <button
                                            className="btn border dropdown-toggle"
                                            type="button"
                                            id="triggerId"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            {sortType === '' ? 'Sắp xếp theo' : (
                                                sortType === 'A-Z' ? 'Sắp xếp từ: A - Z' :
                                                    sortType === 'high-to-low' ? 'Sắp xếp từ: Giá cao - Giá thấp' :
                                                        sortType === 'low-to-high' ? 'Sắp xếp từ: Giá thấp - Giá cao' : 'Sắp xếp theo'
                                            )}
                                        </button>
                                        <div
                                            className="dropdown-menu dropdown-menu-right"
                                            aria-labelledby="triggerId"
                                        >
                                            <button
                                                className="dropdown-item"
                                                onClick={() => handleSortChange('A-Z')}
                                            >
                                                A - Z
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => handleSortChange('high-to-low')}
                                            >
                                                Giá cao - Giá thấp
                                            </button>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => handleSortChange('low-to-high')}
                                            >
                                                Giá thấp - Giá cao
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {displayProducts.length > 0 ? (
                                displayProducts.map(product => {
                                    if (product.amount > 0) {
                                        return (
                                            <>
                                                <div className="col-lg-4 col-md-6 col-sm-12 pb-1" key={product.id}>
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
                                                            <a type='button' className="btn btn-sm text-dark p-0" onClick={() => addToCart(product)}>
                                                                <i className="fas fa-shopping-cart text-primary mr-1" />
                                                                Thêm vào giỏ hàng
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    }

                                })
                            ) : (
                                <p style={{ marginLeft: '550px' }}>Không có sản phẩm đó</p>
                            )}
                            <ToastContainer
                                position="top-right"
                                autoClose={3000}
                                hideProgressBar={false}
                                closeOnClick
                                pauseOnHover
                                draggable
                                theme="colored"
                                style={{ width: 'auto' }}
                            />
                            <div className="col-12 pb-1">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination mb-3" style={{ float: 'right' }}>
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <a className="page-link" href="#" aria-label="Previous" onClick={(e) => handleClick(e, currentPage - 1)}>
                                                <span aria-hidden="true">«</span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                        </li>
                                        {pageNumbers.map(number => (
                                            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                                <a className="page-link" href="#" onClick={(e) => handleClick(e, number)}>
                                                    {number}
                                                </a>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                                            <a className="page-link" href="#" aria-label="Next" onClick={(e) => handleClick(e, currentPage + 1)}>
                                                <span aria-hidden="true">»</span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    {/* Shop Product End */}
                </div>
            </div>
            {/* Shop End */}
            <Footer />
        </>

    );
}

export default ProductByCategory;