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
  Col,
  UncontrolledTooltip,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Login from "./Login";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const storedValue = localStorage.getItem('itemsPerPage');
    return storedValue !== null ? parseInt(storedValue) : 10; // Giá trị mặc định là 10 nếu không có trong localStorage
  });
  const [search, setSearch] = useState('');
  const [filtered, setFilteredBooks] = useState([]);

  useEffect(() => {
    localStorage.setItem('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/book');
      setBooks(response.data);
      setFilteredBooks(response.data); // Initialize filteredBooks with all books
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
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = books.filter((book) =>
      book.name.toLowerCase().includes(searchTerm) ||
      book.isbn.toLowerCase().includes(searchTerm) ||
      String(book.price).toLowerCase().includes(searchTerm)
    );
    setFilteredBooks(filteredData);
    setCurrentPage(1); // Reset to first page when searching
  };


  // List Pubsiher
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/publisher');
        setPublishers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // List Category
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Add
  const [modal, setModal] = useState(false);
  const [isbn, setIsbn] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');
  const [img, setImg] = useState(null);
  const [description, setDescription] = useState('');
  const [publish_year, setPublishYear] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [publisher_id, setPublisherId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [previewImg, setPreviewImg] = useState(null);

  const toggleModal = () => {
    setIsbn('');
    setName('');
    setAmount('');
    setPrice('');
    setAuthor('');
    setImg('');
    setPreviewImg('');
    setDescription('');
    setPublishYear('');
    setCategoryId('');
    setPublisherId('');
    setModal(!modal);
  };

  const addBook = async () => {
    try {
      const formData = new FormData();
      formData.append('isbn', isbn);
      formData.append('name', name);
      formData.append('amount', amount);
      formData.append('price', price);
      formData.append('author', author);
      formData.append('description', description);
      formData.append('publish_year', publish_year);
      formData.append('category_id', category_id);
      formData.append('publisher_id', publisher_id);
      if (img) {
        formData.append('img', img); // Append the file object
      }

      const response = await axios.post('http://127.0.0.1:8000/api/book/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setIsbn('');
      setName('');
      setAmount('');
      setPrice('');
      setAuthor('');
      setImg(null); // Ensure img state is reset to null after successful upload
      setPreviewImg('');
      setDescription('');
      setPublishYear('');
      setCategoryId('');
      setPublisherId('');
      setErrorMessage('');

      fetchData(); // Assuming fetchData fetches the updated list of books
      toggleModal(); // Close modal after successful addition
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setErrorMessage('Sản phẩm đã tồn tại.');
        } else if (error.response.status === 422) {
          console.error('Lỗi xác thực:', error.response.data.errors);
          setErrorMessage(Object.values(error.response.data.errors).flat().join('\n'));
        } else {
          console.error('Lỗi khi thêm sản phẩm:', error);
          setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      } else {
        console.error('Lỗi khi thêm sản phẩm:', error);
        setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file); // Set the file object
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result); // Set the preview image URL
      };
      reader.readAsDataURL(file);
    } else {
      // Clear img state if no file selected
      setImg(null);
      setPreviewImg('');
    }
  };

  // Edit
  const [showPopup, setShowPopup] = useState(false);
  const [Data, setData] = useState(null);
  const [editedData, setEditedData] = useState({
    isbn: '',
    name: '',
    amount: '',
    price: '',
    author: '',
    img: null,
    description: '',
    publish_year: '',
    category_id: '',
    publisher_id: '',
  });

  const fetchDataById = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/book/edit/${id}`);
      setShowPopup(true);
      setData(response.data);
      setEditedData(response.data); // Set edited data with fetched data
      setPreviewImg('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/book/update/${Data.id}`, {
        isbn: editedData.isbn,
        name: editedData.name,
        amount: editedData.amount,
        price: editedData.price,
        author: editedData.author,
        description: editedData.description,
        publish_year: editedData.publish_year,
        category_id: editedData.category_id,
        publisher_id: editedData.publisher_id,
        img: editedData.img // Đảm bảo gửi img như là một file hoặc một đường dẫn hợp lệ
      });

      // Xử lý sau khi cập nhật thành công
      setShowPopup(false);
      setData(null);
      setEditedData({
        isbn: '',
        name: '',
        amount: '',
        price: '',
        author: '',
        img: '',
        description: '',
        publish_year: '',
        category_id: '',
        publisher_id: '',
      });
      setPreviewImg(null);
      setErrorMessage('');
      fetchData();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Xử lý lỗi từ phản hồi của server
        setErrorMessage(error.response.data.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      } else {
        console.error('Lỗi khi cập nhật thông tin sách:', error);
      }
    }
  };


  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    setEditedData({ ...editedData, img: file }); // Lưu file vào state editedData
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result); // Hiển thị trước ảnh trên giao diện nếu cần
    };
    if (file) {
      reader.readAsDataURL(file); // Đọc file để hiển thị trước
    } else {
      setPreviewImg(null); // Đặt lại ảnh hiển thị trước nếu cần
    }
  };



  const handleEditorChange = (event, editor) => {
    const newData = editor.getData();  // Use editor.getData() to get HTML content
    setEditedData(prevState => ({
      ...prevState,
      description: newData,
    }));
  };


  // Delete
  const deleteData = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/book/delete/${id}`);
      // After successful deletion, refresh the publisher list or perform other actions
      fetchData();
    } catch (error) {
      console.error('Error deleting publisher:', error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const detailShow = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/book/show/${id}`);
      setData(response.data);
      setSelectedBook(response.data);
      setIsModalOpen(true); // Show the modal after data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
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
                  <h3 className="mb-0" style={{ paddingBottom: "10px" }}>Quản lý sách</h3>
                </div>
                {user.role !== 2 && (
                  <div>
                    <a className="btn btn-success" onClick={toggleModal}>Thêm sách</a>
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
                  placeholder="Tìm kiếm sách"
                  value={search}
                  onChange={handleSearch}
                  className="mb-3"
                  style={{ width: '500px', display: 'inline-block', float: 'right', marginRight: '25px' }}
                />
              </div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Isbn</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Số lượng sách</th>
                    <th scope="col">Giá sách</th>
                    {/* <th scope="col">Tác giả</th>
                      <th scope="col">Năm xuất bản</th>
                      <th scope="col">Ngày tạo</th>
                      <th scope="col">Nhà sản xuất</th>
                      <th scope="col">Danh mục</th> */}
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((book) => (
                    <tr key={book.id}>
                      <td scope="row">
                        <Media>
                          <Media>
                            {/* <a href="#"> */}
                            {/* <img src={require(`../../assets/img/product/${book.img}`)} width={'90px'} height={'120px'} /> */}
                            <img src={book.img} width={'90px'} height={'120px'} />
                            {/* </a> */}
                          </Media>
                        </Media>
                      </td>
                      <th>{book.isbn}</th> {/* Cho khoang 8 ky tu ca so va chu */}
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <a href="#" onClick={() => detailShow(book.id)}>
                              <span className="mb-0 text-sm">
                                {book.name}
                              </span>
                            </a>
                          </Media>
                        </Media>
                      </th>
                      <th>{book.amount}</th>
                      <th>{book.price.toLocaleString('vi-VN')} VND</th>
                      {/* <th>{book.author}</th>
                      <th>{book.publish_year}</th>
                      <th>{book.created_at}</th>
                      <th>{book.category.name}</th>
                      <th>{book.publisher.name}</th> */}
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
                                onClick={() => fetchDataById(book.id)}
                              >
                                Sửa sách
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => deleteData(book.id)}
                              >
                                Xoá sách
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
                    {Array.from({ length: Math.ceil(books.length / itemsPerPage) }).map((_, index) => (
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
                      className={`${currentPage === Math.ceil(books.length / itemsPerPage) ? 'disabled' : ''
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

      <Modal isOpen={modal} toggle={toggleModal} className="modal-xl">
        <ModalHeader style={{ paddingBottom: "0px" }} toggle={toggleModal}><h2>Thêm sách mới</h2></ModalHeader>
        <ModalBody style={{ paddingTop: "0px" }}>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label for="isbn">ISBN</Label>
                <Input type="text" name="isbn" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} maxLength={10}
                  onInput={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue.length > 10) {
                      e.target.value = inputValue.slice(0, 10); // Cắt bớt giá trị nhập vào nếu nó vượt quá 10 ký tự
                    }
                    setIsbn(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Số lượng</Label>
                <Input type="text" name="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="author">Tác giả</Label>
                <Input type="text" name="author" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="category_id">Danh mục</Label>
                <Input type="select" name="category_id" id="category_id" value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
                  <option value="">Chọn danh mục</option>
                  {/* Mapping qua danh sách các danh mục và tạo option cho mỗi danh mục */}
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="name">Tên sách</Label>
                <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="price">Giá</Label>
                <Input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="publish_year">Năm xuất bản</Label>
                <Input type="text" name="publish_year" id="publish_year" value={publish_year} onChange={(e) => setPublishYear(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="publisher_id">Nhà xuất bản</Label>
                <Input type="select" name="publisher_id" id="publisher_id" value={publisher_id} onChange={(e) => setPublisherId(e.target.value)}>
                  <option value="">Chọn nhà xuất bản</option>
                  {/* Mapping qua danh sách các nhà xuất bản và tạo option cho mỗi nhà xuất bản */}
                  {publishers.map(publisher => (
                    <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="img">Hình ảnh</Label><br />
            {previewImg && <img src={previewImg} alt="Preview" style={{ width: '100px', height: '150px' }} />}
            <Input type="file" name="img" id="img" onChange={(e) => handleFileChange(e)} style={{ marginTop: "10px" }} />
          </FormGroup>
          <FormGroup>
            <Label for="description">Mô tả</Label>
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter style={{ paddingTop: "0px" }}>
          <Button color="primary" onClick={addBook}>Thêm</Button>
          <Button color="secondary" onClick={toggleModal}>Hủy</Button>
        </ModalFooter>
      </Modal>

      {/* // Edit */}
      <Modal isOpen={showPopup} toggle={() => setShowPopup(false)} className="modal-xl">
        <ModalHeader style={{ paddingBottom: "0px" }} toggle={() => setShowPopup(false)}><h2>Sửa sách</h2></ModalHeader>
        <ModalBody style={{ paddingTop: "0px" }}>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label for="isbn">ISBN</Label>
                <Input type="text" name="isbn" id="isbn" value={editedData.isbn} onChange={(e) => setEditedData({ ...editedData, isbn: e.target.value })} maxLength={10}
                  onInput={(e) => {
                    if (e.target.value.length > 10) {
                      e.target.value = e.target.value.slice(0, 10); // Cắt bớt giá trị nhập vào nếu nó vượt quá 10 ký tự
                    }
                    setEditedData({ ...editedData, isbn: e.target.value });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Số lượng</Label>
                <Input type="text" name="amount" id="amount" value={editedData.amount} onChange={(e) => setEditedData({ ...editedData, amount: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="author">Tác giả</Label>
                <Input type="text" name="author" id="author" value={editedData.author} onChange={(e) => setEditedData({ ...editedData, author: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="category_id">Danh mục</Label>
                <Input type="select" name="category_id" id="category_id" value={editedData.category_id} onChange={(e) => setEditedData({ ...editedData, category_id: e.target.value })}>
                  <option value="">Chọn danh mục</option>
                  {/* Mapping qua danh sách các danh mục và tạo option cho mỗi danh mục */}
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="name">Tên sách</Label>
                <Input type="text" name="name" id="name" value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="price">Giá</Label>
                <Input type="text" name="price" id="price" value={editedData.price} onChange={(e) => setEditedData({ ...editedData, price: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="publish_year">Năm xuất bản</Label>
                <Input type="text" name="publish_year" id="publish_year" value={editedData.publish_year} onChange={(e) => setEditedData({ ...editedData, publish_year: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="publisher_id">Nhà xuất bản</Label>
                <Input type="select" name="publisher_id" id="publisher_id" value={editedData.publisher_id} onChange={(e) => setEditedData({ ...editedData, publisher_id: e.target.value })}>
                  <option value="">Chọn nhà xuất bản</option>
                  {/* Mapping qua danh sách các nhà xuất bản và tạo option cho mỗi nhà xuất bản */}
                  {publishers.map(publisher => (
                    <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="img">Hình ảnh</Label><br />
            {/* {previewImg ? (
                            <img src={previewImg} alt="Preview" style={{ width: '100px', height: '150px' }} />
                        ) : (
                            <img src={require(`../../assets/img/product/${editedData.img}`)} alt="Preview" style={{ width: '100px', height: '150px' }} />
                        )} */}
            {previewImg && <img src={previewImg} alt="Preview" style={{ width: '100px', height: '150px' }} />}
            {!previewImg && editedData.img && <img src={editedData.img} alt="Current" style={{ width: '100px', height: '150px' }} />}
            <Input type="file" name="img" id="img" onChange={handleEditFileChange} style={{ marginTop: "10px" }} />
          </FormGroup>
          <FormGroup>
            <Label for="description">Mô tả</Label>
            <CKEditor
              editor={ClassicEditor}
              data={editedData.description}  // Ensure editedData.description is defined or initialized
              onChange={handleEditorChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEdit}>Cập nhật</Button>{' '}
          <Button color="secondary" onClick={() => setShowPopup(false)}>Hủy</Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        toggle={closeModal}
        overlayClassName="modalOverlay"
        className="modal-xl"
      >
        <ModalHeader style={{ paddingBottom: "0px" }} toggle={closeModal}><h2>Chi tiết sách</h2></ModalHeader><br />
        {selectedBook && (
          <ModalBody style={{ paddingTop: "0px" }}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
                </FormGroup>
                <FormGroup>
                  <p><strong>Số lượng:</strong> {selectedBook.amount}</p>
                </FormGroup>
                <FormGroup>
                  <p><strong>Tác giả:</strong> {selectedBook.author}</p>
                </FormGroup>
                <FormGroup>
                  <p><strong>Danh mục:</strong> {selectedBook.category.name}</p>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <p><strong>Tên sách:</strong> {selectedBook.name}</p>
                </FormGroup>
                <FormGroup>
                  <p><strong>Giá:</strong> {selectedBook.price.toLocaleString('vi-VN')} VND</p>
                </FormGroup>
                <FormGroup>
                  <p><strong>Năm xuất bản:</strong> {selectedBook.publish_year}</p>
                </FormGroup>
                <FormGroup>
                  <p><strong>Nhà sản xuất:</strong> {selectedBook.publisher.name}</p>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <p><img src={selectedBook.img} width={'150px'} height={'200px'} /></p>
            </FormGroup>
            <FormGroup>
              <p><strong>Mô tả:</strong> <div dangerouslySetInnerHTML={{ __html: selectedBook.description }} /></p>
            </FormGroup>
          </ModalBody>
        )}
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>Đóng</Button>
        </ModalFooter>
      </Modal>

    </>
  );
};

export default Book;
