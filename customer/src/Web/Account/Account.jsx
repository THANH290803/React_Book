import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import HeaderPage from "../../Component/HeaderPage";
import Footer from "../../Component/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCheckCircle, faTruck, faClipboardCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'; // Import moment library
import 'moment/locale/vi';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                const order = orders.find(order => order.id === orderId);
                toast.success(`"${order.code_order}" hoàn thành đơn hàng. Cảm ơn bạn đã ủng hộ chúng tôi!`);
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
                const order = orders.find(order => order.id === orderId);
                toast.success(`"${order.code_order}" huỷ đơn hàng thành công!`);
            } else {
                // Handle error if needed
                console.error('Failed to cancel order:', response.data.message);
                // Handle error state in UI
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };


    const formatCurrencyVND = (price) => {
        if (typeof price !== 'number') {
            price = parseFloat(price);
        }
        return price.toLocaleString('vi-VN') + ' VND';
    };

    // Order Details
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: '50%', left: '50%' });


    const handleOrderClick = (order, e) => {
        e.preventDefault();  // Prevent default action if necessary

        setSelectedOrder(order);
        setShowModal(true);

        const buttonRect = e.target.getBoundingClientRect();
        setModalPosition({
            top: `${buttonRect.top + window.scrollY}px`,
            left: `${buttonRect.left + window.scrollX}px`,
        });
    };

    const [showModalCancel, setShowModalCancel] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleShow = (orderId) => {
        setSelectedOrderId(orderId);
        setShowModalCancel(true);
    };

    const handleClose = () => setShowModalCancel(false);

    const handleConfirmCancel = () => {
        if (selectedOrderId !== null) {
            handleCancelOrder(selectedOrderId);
            setSelectedOrderId(null);
        }
        setShowModalCancel(false);
    };

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
                                    <h2 style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '10px' }}>Thông tin cá nhân</h2>
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-sm-3" style={{ paddingTop: '10px' }}>
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
                                            <div className="col-sm-3" style={{ paddingTop: '10px' }}>
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
                                            <div className="col-sm-3" style={{ paddingTop: '10px' }}>
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
                                            <div className="col-sm-3" style={{ paddingTop: '10px' }}>
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
                                                    <th scope="col">Ngày đặt hàng</th>
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
                                                            <td><a className='no-underline' type='button' href='#' onClick={(e) => handleOrderClick(order, e)}>{order.code_order}</a></td>
                                                            <td>{order.name_customer}</td>
                                                            <td>{moment(order.created_at).format('DD-MM-YYYY HH:mm:ss')}</td>
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
                                                                            <a type='button' onClick={() => handleShow(order.id)}>
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

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
                style={{ width: 'auto' }} // Automatically adjusts to content width
            />

            <Modal show={showModalCancel} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Xác nhận hủy đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn hủy đơn hàng này không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={handleConfirmCancel}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="xl" // Large size for better content display
                dialogClassName="modal-100w" // Custom width for the modal
            >
                <Modal.Header className="bg-primary text-white" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Modal.Title><h2 style={{ color: '#8B4513' }}>Chi tiết đơn hàng</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {selectedOrder ? (
                        <Row>
                            {/* payment_method_name */}
                            <Col md={6}>
                                <h4 style={{ color: 'orange' }}>Thông tin đơn hàng</h4>
                                <br />
                                <p><strong>Mã đơn hàng:</strong> {selectedOrder.code_order}</p>
                                <p><strong>Ngày đặt hàng:</strong> {moment(selectedOrder.created_at).format('DD-MM-YYYY HH:mm:ss')}</p>
                                {/* <p><strong>Sản phẩm:</strong> {selectedOrder.items ? selectedOrder.items.map(item => item.product_name).join(', ') : 'Không có sản phẩm'}</p> */}
                                <p><strong>Mã vận đơn: </strong> {selectedOrder.shipping_code ? selectedOrder.shipping_code : 'N/A'}</p>
                                <p><strong>Trạng thái:</strong> {selectedOrder.status === '1' ? 'Đơn hàng mới' : selectedOrder.status === '2' ? 'Đơn hàng đã xác nhận' : selectedOrder.status === '3' ? 'Đơn hàng đang giao' : selectedOrder.status === '4' ? 'Đơn hàng đã hoàn thành' : 'Đơn hàng đã huỷ'}</p>
                            </Col>
                            <Col md={6}>
                                <h4 style={{ color: '#228B22' }}>Địa chỉ giao hàng</h4>
                                <br />
                                <p><strong>Người nhận:</strong> {selectedOrder.name_customer}</p>
                                <p><strong>Địa chỉ:</strong> {selectedOrder.phone_customer}</p>
                                <p><strong>Số điện thoại:</strong> {selectedOrder.address_customer}</p>
                                <p><strong>Phương thức thanh toán: </strong> {selectedOrder.payment_method_name}</p>
                            </Col>
                            <Col md={12}>
                                <br />
                                {selectedOrder.note ? (
                                    <>
                                        <p><strong>Ghi chú:</strong></p>
                                        <div dangerouslySetInnerHTML={{ __html: selectedOrder.note }} />
                                    </>
                                ) : null}
                            </Col>
                            <Col md={12}>
                                <h4 style={{ color: '#006699' }}>Sản phẩm đã đặt</h4>
                                <br />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Ảnh sản phẩm</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Giá tiền</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedOrder.books.map((book, index) => (
                                            <tr key={index}>
                                                <td><img src={book.img} width={100} height={150} alt={book.book_name} /></td>
                                                <td>{book.book_name}</td>
                                                <td>{book.quantity}</td>
                                                <td>{formatCurrencyVND(book.price)}</td>
                                                <td>{formatCurrencyVND(book.price * book.quantity)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Col>
                            <Col md={12}>
                                <div className="mt-4 py-3 px-4 d-flex justify-content-between align-items-center bg-light rounded-lg">
                                    <p className="h4 mb-0"><strong>Tổng tiền đơn hàng:</strong></p>
                                    <p className="h4 mb-0" style={{ color: '#8a2be2', fontWeight: 'bold' }}>{formatCurrencyVND(selectedOrder.totalPrice)}</p>
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <p className="text-center">Không có dữ liệu đơn hàng.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>


            <Footer />
        </>

    )
}

export default Account;