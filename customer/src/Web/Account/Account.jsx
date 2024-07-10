import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import HeaderPage from "../../Component/HeaderPage";
import Footer from "../../Component/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCheckCircle, faTruck, faClipboardCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


function Account() {
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

    const [orders, setOrders] = useState([]);
    const [currentStatus, setCurrentStatus] = useState('1'); // State to manage current status filter
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const [editingProfile, setEditingProfile] = useState(false);

    useEffect(() => {
        fetchOrders(); // Fetch all orders initially
        handleFetchMember();
    }, []);

    const fetchOrders = async () => {
        try {
            // Get user from localStorage
            const user = JSON.parse(localStorage.getItem('user'));

            const response = await fetch(`http://127.0.0.1:8000/api/orderCustomer/${user.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data.orders);
            setCurrentStatus('1'); // Reset status filter when fetching all orders
            setCurrentPage(1); // Reset current page to 1
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleStatusFilterClick = (status) => {
        setCurrentStatus(status === currentStatus ? null : status);
        setCurrentPage(1); // Reset current page to 1 when status filter changes
    };

    const toggleEditingProfile = () => {
        setEditingProfile(!editingProfile);
    };

    // Filter orders based on current status and paginate them
    const filteredOrders = orders.filter(order => currentStatus ? order.status === currentStatus : true);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleChangeStatus = async (orderId) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/order/update/${orderId}/approve`);
            if (response.status === 200) {
                // Handle success: Update UI or fetch orders again
                fetchOrders(); // Example: Refresh orders after status update
            } else {
                // Handle error if needed
                console.error('Failed to approve order');
            }
        } catch (error) {
            console.error('Error approving order:', error);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/order/${orderId}/cancel`);
            if (response.status === 200) {
                // Handle success: Update UI or fetch orders again
                fetchOrders(); // Fetch updated list of orders
            } else {
                // Handle error if needed
                console.error('Failed to cancel order:', response.data.message);
                // Handle error state in UI
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };
    

    function formatCurrencyVND(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
    }       
    

    return (
        <>
            <style>{`
                .card {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                    word-wrap: break-word;
                    background-color: #fff;
                    background-clip: border-box;
                    border: 0 solid transparent;
                    border-radius: .25rem;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
                }
                .me-2 {
                    margin-right: .5rem !important;
                }
                
                .list-group-item.active {
                    background-color: #a52a2a2b !important; /* Ensure the color is applied */
                    color: white !important; /* Optional: to make the text color white */
                }     
            `}</style>
            <HeaderPage />

            <div className="container-fluid bg-secondary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: 300 }}
                >
                    <h1 className="font-weight-semi-bold text-uppercase mb-3">
                        Tài khoản của bạn
                    </h1>
                    {/* <div className="d-inline-flex">
                        <p className="m-0">
                            <a href="">Trang chủ</a>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Giỏ hàng</p>
                    </div> */}
                </div>
            </div>
            <div className="container">
                <div className="main-body">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                            alt="Admin"
                                            className="rounded-circle p-1 bg-primary"
                                            width={110}
                                        />
                                        <div className="mt-3">
                                            <h4>{member.username}</h4>
                                            <p className="text-black mb-1">{member.phone_number}</p>
                                            <p className="text-muted font-size-sm">
                                                {member.address}
                                            </p>
                                            <button
                                                className="btn btn-primary"
                                                onClick={toggleEditingProfile}
                                            >
                                                Sửa thông tin cá nhân
                                            </button>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <ul className="list-group list-group-flush">
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                                            style={{ backgroundColor: currentStatus === '1' ? '#a52a2a2b' : '' }}
                                            onClick={() => handleStatusFilterClick('1')}
                                        >
                                            <a type='button'>
                                                <h6 className="mb-0" style={{ color: '#e29309' }}>
                                                    <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
                                                    Đơn hàng mới
                                                </h6>
                                            </a>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                                            style={{ backgroundColor: currentStatus === '2' ? '#a52a2a2b' : '' }}
                                            onClick={() => handleStatusFilterClick('2')}
                                        >
                                            <a type='button'>
                                                <h6 className="mb-0" style={{ color: '#c4c40e' }}>
                                                    <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                                                    Đơn hàng đã xác nhận
                                                </h6>
                                            </a>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                                            style={{ backgroundColor: currentStatus === '3' ? '#a52a2a2b' : '' }}
                                            onClick={() => handleStatusFilterClick('3')}
                                        >
                                            <a type='button'>
                                                <h6 className="mb-0" style={{ color: '#3434ca' }}>
                                                    <FontAwesomeIcon icon={faTruck} className="me-2" />
                                                    Đơn hàng đang giao
                                                </h6>
                                            </a>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                                            style={{ backgroundColor: currentStatus === '4' ? '#a52a2a2b' : '' }}
                                            onClick={() => handleStatusFilterClick('4')}
                                        >
                                            <a type='button'>
                                                <h6 className="mb-0" style={{ color: '#67d567' }}>
                                                    <FontAwesomeIcon icon={faClipboardCheck} className="me-2" />
                                                    Đơn hàng đã hoàn thành
                                                </h6>
                                            </a>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                                            style={{ backgroundColor: currentStatus === '5' ? '#a52a2a2b' : '' }}
                                            onClick={() => handleStatusFilterClick('5')}
                                        >
                                            <a type='button'>
                                                <h6 className="mb-0" style={{ color: '#ff0000ab' }}>
                                                    <FontAwesomeIcon icon={faTimesCircle} className="me-2" />
                                                    Huỷ đơn hàng
                                                </h6>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            {editingProfile ? (
                                <div className="card">
                                    <h2 style={{textAlign: 'center', paddingTop: '20px', paddingBottom: '10px'}}>Thông tin cá nhân</h2>
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-sm-3" style={{paddingTop: '10px'}}>
                                                <h6 className="mb-0">Họ và tên</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={member.username}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3" style={{paddingTop: '10px'}}>
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={member.email}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3" style={{paddingTop: '10px'}}>
                                                <h6 className="mb-0">Số điện thoại</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={member.phone_number}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3" style={{paddingTop: '10px'}}>
                                                <h6 className="mb-0">Địa chỉ</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={member.address}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3" />
                                            <div className="col-sm-9 text-secondary">
                                                <input
                                                    type="button"
                                                    className="btn btn-primary px-4"
                                                    defaultValue="Save Changes"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="card">
                                    <div className="card-body">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Mã Đơn hàng</th>
                                                    <th scope="col">Tên khách hàng</th>
                                                    <th scope="col">Tổng tiền</th>
                                                    {/* <th scope="col">Trạng thái</th> */}
                                                    {currentOrders.some(order => order.status === '1' || order.status === '3') && (
                                                        <th scope="col"></th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentOrders.length > 0 ? (
                                                    currentOrders.map(order => (
                                                        <tr key={order.code_order}>
                                                            <td>{order.code_order}</td>
                                                            <td>{order.name_customer}</td>
                                                            <td>{formatCurrencyVND(order.totalPrice)}</td>
                                                            {(() => {
                                                                if (order.status == 3) {
                                                                    return (
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            <a type='button' onClick={() => handleChangeStatus(order.id)}>
                                                                                <FontAwesomeIcon icon={faClipboardCheck} className="me-2" style={{ color: 'green', fontSize: '20px' }} title="Hoàn Thành" />
                                                                            </a>
                                                                        </td>
                                                                    );
                                                                } else if (order.status == 1) {
                                                                    return (
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            <a type='button' onClick={() => handleCancelOrder(order.id)}>
                                                                                <FontAwesomeIcon icon={faTimesCircle} className="me-2" style={{ color: 'red', fontSize: '20px' }} title="Hủy đơn hàng" />
                                                                            </a>
                                                                        </td>
                                                                    )
                                                                } else {

                                                                }

                                                            })()}
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center">Không có đơn hàng phù hợp</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        {/* Pagination */}
                                        {filteredOrders.length > itemsPerPage && (
                                            <nav aria-label="...">
                                                <ul className="pagination">
                                                    {Array.from({ length: Math.ceil(filteredOrders.length / itemsPerPage) }, (_, index) => (
                                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                            <a className="page-link" type='button' onClick={() => paginate(index + 1)}>
                                                                {index + 1}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </nav>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </>

    )
}

export default Account;