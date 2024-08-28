/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'; // Import moment library
import 'moment/locale/vi';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const storedValue = localStorage.getItem('itemsPerPage');
    return storedValue !== null ? parseInt(storedValue) : 10; // Giá trị mặc định là 10 nếu không có trong localStorage
  });
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [status, setStatus] = useState('1');

  useEffect(() => {
    localStorage.setItem('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  const [notification, setNotification] = useState({ message: '', type: '' });
  const [notificationModal, setNotificationModal] = useState(false);

  const toggleNotificationModal = () => setNotificationModal(!notificationModal);

  // Function to fetch orders based on status
  const fetchOrders = async (status) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/order/${status}?page=${currentPage}&itemsPerPage=${itemsPerPage}`);
      setOrders(response.data.orders);
      setFiltered(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Handle notifications
  const showNotificationWithTimeout = (message, type) => {
    setNotification({ message, type });
    setNotificationModal(true);
    setTimeout(() => {
      setNotificationModal(false);
      setNotification({ message: '', type: '' });
    }, 3500); // 3 giây
  };

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredData = orders.filter((order) =>
      order.code_order.toLowerCase().includes(e.target.value.toLowerCase()) ||
      order.name_customer.toLowerCase().includes(e.target.value.toLowerCase()) ||
      order.phone_customer.toLowerCase().includes(e.target.value.toLowerCase()) ||
      order.address_customer.toLowerCase().includes(e.target.value.toLowerCase()) ||
      order.payment_method_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltered(filteredData);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders(status);
  }, [status, currentPage, itemsPerPage]);

  // Function to format price
  const formatPrice = (price) => {
    if (typeof price !== 'number') {
      price = parseFloat(price);
    }
    return price.toLocaleString('vi-VN') + ' VND';
  };

  const handleApproveOrder = async (orderId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const approveId = user.id; // Obtain approve_id from user.id

      const response = await axios.put(`http://127.0.0.1:8000/api/order/update/${orderId}/approve`, {
        approve_id: approveId, // Pass approve_id as part of the request body
      });

      console.log('Đã duyệt đơn hàng thành công:', response.data);

      // Update orders state after successful approval
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          let newStatus = order.status; // Default to current status

          // Determine new status and notification message
          if (order.status === '1') {
            newStatus = '2';
            showNotificationWithTimeout('Duyệt đơn hàng thành công!', 'success');
          } else if (order.status === '2') {
            newStatus = '3';
            showNotificationWithTimeout('Giao hàng cho đơn vị vận chuyển thành công!', 'success');
          }

          return { ...order, status: newStatus };
        }
        return order;
      });

      setOrders(updatedOrders);
      setFiltered(updatedOrders);
      fetchOrders(status, currentPage, itemsPerPage);
    } catch (error) {
      console.error('Lỗi khi duyệt đơn hàng:', error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/order/${orderId}/cancel`);

      // Check if the response is successful
      if (response.status === 200) {
        showNotificationWithTimeout('Đơn hàng đã được hủy thành công!', 'success');
        fetchOrders(status, currentPage, itemsPerPage);
      } else {
        showNotificationWithTimeout('Không thể hủy đơn hàng.', 'error');
      }
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error);
      showNotificationWithTimeout('Có lỗi xảy ra khi hủy đơn hàng.', 'error');
    }
  };

  const handleCancelClick = (orderId, codeOrder) => {
    confirmAlert({
      title: 'Xác nhận huỷ đơn hàng',
      message: `Bạn có chắc chắn muốn huỷ đơn hàng với mã đơn '${codeOrder}' không?`,
      customUI: ({ title, message, onClose }) => (
        <div className='custom-ui'>
          <h1 className='modal-title'>{title}</h1>
          <br />
          <p className='modal-message'>{message}</p>
          <div className="modal-footer">
            <button
              onClick={async () => {
                // Close the dialog and perform cancellation when "Xóa" is clicked
                await cancelOrder(orderId); // Call the cancelOrder function
                onClose();
              }}
              className='delete-button'
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '22px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              Xác nhận huỷ
            </button>
            <button
              onClick={onClose} // Close the dialog when "Hủy" is clicked
              className='cancel-button'
              style={{
                backgroundColor: 'grey',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '22px',
                cursor: 'pointer',
              }}
            >
              Không huỷ
            </button>
          </div>
        </div>
      ),
    });
  };


  // Order Details
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const toggleModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(!modalOpen);
    // if (order) {
    //   setShippingCode(order.shipping_code || '');
    // }
  };


  const [isEditing, setIsEditing] = useState(false);
  const [shippingCode, setShippingCode] = useState('');

  useEffect(() => {
    if (selectedOrder) {
      setShippingCode(selectedOrder.shipping_code || '');
    }
  }, [selectedOrder]);

  const handleSaveShippingCode = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const updatedShippingCode = shippingCode === '' ? '' : shippingCode.trim(); // Ensure empty string becomes '0'
      const response = await axios.put(`http://127.0.0.1:8000/api/order/update/${selectedOrder.id}`, {
        shipping_code: updatedShippingCode,
        editor_id: user.id,
      });

      console.log('Shipping code updated successfully:', response.data);
      setIsEditing(false); // Exit edit mode
      // fetchOrders(selectedOrder.status);
      window.location.reload();
    } catch (error) {
      console.error('Error updating shipping code:', error);
      // Handle error: show error message or retry logic
    }
  };

  const handleContentEditableBlur = (event) => {
    const newShippingCode = event.currentTarget.textContent.trim();
    setShippingCode(newShippingCode === '' ? '' : newShippingCode); // Set '0' if empty
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 className="mb-0">Order Management</h3>
                <div className="bg-transparent card-header" style={{ padding: '0px' }}>
                  <div className="align-items-center row">
                    <div className="col">
                      <ul className="justify-content-end nav nav-pills">
                        <li className="nav-item">
                          <a type="button" className={`py-2 px-3 nav-link ${status === '1' ? 'active' : ''}`} onClick={() => setStatus('1')}>
                            <span className="d-none d-md-block">Chờ xác nhận ({orders.filter(order => order.status === '1').length})</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a type="button" className={`py-2 px-3 nav-link ${status === '2' ? 'active' : ''}`} onClick={() => setStatus('2')}>
                            <span className="d-none d-md-block">Đã xác nhận ({orders.filter(order => order.status === '2').length})</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a type="button" className={`py-2 px-3 nav-link ${status === '3' ? 'active' : ''}`} onClick={() => setStatus('3')}>
                            <span className="d-none d-md-block">Đang giao hàng ({orders.filter(order => order.status === '3').length})</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a type="button" className={`py-2 px-3 nav-link ${status === '4' ? 'active' : ''}`} onClick={() => setStatus('4')}>
                            <span className="d-none d-md-block">Hoàn thành ({orders.filter(order => order.status === '4').length})</span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a type="button" className={`py-2 px-3 nav-link ${status === '5' ? 'active' : ''}`} onClick={() => setStatus('5')}>
                            <span className="d-none d-md-block">Huỷ đơn hàng ({orders.filter(order => order.status === '5').length})</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <div>
                <Label for="rowsPerPage" style={{ paddingRight: '10px', paddingLeft: '25px', display: 'inline-block' }}>Hàng trên mỗi trang</Label>
                <Input
                  type="select"
                  name="rowsPerPage"
                  id="rowsPerPage"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  style={{ width: '80px', padding: '0px', height: '25px', marginRight: '10px', display: 'inline-block' }}
                >
                  {[10, 15, 20, 25, 30, 35, 40, 45, 50].map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </Input>
                <Input
                  type="text"
                  placeholder="Tìm kiếm đơn hàng"
                  value={search}
                  onChange={handleSearch}
                  className="mb-3"
                  style={{ width: '500px', display: 'inline-block', float: 'right', marginRight: '25px' }}
                />
              </div>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Mã đơn hàng</th> {/* CHO 10 KY TU CA SO VA CHU */}
                    <th scope="col">Tên khách hàng</th>
                    <th scope="col">Số điện thoại khách hàng</th>
                    <th scope="col">Địa chỉ khách hàng</th>
                    <th scope="col">Ngày tạo đơn</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Phương thức thanh toán</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(order => (
                    <tr key={order.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <a type="button" onClick={() => toggleModal(order)} style={{ color: 'blue' }}>
                              <span className="mb-0 text-sm">
                                {order.code_order}
                              </span>
                            </a>
                          </Media>
                        </Media>
                      </th>
                      <td>{order.name_customer}</td>
                      <td>{order.phone_customer}</td>
                      <td>{order.address_customer}</td>
                      <td>{moment(order.created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                      <td>{formatPrice(order.totalPrice)}</td>
                      <td>{order.payment_method_name}</td>
                      {order.status !== '3' && order.status !== '4' && order.status !== '5' && (
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              {order.status === '1' && (
                                <DropdownItem onClick={() => handleApproveOrder(order.id)}>
                                  Duyệt đơn hàng
                                </DropdownItem>
                              )}
                              {order.status === '2' && (
                                <>
                                  <DropdownItem onClick={() => handleApproveOrder(order.id)}>
                                    Giao hàng
                                  </DropdownItem>

                                  <DropdownItem onClick={() => handleCancelClick(order.id, order.code_order)}>
                                    Huỷ đơn hàng
                                  </DropdownItem>
                                </>
                              )}
                              {/* Add more conditional dropdown items based on other statuses */}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                {!search && (
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem
                        className={`${currentPage === 1 ? 'disabled' : ''
                          }`}
                      >
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(currentPage - 1);
                          }}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }).map((_, index) => (
                        <PaginationItem
                          key={index}
                          className={`${currentPage === index + 1 ? 'active' : ''}`}
                        >
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(index + 1);
                            }}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem
                        className={`${currentPage === Math.ceil(orders.length / itemsPerPage) ? 'disabled' : ''
                          }`}
                      >
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(currentPage + 1);
                          }}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>

      {/* Notification Modal */}
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={notificationModal}
        toggle={toggleNotificationModal}
        style={{
          maxWidth: '500px',
          borderRadius: '12px',
          // overflow: 'hidden',
          // border: '1px solid #ddd',
          // boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}
      >
        <ModalHeader
          toggle={toggleNotificationModal}
          style={{
            backgroundColor: notification.type === 'success' ? '#4CAF50' : '#F44336',
            color: '#fff',
            borderBottom: 'none',
            padding: '15px',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          <h3>{notification.type === 'success' ? 'Thành công!' : ''}</h3>
        </ModalHeader>
        <ModalBody
          style={{
            padding: '20px',
            backgroundColor: '#fff',
            fontSize: '16px',
            color: '#333',
            textAlign: 'center',
            lineHeight: '1.5'
          }}
        >
          {notification.message}
        </ModalBody>
        <ModalFooter
          style={{
            borderTop: 'none',
            padding: '10px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            color="secondary"
            onClick={toggleNotificationModal}
            style={{
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background-color 0.3s',
            }}
          >
            Đóng
          </Button>
        </ModalFooter>
      </Modal>

      {/* Show order detail */}
      <Modal isOpen={modalOpen} toggle={toggleModal} className="modal-xl">
        <ModalHeader toggle={toggleModal}><h1>Chi tiết đơn hàng</h1></ModalHeader>
        <ModalBody style={{ paddingTop: '0px' }}>
          {selectedOrder && (
            <div>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Ngày đặt:</strong> {moment(selectedOrder.created_at).format('DD/MM/YYYY HH:mm:ss')}</p>
                </div>
                <div className="col-md-6">
                  <p style={{ float: 'right' }}><strong>Thời gian cập nhật:</strong> {moment(selectedOrder.updated_at).format('DD/MM/YYYY HH:mm:ss')}</p>
                </div>
                <div className="col-md-6">
                  <h3 style={{ fontSize: '22px' }}>Thông tin chung</h3>
                  <p><strong>Mã đơn hàng:</strong> {selectedOrder.code_order}</p>
                  <p><strong>Tên khách hàng:</strong> {selectedOrder.name_customer}</p>
                  <p><strong>Số điện thoại:</strong> {selectedOrder.phone_customer}</p>
                  <p><strong>Địa chỉ:</strong> {selectedOrder.address_customer}</p>
                </div>
                <div className="col-md-6">
                  <h3 style={{ fontSize: '22px' }}>Thông tin người cập nhập</h3>
                  {/* <p>
                    <strong>Mã vận đơn:</strong>{' '}
                    {isEditing ? (
                      <span
                        contentEditable   // Enable text content editing
                        onBlur={handleSaveShippingCode}  // Save on blur
                        suppressContentEditableWarning  // Suppress React warnings for contentEditable
                        style={{ cursor: 'text', borderBottom: 'none', display: 'inline-block' }}  // Remove underline and keep inline display
                        onClick={(e) => e.stopPropagation()}  // Prevent span from losing focus on click
                        dangerouslySetInnerHTML={{ __html: selectedOrder.shipping_code || '&nbsp;' }}  // Ensure there's content for editing
                      />
                    ) : (
                      <>
                        <span>
                          {selectedOrder.shipping_code ? selectedOrder.shipping_code : 'N/A'}
                        </span>
                        <FontAwesomeIcon icon={faEdit} style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => setIsEditing(true)} />
                      </>
                    )}
                    {isEditing && (
                      <FontAwesomeIcon icon={faSave} style={{ marginLeft: '5px', cursor: 'pointer', color: '#007bff' }} onClick={handleSaveShippingCode} />
                    )}
                  </p> */}
                  <p>
                    <strong>Mã vận đơn:</strong>{' '}
                    {isEditing ? (
                      <span
                        contentEditable
                        onBlur={handleContentEditableBlur}
                        suppressContentEditableWarning
                        style={{ borderBottom: '1px dotted #000', cursor: 'text', minWidth: '50px', display: 'inline-block' }}
                        dangerouslySetInnerHTML={{ __html: shippingCode === '' ? 'N/A' : shippingCode }}
                      />
                    ) : (
                      <>
                        <Link to={'https://i.ghtk.vn/' + shippingCode} style={{ minWidth: '50px', display: 'inline-block' }}>
                          {shippingCode === '' ? 'N/A' : shippingCode}
                        </Link>
                        {(() => {
                          if (selectedOrder.status == 3) {
                            return (
                              <FontAwesomeIcon
                                icon={faEdit}
                                style={{ marginLeft: '15px', cursor: 'pointer' }}
                                onClick={() => setIsEditing(true)}
                              />
                            )
                          }
                        })()}
                      </>
                    )}
                    {isEditing && (
                      <FontAwesomeIcon
                        icon={faSave}
                        style={{ marginLeft: '15px', cursor: 'pointer', color: '#007bff' }}
                        onClick={handleSaveShippingCode}
                      />
                    )}
                  </p>
                  <p><strong>Phương thức thanh toán:</strong> {selectedOrder.transaction_code ? selectedOrder.transaction_code : selectedOrder.payment_method_name}</p>
                  <p><strong>Người duyệt đơn:</strong> {selectedOrder.approver_name ? selectedOrder.approver_name : 'N/A'}</p>
                  <p><strong>Người sửa đơn hàng:</strong> {selectedOrder.editor_name ? selectedOrder.editor_name : 'N/A'}</p>
                </div>
                {selectedOrder.note && (
                  <div className="col-md-12">
                    <strong>Ghi chú</strong>
                    <div dangerouslySetInnerHTML={{ __html: selectedOrder.note }} />
                  </div>
                )}
              </div>

              <h3 style={{ fontSize: '22px' }}>Thông tin sản phẩm</h3>
              <Table responsive bordered>
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">Hình ảnh</th>
                    <th>Sản phẩm</th>
                    <th className="text-center">Số lượng</th>
                    <th>Giá tiền</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                {selectedOrder?.books && (
                  <tbody>
                    {selectedOrder.books.map((book, index) => (
                      <tr key={index}>
                        <td className="text-center"><img src={book.img} width={100} height={150} alt={book.book_name} /></td>
                        <td>{book.book_name}</td>
                        <td className="text-center">{book.quantity}</td>
                        <td>{formatPrice(book.price)}</td>
                        <td>{formatPrice(book.unit_price_per_book)}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </Table>
              <div className="mt-4 py-3 px-4 d-flex justify-content-between align-items-center bg-light rounded-lg">
                <p className="h4 mb-0"><strong>Tổng tiền đơn hàng:</strong></p>
                <p className="h4 mb-0" style={{ color: '#8a2be2', fontWeight: 'bold' }}>{formatPrice(selectedOrder.totalPrice)}</p>
              </div>
            </div>
          )}
        </ModalBody>
        {selectedOrder && (
        <ModalFooter>
          {selectedOrder.status === '1' && (
            <Button color="primary" onClick={() => handleApproveOrder(selectedOrder.id)}>
              Duyệt đơn hàng
            </Button>
          )}
          {selectedOrder.status === '2' && (
            <>
              <Button color="primary" onClick={() => handleApproveOrder(selectedOrder.id)}>
                Giao hàng
              </Button>

              <Button color="danger" onClick={() => handleCancelClick(selectedOrder.id, selectedOrder.code_order)}>
                Huỷ đơn hàng
              </Button>
            </>
          )}
          <Button color="secondary" onClick={toggleModal}>Đóng</Button>
        </ModalFooter>
        )}
        <br />
      </Modal>
    </>
  );
};

export default Order;
