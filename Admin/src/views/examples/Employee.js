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

const Employee = () => { // http://127.0.0.1:8000/api/member
  const [employees, setEmpoyees] = useState([]);
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

  useEffect(() => {
    localStorage.setItem('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/member');
      setEmpoyees(response.data);
      setFiltered(response.data); // Initialize filteredBooks with all books
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredData = employees.filter((employee) =>
      employee.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
      employee.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
      employee.address.toLowerCase().includes(e.target.value.toLowerCase()) ||
      employee.phone_number.toLowerCase().includes(e.target.value.toLowerCase())
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
  const [username, setUserName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleModal = () => {
    setUserName('');
    setPhoneNumber('');
    setEmail('');
    setAddress('');
    setPassword('');
    setRole('');
    setModal(!modal);
  };

  const addData = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/register', {
        username,
        phone_number,
        email,
        address,
        password,
        role
      });
      setUserName('');
      setPhoneNumber('');
      setEmail('');
      setAddress('');
      setPassword('');
      setRole('');
      setErrorMessage('');
      fetchData();
      toggleModal(); // Đóng modal sau khi thêm thành công
      showNotificationWithTimeout('Thêm nhân viên thành công!', 'success');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          // Xử lý lỗi trùng lặp
          setErrorMessage('Email này đã tồn tại.');
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
    username: '',
    phone_number: '',
    email: '',
    address: '',
    password: '',
    role: ''
  });

  const fetchDataById = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/member/edit/${id}`);
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
      await axios.put(`http://127.0.0.1:8000/api/member/update/${Data.id}`, editedData);
      // Close popup and reset state
      setShowPopup(false);
      setData(null);
      setEditedData({});
      setErrorMessage('');
      fetchData();
      showNotificationWithTimeout('Sửa nhân viên thành công!', 'success');
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
        console.error('Lỗi khi cập nhật thông tin danh mục:', error);
      }
    }
  };


  // Delete
  const deleteData = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/member/delete/${id}`);
      // After successful deletion, refresh the publisher list or perform other actions
      fetchData();
      showNotificationWithTimeout('Xoá nhân viên thành công!', 'success');
    } catch (error) {
      console.error('Error deleting publisher:', error);
    }
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
                  <h3 className="mb-0" style={{ paddingBottom: "10px" }}>Quản lý nhân viên</h3>
                </div>
                {user.role !== 2 && (
                  <div>
                    <a className="btn btn-success" onClick={toggleModal}>Thêm nhân viên</a>
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
                  placeholder="Tìm kiếm nhân viên"
                  value={search}
                  onChange={handleSearch}
                  className="mb-3"
                  style={{ width: '500px', display: 'inline-block', float: 'right', marginRight: '25px' }}
                />
              </div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên khách hàng</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Email</th>
                    <th scope="col">Địa chỉ khách hàng</th>
                    <th scope="col">Vai trò</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((employee) => (
                    <tr key={employee.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <a href="#">
                              <span className="mb-0 text-sm">
                                {employee.username}
                              </span>
                            </a>
                          </Media>
                        </Media>
                      </th>
                      <td>{employee.phone_number}</td>
                      <td>{employee.email}</td>
                      <td>{employee.address}</td>
                      <td>
                        {(() => {
                          if (employee.role === 1) {
                            return "Quản trị viên";
                          } else if (employee.role === 2) {
                            return "Nhân viên";
                          } else {
                            return "Không rõ";
                          }
                        })()}
                      </td>
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
                                onClick={() => fetchDataById(employee.id)}
                              >
                                Sửa
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => deleteData(employee.id)}
                              >
                                Xoá
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
                      {Array.from({ length: Math.ceil(employees.length / itemsPerPage) }).map((_, index) => (
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
                        className={`${currentPage === Math.ceil(employees.length / itemsPerPage) ? 'disabled' : ''
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
        <ModalHeader style={{ paddingBottom: "0px" }} toggle={toggleModal}><h2>Thêm nhân viên</h2></ModalHeader>
        <ModalBody style={{ paddingTop: "0px" }}>
          <FormGroup>
            {errorMessage && (
              <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                {errorMessage}
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="name">Username</Label>
            <Input type="text" name="name" id="name" value={username} onChange={(e) => setUserName(e.target.value)} required />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Số điện thoại</Label>
            <Input type="text" name="phoneNumber" id="phoneNumber" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormGroup>
          <FormGroup>
            <Label for="address">Địa chỉ</Label>
            <Input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </FormGroup>
          <FormGroup>
            <Label for="role">Vai trò</Label>
            <Input type="select" name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Chọn vai trò</option>
              <option value="1" disabled>Admin</option>
              <option value="2">Nhân viên</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter style={{ paddingTop: "0px" }}>
          <Button color="primary"
            onClick={addData}
            disabled={
              !(
                username.trim() !== '' &&
                phone_number.trim() !== '' &&
                email.trim() !== '' &&
                address.trim() !== '' &&
                password.trim() !== '' &&
                role !== ''
              )
            }
          >Thêm</Button>
          <Button color="secondary" onClick={toggleModal}>Hủy</Button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={showPopup} toggle={() => setShowPopup(false)}>
        <ModalHeader style={{ paddingBottom: "0px" }} toggle={() => setShowPopup(false)}><h2>Sửa nhân viên</h2></ModalHeader>
        <ModalBody>
          <FormGroup>
            {errorMessage && (
              <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                {errorMessage}
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" value={editedData.username} onChange={(e) => setEditedData({ ...editedData, username: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Số điện thoại</Label>
            <Input type="text" name="phoneNumber" id="phoneNumber" value={editedData.phone_number} onChange={(e) => setEditedData({ ...editedData, phone_number: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={editedData.email} onChange={(e) => setEditedData({ ...editedData, email: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Địa chỉ</Label>
            <Input type="text" name="address" id="address" value={editedData.address} onChange={(e) => setEditedData({ ...editedData, address: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" value={editedData.password} onChange={(e) => setEditedData({ ...editedData, password: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="role">Vai trò</Label>
            <Input type="select" name="role" id="role" value={editedData.role} onChange={(e) => setEditedData({ ...editedData, role: e.target.value })}>
              <option value="">Chọn vai trò</option>
              <option value="1" disabled>Admin</option>
              <option value="2">Nhân viên</option>
            </Input>
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

export default Employee;
