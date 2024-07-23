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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from "./Login";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';

const Payment = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const storedValue = localStorage.getItem('itemsPerPage');
    return storedValue !== null ? parseInt(storedValue) : 10; // Giá trị mặc định là 10 nếu không có trong localStorage
  });
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [notificationModal, setNotificationModal] = useState(false);

  const toggleNotificationModal = () => setNotificationModal(!notificationModal);



  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/paymentMethod');
      setPaymentMethods(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error('Error fetching the payment methods:', error);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredData = paymentMethods.filter((paymentMethod) =>
      paymentMethod.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFiltered(filteredData);
    setCurrentPage(1); // Reset to first page when searching
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

  // Add

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleModal = () => {
    setName('');
    setModal(!modal);
  };

  const addPayment = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/paymentMethod/add', { name });
      setName('');
      setErrorMessage('');
      fetchPaymentMethods();
      toggleModal(); // Đóng modal sau khi thêm thành công
      showNotificationWithTimeout('Thêm phương thức thanh toán thành công!', 'success');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          // Xử lý lỗi trùng lặp
          setErrorMessage('Phương thức thanh toán đã tồn tại.');
        } else if (error.response.status === 422) {
          // Xử lý lỗi xác thực
          console.error('Lỗi xác thực:', error.response.data.errors);
          setErrorMessage(Object.values(error.response.data.errors).flat().join('\n'));
        } else {
          console.error('Lỗi khi thêm phương thức thanh toán:', error);
          setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
        // Xóa thông báo lỗi sau 3 giây
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      } else {
        console.error('Lỗi khi thêm phương thức thanh toán:', error);
        setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    }
  };

  // Edit
  const [showPopup, setShowPopup] = useState(false);
  const [Data, setData] = useState(null);
  const [editedData, setEditedData] = useState({
    name: '',
  });

  const fetchDataById = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/paymentMethod/edit/${id}`);
      setShowPopup(true);
      setData(response.data);
      setEditedData(response.data); // Set edited data with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = async () => {
    try {
      // Send edited data to API for updating
      await axios.put(`http://127.0.0.1:8000/api/paymentMethod/update/${Data.id}`, editedData);
      // Close popup and reset state
      setShowPopup(false);
      setData(null);
      setEditedData({});
      setErrorMessage('');
      fetchPaymentMethods();
      showNotificationWithTimeout('Cập nhập phương thức thanh toán thành công!', 'success');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Hiển thị thông báo lỗi từ phản hồi của server
        setErrorMessage(error.response.data.message);
        // Đặt hẹn giờ để xóa thông báo sau 3 giây
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      } else {
        // Xử lý các loại lỗi khác
        console.error('Lỗi khi cập nhật thông tin phương thức thanh toán:', error);
      }
    }
  };

  // Delete
  const deleteData = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/paymentMethod/delete/${id}`);
      // After successful deletion, refresh the publisher list or perform other actions
      fetchPaymentMethods();
      showNotificationWithTimeout('Xoá phương thức thanh toán thành công!', 'success');
    } catch (error) {
      console.error('Error deleting publisher:', error);
    }
  };

  // Xử lý nhấn nút xóa
  const handleDeleteClick = (paymentId, paymentName) => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: `Bạn có chắc chắn muốn xóa phương thức thanh toán '${paymentName}' không?`,
      customUI: ({ title, message, onClose }) => (
        <div className='custom-ui'>
          <h1 className='modal-title'>{title}</h1>
          <br />
          <p className='modal-message'>{message}</p>
          <div className="modal-footer">
            <button
              onClick={() => {
                // Đóng hộp thoại và thực hiện xóa khi nhấn nút "Xóa"
                deleteData(paymentId);
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
              Xóa
            </button>
            <button
              onClick={onClose} // Đóng hộp thoại khi nhấn nút "Hủy"
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
              Hủy
            </button>
          </div>
        </div>
      )
    });
  };



  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Nếu không có user, điều hướng tới trang login
  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0" style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: "1" }}>
                  <h3 className="mb-0" style={{ paddingBottom: "10px" }}>Quản lý phương thức thanh toán</h3>
                </div>
                {user.role !== 2 && (
                  <div>
                    <a className="btn btn-success" onClick={toggleModal}>Thêm phương thức thanh toán</a>
                  </div>
                )}
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
                  placeholder="Tìm kiếm tên phương thức thanh toán"
                  value={search}
                  onChange={handleSearch}
                  className="mb-3"
                  style={{ width: '500px', display: 'inline-block', float: 'right', marginRight: '25px' }}
                />
              </div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên phương thức thanh toán</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((method, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <a href="#">
                              <span className="mb-0 text-sm">
                                {method.name}
                              </span>
                            </a>
                          </Media>
                        </Media>
                      </th>
                      <td className="text-right">
                        {user.role !== 2 && (
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
                              <DropdownItem
                                onClick={() => fetchDataById(method.id)}
                              >
                                Sửa phương thức thanh toán
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => handleDeleteClick(method.id, method.name)}
                              >
                                Xoá phương thức thanh toán
                              </DropdownItem>
                              {/* <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem> */}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        )}
                      </td>
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
                      {Array.from({ length: Math.ceil(paymentMethods.length / itemsPerPage) }).map((_, index) => (
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
                        className={`${currentPage === Math.ceil(paymentMethods.length / itemsPerPage) ? 'disabled' : ''
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

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader style={{ paddingBottom: "0px" }} toggle={toggleModal}><h2>Thêm phương thức thanh toán</h2></ModalHeader>
        <ModalBody style={{ paddingTop: "0px" }}>
          <FormGroup>
            {errorMessage && (
              <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                {errorMessage}
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="name">Tên phương thức thanh toán</Label>
            <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </FormGroup>
        </ModalBody>
        <ModalFooter style={{ paddingTop: "0px" }}>
          <Button color="primary" onClick={addPayment}
            disabled={
              !(
                name.trim() !== ''
              )
            }
          >Thêm</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Hủy</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showPopup} toggle={() => setShowPopup(false)}>
        <ModalHeader style={{ paddingBottom: "0px" }} toggle={() => setShowPopup(false)}><h2>Sửa phương thức thanh toán</h2></ModalHeader>
        <ModalBody>
          <FormGroup>
            {errorMessage && (
              <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                {errorMessage}
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="name">Tên phương thức thanh toán</Label>
            <Input type="text" name="name" id="name" value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEdit}>Cập nhật</Button>{' '}
          <Button color="secondary" onClick={() => setShowPopup(false)}>Hủy</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Payment;
