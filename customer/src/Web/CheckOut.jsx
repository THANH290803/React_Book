import React, { useState, useEffect } from 'react';
import HeaderPage from "../Component/HeaderPage";
import Footer from "../Component/Footer";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Checkout() {
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];

    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, item) => {
            return total + (item.book.price * item.quantity);
        }, 0);
    };

    const totalPrice = calculateTotalPrice();

    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/paymentMethod')
            .then(response => {
                setPaymentMethods(response.data);
            })
            .catch(error => {
                console.error('Error fetching payment methods:', error);
            });

        const user = JSON.parse(localStorage.getItem('user'));
        setCustomerName(user.username);
        setCustomerPhone(user.phone_number);
        setCustomerAddress(user.address);
    }, []);

    const token = localStorage.getItem('token');

    const handleOrder = () => {
        const user = JSON.parse(localStorage.getItem('user'));

        // Bước 1: Tạo đơn hàng (order)
        const orderData = {
            customer_id: user.id,
            payment_method_id: selectedPaymentMethod,
            name_customer: customerName,
            phone_customer: customerPhone,
            address_customer: customerAddress,
            note: note,
        };

        axios.post('http://127.0.0.1:8000/api/order/add', orderData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Order created successfully:', response.data);
                const createdOrderId = response.data.id; // Lấy order_id từ phản hồi

                console.log(createdOrderId);

                // Bước 2: Tạo order_details và bao gồm order_id từ đơn hàng vừa tạo
                const orderDetails = selectedItems.map(item => ({
                    book_id: item.book.id,
                    order_id: createdOrderId, // Sử dụng order_id từ đơn hàng mới tạo
                    quantity: item.quantity,
                    unit_price: item.book.price * item.quantity,
                }));

                // Gửi yêu cầu POST để thêm order_details cùng order_id
                axios.post('http://127.0.0.1:8000/api/order_detail/add', orderDetails, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        console.log('Order details added successfully:', response.data);

                        // Xóa các mục trong giỏ hàng sau khi đặt hàng thành công
                        selectedItems.forEach(item => {
                            axios.delete(`http://127.0.0.1:8000/api/deleteCart/${item.id}`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                                .then(response => {
                                    console.log('Cart item deleted:', response.data);
                                })
                                .catch(error => {
                                    console.error('Error deleting cart item:', error);
                                });
                        });

                        // Chuyển hướng đến trang thành công hoặc thực hiện hành động khác
                        window.location.href = 'http://127.0.0.1:8000/success-order';
                    })
                    .catch(error => {
                        console.error('Error adding order details:', error);
                    });
            })
            .catch(error => {
                console.error('Error creating order:', error);
            });
    };

    const handleVnpayOrder = () => {
        axios.post(`http://127.0.0.1:8000/api/paymentMethod/vnpay/${totalPrice}`)
            .then(response => {
                const { url } = response.data;
                window.location.href = url;
            })
            .catch(error => {
                console.error('Error getting VNPAY URL:', error);
            });
    };

    const VNPAY_METHOD_ID = 4; // Replace with actual VNPAY method ID

    return (
        <>
            <HeaderPage />
            {/* Page Header Start */}
            <div className="container-fluid bg-secondary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: 300 }}
                >
                    <h1 className="font-weight-semi-bold text-uppercase mb-3">Thủ tục thanh toán</h1>
                    <div className="d-inline-flex">
                        <p className="m-0">
                            <a href="">Giỏ hàng</a>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Thủ tục thanh toán</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}
            {/* Checkout Start */}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <div className="mb-4">
                            <h4 className="font-weight-semi-bold mb-4">Địa chỉ thanh toán</h4>
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label>Tên khách hàng</label>
                                    <input className="form-control" type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Tên khách hàng" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Số điện thoại khách hàng</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={customerPhone}
                                        placeholder="Số điện thoại khách hàng"
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-12 form-group">
                                    <label>Địa chỉ giao hàng</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Địa chỉ giao hàng"
                                        value={customerAddress}
                                        onChange={(e) => setCustomerAddress(e.target.value)}

                                    />
                                </div>
                                <div className="col-md-12 form-group">
                                    <label>Ghi chú</label>
                                    <ReactQuill
                                        theme="snow"
                                        name="note"
                                        id="note"
                                        value={note}
                                        onChange={setNote}
                                        modules={Checkout.modules}
                                        formats={Checkout.formats}
                                        style={{height: '285px'}}
                                        placeholder="Nhập văn bản của bạn..."
                                    />
                                </div>
                                {/* <div className="col-md-12 form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="newaccount"
                                        />
                                        <label className="custom-control-label" htmlFor="newaccount">
                                            Create an account
                                        </label>
                                    </div>
                                </div> */}
                                {/* <div className="col-md-12 form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="shipto"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="shipto"
                                            data-toggle="collapse"
                                            data-target="#shipping-address"
                                        >
                                            Gửi đến địa chỉ khác
                                        </label>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="collapse mb-4" id="shipping-address">
                            <h4 className="font-weight-semi-bold mb-4">Địa chỉ giao hàng</h4>
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label>Tên khách hàng</label>
                                    <input className="form-control" type="text" placeholder="Tên khách hàng" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Số điện thoại khách hàng</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Số điện thoại khách hàng"
                                    />
                                </div>
                                <div className="col-md-12 form-group">
                                    <label>Địa chỉ giao hàng</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Địa chỉ giao hàng"
                                    />
                                </div>
                                <div className="col-md-12 form-group">
                                    <label>Ghi chú</label>
                                    <textarea
                                        id="comments"
                                        name="comments"
                                        placeholder="Enter your comments here..."
                                        style={{
                                            width: '100%',
                                            height: '150px',
                                            padding: '10px',
                                            marginTop: '10px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Tổng số đơn hàng</h4>
                            </div>
                            <div className="card-body">
                                <h5 className="font-weight-medium mb-3">Sản phẩm</h5>
                                {selectedItems.map((item) => (
                                    <div className="d-flex justify-content-between">
                                        <p>{item.book.name}</p>
                                        <p>{item.quantity}</p>
                                        <p>{(item.book.price * item.quantity).toLocaleString('vi-VN')} VND</p>
                                    </div>
                                ))}
                                {/* <hr className="mt-0" />
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">Tổng phụ</h6>
                                    <h6 className="font-weight-medium">$150</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Phí vận chuyện</h6>
                                    <h6 className="font-weight-medium">$10</h6>
                                </div> */}
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">Tổng tiền</h5>
                                    <h5 className="font-weight-bold">{totalPrice.toLocaleString('vi-VN')} VND</h5>
                                </div>
                            </div>
                        </div>
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">Hình thức thanh toán</h4>
                            </div>
                            <div className="card-body">
                                {paymentMethods.map(method => (
                                    <div className="form-group" key={method.id}>
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                name="payment"
                                                value={method.id}
                                                id={method.id}
                                                onChange={() => setSelectedPaymentMethod(method.id)}
                                            />
                                            <label className="custom-control-label" htmlFor={method.id}>
                                                {method.name}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                {selectedPaymentMethod === VNPAY_METHOD_ID ? (
                                    <button className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" onClick={handleVnpayOrder}>
                                        Thanh toán qua VNPAY
                                    </button>
                                ) : (
                                    <button className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" onClick={handleOrder}>
                                        Đặt hàng
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Checkout End */}
            <Footer />
        </>
    );

    Checkout.modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
             {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    };
    
    Checkout.formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];
}

export default Checkout;