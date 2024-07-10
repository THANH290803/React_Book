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

const Publisher = () => { // http://127.0.0.1:8000/api/publisher
  const [publishers, setPublishers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const storedValue = localStorage.getItem('itemsPerPage');
    return storedValue !== null ? parseInt(storedValue) : 10; // Giá trị mặc định là 10 nếu không có trong localStorage
  });
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    localStorage.setItem('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/publisher');
      setPublishers(response.data);
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
    const filteredData = publishers.filter((publisher) =>
      publisher.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      publisher.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
      publisher.address.toLowerCase().includes(e.target.value.toLowerCase()) ||
      publisher.phone_number.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltered(filteredData);
    setCurrentPage(1); // Reset to first page when searching
  };

  // ADD

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleModal = () => {
    setName('');
    setPhoneNumber('');
    setEmail('');
    setAddress('');
    setModal(!modal);
  };

  const addPublisher = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/publisher/add', {
        name,
        phone_number,
        email,
        address
      });
      setName('');
      setPhoneNumber('');
      setEmail('');
      setAddress('');
      setErrorMessage('');
      fetchData();
      toggleModal(); // Close the modal after successful addition
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Handle validation errors
        console.error('Validation errors:', error.response.data.errors);
        setErrorMessage(Object.values(error.response.data.errors).flat().join('\n'));
        setShowPopup(false); // Show the popup

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage('');

        }, 3000);
      } else {
        console.error('Error adding publisher:', error);
      }
    }
  };


  // Edit 
  const [showPopup, setShowPopup] = useState(false);
  const [publisherData, setPublisherData] = useState(null);
  const [editedData, setEditedData] = useState({
    name: '',
    phone_number: '',
    email: '',
    address: ''
  });

  const fetchDataById = async (publisherId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/publisher/edit/${publisherId}`);
      setShowPopup(true);
      setPublisherData(response.data);
      setEditedData(response.data); // Set edited data with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = async () => {
    try {
      // Send edited data to API for updating
      await axios.put(`http://127.0.0.1:8000/api/publisher/update/${publisherData.id}`, editedData);
      // Close popup and reset state
      setShowPopup(false);
      setPublisherData(null);
      setEditedData({
        name: '',
        phone_number: '',
        email: '',
        address: ''
      });
      setErrorMessage('');
      fetchData();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Handle validation errors
        console.error('Validation errors:', error.response.data.errors);
        setErrorMessage(Object.values(error.response.data.errors).flat().join('\n'));
        setShowPopup(true); // Show the popup

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      } else {
        console.error('Error adding publisher:', error);
      }
    }
  };

  // Delete
  const deletePublisher = async (publisherId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/publisher/delete/${publisherId}`);
      // After successful deletion, refresh the publisher list or perform other actions
      fetchData();
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
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0" style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: "1" }}>
                  <h3 className="mb-0" style={{ paddingBottom: "10px" }}>Quản lý nhà xuất bản</h3>
                </div>
                {user.role !== 2 && (
                  <div>
                    <a className="btn btn-success" onClick={toggleModal}>Thêm nhà xuất bản</a>
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
                  placeholder="Tìm kiếm nhà xuất bản"
                  value={search}
                  onChange={handleSearch}
                  className="mb-3"
                  style={{ width: '500px', display: 'inline-block', float: 'right', marginRight: '25px' }}
                />
              </div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên nhà xuất bản</th>
                    <th scope="col">Email xuất bản</th>
                    <th scope="col">Số điện thoại nhà xuất bản</th>
                    <th scope="col">Địa chỉ nhà xuất bản</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((publisher) => (
                    <tr key={publisher.id}>
                      <td>{publisher.name}</td>
                      <td>{publisher.email}</td>
                      <td>{publisher.phone_number}</td>
                      <td>{publisher.address}</td>
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
                                onClick={() => fetchDataById(publisher.id)}
                              >
                                Sửa nhà xuất bản
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => deletePublisher(publisher.id)}
                              >
                                Xoá nhà xuất bản
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
                    {Array.from({ length: Math.ceil(publishers.length / itemsPerPage) }).map((_, index) => (
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
                      className={`${currentPage === Math.ceil(publishers.length / itemsPerPage) ? 'disabled' : ''
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

      {/* Modal để thêm nhà xuất bản mới */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader style={{ paddingBottom: "0px" }} toggle={toggleModal}><h2>Thêm nhà xuất bản</h2></ModalHeader>
        <ModalBody style={{ paddingTop: "0px" }}>
          <FormGroup>
            {errorMessage && (
              <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                {errorMessage}
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="name">Tên nhà xuất bản</Label>
            <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
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
        </ModalBody>
        <ModalFooter style={{ paddingTop: "0px" }}>
          <Button color="primary" onClick={addPublisher}>Thêm</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Hủy</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showPopup} toggle={() => setShowPopup(false)}>
        <ModalHeader style={{ paddingBottom: "0px" }} toggle={() => setShowPopup(false)}><h2>Sửa nhà xuất bản</h2></ModalHeader>
        <ModalBody>
          <FormGroup>
            {errorMessage && (
              <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                {errorMessage}
              </div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="name">Tên nhà xuất bản</Label>
            <Input type="text" name="name" id="name" value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} />
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
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEdit}>Cập nhật</Button>{' '}
          <Button color="secondary" onClick={() => setShowPopup(false)}>Hủy</Button>
        </ModalFooter>
      </Modal>

    </>
  );
};

export default Publisher;
