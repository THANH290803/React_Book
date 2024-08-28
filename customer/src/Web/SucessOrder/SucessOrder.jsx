import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function SucessOrder() {
    const [animationStep, setAnimationStep] = useState(0);
    const [checkoutState, setCheckoutState] = useState(null);
    const [vnpTransactionNo, setVnpTransactionNo] = useState(null);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setAnimationStep(1);

            const timer2 = setTimeout(() => {
                setAnimationStep(2);

                const timer3 = setTimeout(() => {
                    setAnimationStep(3);
                }, 500);

                return () => clearTimeout(timer3);
            }, 500);

            return () => clearTimeout(timer2);
        }, 1500);
        

        const checkoutStateFromStorage = sessionStorage.getItem('checkoutState');
        if (checkoutStateFromStorage) {
            setCheckoutState(JSON.parse(checkoutStateFromStorage));
        }

        // const checkoutStateFromStorage = sessionStorage.getItem('checkoutState');
        // if (checkoutStateFromStorage) {
        //     setCheckoutState(JSON.parse(checkoutStateFromStorage));
        //     const parsedCheckoutState = JSON.parse(checkoutStateFromStorage);
        //     setVnpTransactionNo(parsedCheckoutState.vnpTransactionNo); // Lấy vnpTransactionNo từ checkoutState
        //     console.log(parsedCheckoutState.vnpTransactionNo);
        // }

        return () => clearTimeout(timer1);
    }, []);

    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    
    useEffect(() => {
        // Function to create order and order details
        const createOrderAndDetails = async () => {
            if (checkoutState) {
                try {
                    const user = JSON.parse(localStorage.getItem('user'));
                    // Create the order
                    const orderData = {
                        customer_id: user.id, // Assuming you have customer_id in checkoutState
                        payment_method_id: checkoutState.selectedPaymentMethod,
                        name_customer: checkoutState.customerName,
                        phone_customer: checkoutState.customerPhone,
                        address_customer: checkoutState.customerAddress,
                        status: 2,
                        note: checkoutState.note,
                    };

                    const orderResponse = await axios.post('http://127.0.0.1:8000/api/order/add', orderData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    const createdOrderId = orderResponse.data.id;

                    // Create order details
                    const orderDetails = checkoutState.selectedItems.map(item => ({
                        book_id: item.book.id,
                        order_id: createdOrderId,
                        quantity: item.quantity,
                        unit_price: item.book.price * item.quantity,
                    }));

                    const orderDetailsResponse = await axios.post('http://127.0.0.1:8000/api/order_detail/add', orderDetails, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    // Xóa các cartItem sau khi đặt hàng thành công
                    checkoutState.selectedItems.forEach(async (item) => {
                        await axios.delete(`http://127.0.0.1:8000/api/deleteCart/${item.id}`, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    });

                    // Clear checkout state from sessionStorage after successful order creation
                    sessionStorage.removeItem('checkoutState');
                } catch (error) {
                    console.error('Error creating order:', error);
                }
            }
        };

        // Gọi hàm createOrderAndDetails khi checkoutState và vnpTransactionNo thay đổi
        if (checkoutState) {
            createOrderAndDetails();
        }
    }, [checkoutState]);

    return (
        <div>
            <Helmet>
                <link href='https://fonts.googleapis.com/css?family=Lato:300,400|Montserrat:700' rel='stylesheet' type='text/css' />
                <style>
                    {`
                        @import url(//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css);
                    `}
                </style>
                <link rel="stylesheet" href="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/default_thank_you.css" />
                <script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/jquery-1.9.1.min.js"></script>
                <script src="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/html5shiv.js"></script>
                <style>
                    {`
                    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300);

                    .inner {
                        position: absolute;
                        margin: auto;
                        width: 50px;
                        height: 95px;
                        top: 0px;
                        left: 0px;
                        bottom: 0px;
                        right: 0px;
                    }

                    .inner > div {
                        width: 50px;
                        height: 50px;
                        background-color: rgba(255, 255, 255, 0.7);
                        border-radius: 100%;
                        position: absolute;
                        transition: all 0.5s ease;
                    }

                    .inner > div:first-child {
                        margin-left: -27px;
                        animation: one 1.5s linear 1;
                    }

                    .inner > div:nth-child(2) {
                        margin-left: 27px;
                        animation: two 1.5s linear 1;
                    }

                    .inner > div:nth-child(3) {
                        margin-top: 54px;
                        margin-left: -27px;
                        animation: four 1.5s linear 1;
                    }

                    .inner > div:nth-child(4) {
                        margin-top: 54px;
                        margin-left: 27px;
                        animation: three 1.5s linear 1;
                    }

                    @keyframes one {
                        0% { transform: scale(1); }
                        25% { transform: scale(0.3); }
                        50% { transform: scale(1); }
                        75% { transform: scale(1.4); }
                        100% { transform: scale(1); }
                    }

                    @keyframes two {
                        0% { transform: scale(1.4); }
                        25% { transform: scale(1); }
                        50% { transform: scale(0.3); }
                        75% { transform: scale(1); }
                        100% { transform: scale(1.4); }
                    }

                    @keyframes three {
                        0% { transform: scale(1); }
                        25% { transform: scale(1.4); }
                        50% { transform: scale(1); }
                        75% { transform: scale(0.3); }
                        100% { transform: scale(1); }
                    }

                    @keyframes four {
                        0% { transform: scale(0.3); }
                        25% { transform: scale(1); }
                        50% { transform: scale(1.4); }
                        75% { transform: scale(1); }
                        100% { transform: scale(0.3); }
                    }

                    .inner > div.done {
                        margin-left: 0px;
                        margin-top: 27px;
                    }

                    .inner > div.page {
                        transform: scale(40);
                    }

                    .pageLoad {
                        position: fixed;
                        top: 0px;
                        left: 0px;
                        width: 100%;
                        height: 100vh;
                        background-color: #0A0A0A;
                        transition: all 0.3s ease;
                        z-index: 2;
                    }

                    .pageLoad.off {
                        opacity: 0;
                        pointer-events: none;
                    }
                    `}
                </style>
            </Helmet>
            <div className={`pageLoad ${animationStep === 3 ? 'off' : ''}`}>
                <div className="inner">
                    <div className={animationStep > 0 ? 'done' : ''}></div>
                    <div className={animationStep > 0 ? 'done' : ''}></div>
                    <div className={animationStep > 0 ? 'done' : ''}></div>
                    <div className={animationStep > 0 ? 'done' : ''}></div>
                </div>
            </div>
            <header className="site-header" id="header">
                <h1 className="site-header__title" data-lead-id="site-header-title">CẢM ƠN!</h1>
            </header>

            <i className="fa fa-check main-content__checkmark" id="checkmark"></i>
            <div className="main-content">
                <p className="main-content__body" data-lead-id="main-content-body">
                Cảm ơn bạn rất nhiều vì đã tin tưởng và đặt hàng của chúng tôi. 
                Chúng tôi luôn lấy làm vinh dự để phục vụ những khách hàng yêu dấu của chúng tôi.
                </p>
            </div>

            <footer className="site-footer" id="footer">
                <a href="http://localhost:3001/">Trở lại trang chủ</a>
            </footer>
        </div>
    );
}

export default SucessOrder;