import React, { useState, useEffect } from 'react';
import HeaderPage from "../Component/HeaderPage";
import Footer from "../Component/Footer";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Cart() {
    const [cart, setCart] = useState(null);
    const { id } = useParams();

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/showCart/${id}`);
            // setCart(response.data.cart);
            const initialCart = response.data;
            // Thiết lập trạng thái chọn cho từng sản phẩm
            if (initialCart && initialCart.items) {
                const updatedItems = initialCart.items.map(item => ({
                    ...item,
                    selected: selectAll
                }));
                const updatedCart = {
                    ...initialCart,
                    items: updatedItems
                };
                setCart(updatedCart);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            // alert('Failed to fetch cart items. Please try again.');
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [id]);

    // Calculate subtotal and shipping fee based on cart items
    // let subtotal = 0;
    // let shippingFee = 0;
    // let totalSum = 0;

    // if (cart && cart.items) {
    //     subtotal = cart.items.reduce((total, item) => {
    //         return total + (item.book.price * item.quantity);
    //     }, 0);

    //     shippingFee = subtotal * 0.01;
    //     totalSum = subtotal + shippingFee;
    // }
    const [subtotal, setSubtotal] = useState(0);
    // const [shippingFee, setShippingFee] = useState(0);
    const [totalSum, setTotalSum] = useState(0);

    const calculateTotals = () => {
        let subTotal = 0;
        // let shippingFeeTotal = 0;

        cart.items.forEach(item => {
            if (item.selected) {
                subTotal += item.book.price * item.quantity;
                // Logic tính phí vận chuyển có thể thay đổi tùy vào yêu cầu của bạn
                // shippingFeeTotal += calculateShippingFee(item);
            }
        });

        setSubtotal(subTotal);
        // setShippingFee(shippingFeeTotal);
        // setTotalSum(subTotal + shippingFeeTotal);
        setTotalSum(subTotal);
    };

    // const calculateShippingFee = (item) => {
    //     // Tính phí vận chuyển là 2.5% của giá trị sản phẩm
    //     const feePercentage = 0.025; // 2.5%
    //     const fee = item.book.price * item.quantity * feePercentage;
    //     return fee;
    // };

    useEffect(() => {
        if (cart && cart.items) {
            calculateTotals();
        }
    }, [cart]);

    // Update
    const updateQuantity = async (itemId, newQuantity) => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/updateCart/${itemId}`,
                { quantity: newQuantity }
            );
            console.log('CartItem quantity updated:', response.data);
            fetchCartItems(); // Sau khi cập nhật thành công, gọi lại API để lấy thông tin giỏ hàng mới
        } catch (error) {
            console.error('Error updating cartItem quantity:', error);
        }
    };

    const handleIncreaseQuantity = (itemId, currentQuantity) => {
        const newQuantity = currentQuantity + 1;
        updateQuantity(itemId, newQuantity);
    };

    const handleDecreaseQuantity = (itemId, currentQuantity) => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            updateQuantity(itemId, newQuantity);
        }
    };

    // Delete
    const deleteData = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/deleteCart/${id}`);
            // After successful deletion, refresh the publisher list or perform other actions
            fetchCartItems();
        } catch (error) {
            console.error('Error deleting publisher:', error);
        }
    };

    // 
    const [selectAll, setSelectAll] = useState(true);

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        if (cart && cart.items) {
            const updatedCart = {
                ...cart,
                items: cart.items.map(item => ({
                    ...item,
                    selected: newSelectAll
                }))
            };
            setCart(updatedCart);
        }
    };

    const handleSelectItem = (itemId) => {
        if (cart && cart.items) {
            const updatedItems = cart.items.map(item => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        selected: !item.selected
                    };
                }
                return item;
            });
            const updatedCart = {
                ...cart,
                items: updatedItems
            };
            setCart(updatedCart);
        }
    };

    const navigate = useNavigate();
    const handleCheckout = () => {
        const selectedItems = cart.items.filter(item => item.selected);
        navigate('/checkout', { state: { selectedItems } });
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
                    <h1 className="font-weight-semi-bold text-uppercase mb-3">
                        Giỏ hàng
                    </h1>
                    <div className="d-inline-flex">
                        <p className="m-0">
                            <a href="">Trang chủ</a>
                        </p>
                        {/* <p className="m-0 px-2">-</p>
                        <p className="m-0">Giỏ hàng</p> */}
                    </div>
                </div>
            </div>
            {/* Page Header End */}
            {/* Cart Start */}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-12 table-responsive mb-5">
                        {cart && cart.items && (
                            <table className="table table-bordered text-center mb-0">
                                <thead className="bg-secondary text-dark">
                                    <tr>
                                        <th><input type='checkbox' checked={selectAll} onChange={handleSelectAll} /></th>
                                        <th>Hình ảnh</th>
                                        <th>Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Tổng tiền</th>
                                        <th>Xoá</th>
                                    </tr>
                                </thead>
                                {cart.items.map((item) => (
                                    <tbody className="align-middle" key={item.id}>
                                        <tr>
                                            <td className="align-middle"><input type='checkbox' checked={item.selected} onChange={() => handleSelectItem(item.id)}/></td>
                                            <td className="align-middle">
                                                <img src={item.book.img} alt="" style={{ width: 150, height: 230 }} />{" "}
                                            </td>
                                            <td className="align-middle">
                                                {/* <img src={item.book.img} alt="" style={{ width: 150 }} />{" "} */}
                                                {item.book.name}
                                            </td>
                                            <td className="align-middle">{item.book.price.toLocaleString('vi-VN')} VND</td>
                                            <td className="align-middle">
                                                <div
                                                    className="input-group quantity mx-auto"
                                                    style={{ width: 100 }}
                                                >
                                                    <div className="input-group-btn">
                                                        <button className="btn btn-sm btn-primary btn-minus" onClick={() => handleDecreaseQuantity(item.id, item.quantity)}>
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm bg-secondary text-center"
                                                        value={item.quantity}
                                                    />
                                                    <div className="input-group-btn">
                                                        <button className="btn btn-sm btn-primary btn-plus" onClick={() => handleIncreaseQuantity(item.id, item.quantity)}>
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">{(item.book.price * item.quantity).toLocaleString('vi-VN')} VND</td>
                                            <td className="align-middle">
                                                <button className="btn btn-sm btn-primary" onClick={() => deleteData(item.id)}>
                                                    <i className="fa fa-times" />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        )}
                    </div>
                    <div className="col-lg-4" style={{marginLeft: '1088px'}}>
                        {/* <form className="mb-5" action="">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control p-4"
                                    placeholder="Coupon Code"
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form> */}
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Tóm tắt giỏ hàng</h4>
                            </div>
                            {/* <div className="card-body">
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">Tổng phụ</h6>
                                    <h6 className="font-weight-medium">{subtotal.toLocaleString('vi-VN')} VND</h6>
                                </div> */}
                                {/* <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Phí vận chuyển</h6>
                                    <h6 className="font-weight-medium">{shippingFee.toLocaleString('vi-VN')} VND</h6>
                                </div> */}
                            {/* </div> */}
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Tổng cộng</h5>
                                    <h5 className="font-weight-bold">{totalSum.toLocaleString('vi-VN')} VND</h5>
                                </div>
                                {cart && cart.items && (
                                    <button 
                                        onClick={handleCheckout} 
                                        className="btn btn-block btn-primary my-3 py-3">
                                        Tiến hành thanh toán
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart End */}
            <Footer />
        </>

    );
}

export default Cart;