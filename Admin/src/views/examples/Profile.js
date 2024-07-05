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
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const token = localStorage.getItem('token');
  const initialUserData = JSON.parse(localStorage.getItem('user'));
  const [userData, setUserData] = useState(initialUserData);
  const [updatedUserData, setUpdatedUserData] = useState({
    ...initialUserData,
  });
  const [isEditing, setIsEditing] = useState(false); // State để quản lý chế độ chỉnh sửa

  useEffect(() => {
    setUpdatedUserData({ ...userData });
  }, [userData]);

  // Xử lý khi người dùng bấm nút chỉnh sửa
  const handleEdit = () => {
    setIsEditing(true); // Cho phép chỉnh sửa
  };

  // Xử lý khi người dùng bấm nút cập nhật
  const handleUpdate = async () => {
    try {
      // Gửi dữ liệu đã chỉnh sửa lên server
      await axios.put(`http://127.0.0.1:8000/api/member/update/${userData.id}`, updatedUserData);

      // Cập nhật lại thông tin người dùng trong localStorage và state
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);

      setIsEditing(false); // Tắt chế độ chỉnh sửa
      window.location.reload();
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    }
  };

  return (
    <>
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Xin chào!</h1>
                <p className="text-white mt-0 mb-5">
                  Đây là trang hồ sơ của bạn. Bạn có thể thấy được thông tin chi tiết của bạn
                </p>
                <Button
                  color="info"
                  onClick={isEditing ? handleUpdate : handleEdit}
                >
                  {isEditing ? 'Lưu thay đổi' : 'Chỉnh sửa'}
                </Button>

              </Col>
            </Row>
          </Container>
        </div>
      </>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Kết nối
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Tin nhắn
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      {/* <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div> */}
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {userData.username}
                    {/* <span className="font-weight-light">, 27</span> */}
                  </h3>
                  <div className="h4 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {(() => {
                      if (userData.role === 1) {
                        return 'Admin';
                      } else if (userData.role === 2) {
                        return 'Nhân viên';
                      } else {
                        return 'Unknown';
                      }
                    })()}
                  </div>
                  {/* <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Tài khoản</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      onClick={handleEdit}
                      size="sm"
                    >
                      Cài đặt
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin người dùng
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Địa chỉ Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            placeholder="Email của bạn"
                            type="email"
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Số điện thoại
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData.phone_number}
                            id="input-first-name"
                            placeholder="Số điện thoại của bạn"
                            type="text"
                            onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Vai trò
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={
                              (() => {
                                if (userData.role === 1) {
                                  return 'Admin';
                                } else if (userData.role === 2) {
                                  return 'Nhân viên';
                                } else {
                                  return 'Unknown';
                                }
                              })()
                            }
                            id="input-last-name"
                            placeholder="Vai trò"
                            type="text"
                            readOnly={true}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Địa chỉ
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData.address}
                            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                            id="input-address"
                            placeholder="Địa chỉ của bạn"
                            type="text"
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {/* <hr className="my-4" /> */}
                  {/* Address */}
                  {/* <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Địa chỉ
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            id="input-address"
                            placeholder="Địa chỉ của bạn"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div> */}
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Thông tin thêm</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Thông tin thêm</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Đôi lời về bạn..."
                        rows="4"
                        type="textarea"
                        disabled={!isEditing}
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
