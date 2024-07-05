import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderPage from "../Component/HeaderPage";
import Footer from "../Component/Footer";

function Register() {
    const [username, setUserName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(3);
    const [errorMessage, setErrorMessage] = useState('');

    const submitRegister = async () => {
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
            setRole(3);
            setErrorMessage('');
            // window.location.reload();
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



    return (
    <>
        <HeaderPage />
        {/* Page Header Start */}
        <div className="container-fluid bg-secondary mb-5">
            <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ minHeight: 300 }}
            >
                <h1 className="font-weight-semi-bold text-uppercase mb-3">Đăng ký</h1>
                {/* <div className="d-inline-flex">
                    <p className="m-0">
                        <a href="">Home</a>
                    </p>
                    <p className="m-0 px-2">-</p>
                    <p className="m-0">Contact</p>
                </div> */}
            </div>
        </div>
        {/* Page Header End */}
        {/* Contact Start */}
        <div className="container-fluid pt-5">
            <div className="text-center mb-4">
                <h2 className="section-title px-5">
                    <span className="px-2">Nếu bạn chưa có tài khoản. Hãy đăng ký tài khoản</span>
                </h2>
            </div>
            <div className="row px-xl-5" style={{ marginLeft: '250px' }}>
                <div className="col-lg-10 mb-5">
                    <div className="contact-form">
                        <div id="success" />
                        <form>
                            <div className="control-group">
                                <label for='username'>Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name='username'
                                    placeholder="Hãy nhập username của bạn"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required="required"
                                    data-validation-required-message="Vui lòng nhập username"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div className="control-group">
                                <label for='email'>Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Hãy nhập email của bạn"
                                    required="required"
                                    data-validation-required-message="Vui lòng nhập email"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div className="control-group">
                                <label for='phone_number'>Số điện thoại:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone_number"
                                    value={phone_number}
                                    name='phone_number'
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Hãy nhập số điện thoại của bạn"
                                    required="required"
                                    data-validation-required-message="Vui lòng nhập số điện thoại"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div className="control-group">
                                <label for='address'>Địa chỉ:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name='address'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Hãy nhập địa chỉ của bạn"
                                    required="required"
                                    data-validation-required-message="Vui lòng nhập địa chỉ"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div className="control-group">
                                <label for='password'>Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Hãy nhập mật khẩu của bạn"
                                    required="required"
                                    data-validation-required-message="Vui lòng nhập mật khẩu"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <input type="hidden" name='role' value={role} onChange={(e) => setRole(e.target.value)}></input>
                            <div style={{ float: 'right' }}>
                                <button
                                    className="btn btn-primary py-2 px-4"
                                    onClick={submitRegister}
                                >
                                    Đăng ký
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {/* Contact End */}
        <Footer />
    </>
    );
}

export default Register;