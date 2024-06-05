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
  
  const Employee = () => {
    const [employees, setEmpoyees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/member');
        setEmpoyees(response.data);
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
    const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
            await axios.post('http://127.0.0.1:8000/api/member/add', { 
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
      } catch (error) {
      console.error('Error deleting publisher:', error);
      }
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
                <CardHeader className="border-0" style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: "1" }}>
                      <h3 className="mb-0" style={{ paddingBottom: "10px" }}>Quản lý nhân viên</h3>
                    </div>
                    <div>
                      <a className="btn btn-success" onClick={toggleModal}>Thêm nhân viên</a>
                    </div>
                </CardHeader>
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
                    <tr>
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
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem
                        className={`${
                          currentPage === 1 ? 'disabled' : ''
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
                        className={`${
                          currentPage === Math.ceil(employees.length / itemsPerPage) ? 'disabled' : ''
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
              </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader style={{paddingBottom: "0px"}} toggle={toggleModal}><h2>Thêm nhân viên</h2></ModalHeader>
        <ModalBody style={{paddingTop: "0px"}}>
          <FormGroup>
                {errorMessage && (
                <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                  {errorMessage}
                </div>
              )}
          </FormGroup>
          <FormGroup>
            <Label for="name">Username</Label>
            <Input type="text" name="name" id="name" value={username} onChange={(e) => setUserName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Số điện thoại</Label>
            <Input type="text" name="phoneNumber" id="phoneNumber" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Địa chỉ</Label>
            <Input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
          <Label for="role">Vai trò</Label>
          <Input type="select" name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Chọn vai trò</option>
            <option value="1">Admin</option>
            <option value="2">Nhân viên</option>
          </Input>
        </FormGroup>
        </ModalBody>
        <ModalFooter style={{paddingTop: "0px"}}>
          <Button color="primary" onClick={addData}>Thêm</Button>
          <Button color="secondary" onClick={toggleModal}>Hủy</Button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={showPopup} toggle={() => setShowPopup(false)}>
        <ModalHeader style={{paddingBottom: "0px"}} toggle={() => setShowPopup(false)}><h2>Sửa nhân viên</h2></ModalHeader>
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
              <option value="1">Admin</option>
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
  