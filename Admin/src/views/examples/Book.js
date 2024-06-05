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
  
  const Tables = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/book');
        setBooks(response.data);
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
    const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    const [previewImg, setPreviewImg] = useState('');

    const toggleModal = () => {
        setIsbn('');
        setName('');
        setAmount('');
        setPrice('');
        setAuthor('');
        setImg(null);
        setPreviewImg('');
        setDescription('');
        setPublishYear('');
        setCategoryId('');
        setPublisherId('');
        setModal(!modal);
    };

    const addBook = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/book/add', {
                isbn,
                name,
                amount,
                price,
                author,
                img,
                description,
                publish_year,
                // created_at: new Date().toISOString(),
                category_id,
                publisher_id,
            });
            // Xóa các trường sau khi thêm thành công
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
            setErrorMessage('');
            fetchData();
            toggleModal(); // Đóng modal sau khi thêm thành công
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    // Xử lý lỗi trùng lặp
                    setErrorMessage('Sản phẩm đã tồn tại.');
                } else if (error.response.status === 422) {
                    // Xử lý lỗi xác thực
                    console.error('Lỗi xác thực:', error.response.data.errors);
                    setErrorMessage(Object.values(error.response.data.errors).flat().join('\n'));
                } else {
                    console.error('Lỗi khi thêm sản phẩm:', error);
                    setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
                }
                // Xóa thông báo lỗi sau 3 giây
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
              setImg(file.name); // Set the file object
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
                    <div>
                      <a className="btn btn-success" onClick={toggleModal}>Thêm sách</a>
                    </div>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr style={{textAlign: "center"}}>
                      <th scope="col">Hình ảnh</th>
                      <th scope="col">Isbn</th>
                      <th scope="col">Tên sách</th>
                      <th scope="col">Số lượng sách</th>
                      <th scope="col">Giá sách</th>
                      <th scope="col">Tác giả</th>
                      <th scope="col">Năm xuất bản</th>
                      <th scope="col">Ngày tạo</th>
                      <th scope="col">Nhà sản xuất</th>
                      <th scope="col">Danh mục</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                  {currentItems.map((book) => (
                    <tr style={{textAlign: "center"}}>
                      <td scope="row">
                        <Media>
                          <Media>
                            {/* <a href="#"> */}
                            <img src={require(`../../assets/img/product/${book.img}`)} width={'90px'} height={'120px'} />
                            {/* </a> */}
                          </Media>
                        </Media>
                      </td>
                      <th>{book.isbn}</th> {/* Cho khoang 8 ky tu ca so va chu */}
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <a href="#"> 
                              <span className="mb-0 text-sm">
                              {book.name}
                            </span>
                            </a>
                          </Media>
                        </Media>
                      </th>
                      <th>{book.amount}</th>
                      <th>{book.price.toLocaleString('vi-VN')} VND</th>
                      <th>{book.author}</th>
                      <th>{book.publish_year}</th>
                      <th>{book.created_at}</th>
                      <th>{book.category.name}</th>
                      <th>{book.publisher.name}</th>
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
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Action
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
                        className={`${
                          currentPage === Math.ceil(books.length / itemsPerPage) ? 'disabled' : ''
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

        <Modal isOpen={modal} toggle={toggleModal} className="modal-lg">
          <ModalHeader style={{ paddingBottom: "0px" }} toggle={toggleModal}><h2>Thêm sách mới</h2></ModalHeader>
          <ModalBody style={{ paddingTop: "0px" }}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="isbn">ISBN</Label>
                  <Input type="text" name="isbn" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
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
              <Input type="file" name="img" id="img" onChange={(e) => handleFileChange(e)} style={{marginTop: "10px"}}/>
            </FormGroup>
            <FormGroup>
              <Label for="description">Mô tả</Label>
              <Input type="textarea" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter style={{ paddingTop: "0px" }}>
            <Button color="primary" onClick={addBook}>Thêm</Button>
            <Button color="secondary" onClick={toggleModal}>Hủy</Button>
          </ModalFooter>
        </Modal>

      </>
    );
  };
  
  export default Tables;
  