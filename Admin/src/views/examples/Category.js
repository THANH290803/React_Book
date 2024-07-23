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
  Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, CardBody,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Login from "./Login";


const Category = () => {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [notificationModal, setNotificationModal] = useState(false);

  const toggleNotificationModal = () => setNotificationModal(!notificationModal);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle notifications
  const showNotificationWithTimeout = (message, type) => {
    setNotification({ message, type });
    setNotificationModal(true);
    setTimeout(() => {
      setNotificationModal(false);
      setNotification({ message: '', type: '' });
    }, 3500); // 3 giây
  };

  const toggleModal = () => {
    setName('');
    setErrorMessage('');
    setModal(!modal);
  };

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const addCategory = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/category/add', { name });
      setName('');
      setErrorMessage('');
      fetchData();
      toggleModal();
      showNotificationWithTimeout('Thêm danh mục thành công!', 'success');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage('Danh mục đã tồn tại.');
        } else if (error.response.status === 422) {
          setErrorMessage(Object.values(error.response.data.errors).flat().join('\n'));
        } else {
          setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
      } else {
        setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    }
  };

  const editCategory = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/category/update/${editedCategory.id}`, { name: editedCategory.name });
      fetchData();
      toggleEditModal();
      showNotificationWithTimeout('Sửa danh mục thành công!', 'success');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error('Lỗi khi cập nhật thông tin danh mục:', error);
      }
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/category/delete/${id}`);
      fetchData();
      showNotificationWithTimeout('Xoá danh mục thành công!', 'success');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Nếu không có user, điều hướng tới trang login
  if (!user) {
    return <Login />;
  }

  const columns = [
    {
      name: 'TÊN DANH MỤC',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: '',
      cell: row => (
        <>
          {user.role !== 2 && (
            <UncontrolledDropdown>
              <DropdownToggle color="secondary" size="sm">
                <FontAwesomeIcon icon={faEllipsisV} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => { setEditedCategory(row); toggleEditModal(); }} style={{ color: 'orange' }}>
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Sửa danh mục
                </DropdownItem>
                <DropdownItem onClick={() => deleteCategory(row.id)} style={{ color: 'red' }}>
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Xóa danh mục
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];


  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const customStyles = {
    header: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#007bff',
        color: '#fff',
      },
    },
    rows: {
      style: {
        fontSize: '14px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f1f1f1',
        },
      },
    },
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
                  <h3 className="mb-0" style={{ paddingBottom: "10px" }}>Quản lý danh mục</h3>
                </div>
                {user.role !== 2 && (
                  <div>
                    <a className="btn btn-success" onClick={toggleModal}>Thêm danh mục</a>
                  </div>
                )}
              </CardHeader>
              <CardBody>
                <Input
                  type="text"
                  placeholder="Tìm kiếm danh mục"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="mb-3"
                  style={{ width: '500px', float: 'right' }}
                />
                <DataTable
                  columns={columns}
                  data={filteredCategories}
                  pagination
                  noHeader
                  responsive
                  customStyles={customStyles} // Nếu có customStyles khác
                />
              </CardBody>
              {/* <CardFooter className="py-4">
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
                      {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }).map((_, index) => (
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
                          currentPage === Math.ceil(categories.length / itemsPerPage) ? 'disabled' : ''
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
              </CardFooter> */}
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
        <ModalHeader toggle={toggleModal}>
          <h2>Thêm danh mục</h2>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            {errorMessage && (
              <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                {errorMessage}
              </div>
            )}
            <Label for="name">Tên danh mục</Label>
            <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addCategory}
            disabled={
              !(
                name.trim() !== ''
              )
            }
          >Thêm</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Hủy</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>
          <h2>Sửa danh mục</h2>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            {errorMessage && (
              <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px' }}>
                {errorMessage}
              </div>
            )}
            <Label for="editName">Tên danh mục</Label>
            <Input type="text" name="editName" id="editName" value={editedCategory ? editedCategory.name : ''} onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={editCategory}>Cập nhật</Button>{' '}
          <Button color="secondary" onClick={toggleEditModal}>Hủy</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Category;