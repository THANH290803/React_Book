import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderPage from "../Component/HeaderPage";
import Footer from "../Component/Footer";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password,
            });
            console.log(response.data);

            if (response.data.user.role === 1 || response.data.user.role === 2) {
                console.error('User with role 1 or 2 is not allowed to login.');
                // Handle notifying the user that they are not allowed to login
                return;
            };

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.user.role)
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            // Xử lý lỗi đăng nhập, ví dụ: hiển thị thông báo lỗi cho người dùng
        }
    };


    return (<>
        <HeaderPage />
        {/* Page Header Start */}
        <div className="container-fluid bg-secondary mb-5">
            <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ minHeight: 300 }}
            >
                <h1 className="font-weight-semi-bold text-uppercase mb-3">Đăng nhập</h1>
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
                    <span className="px-2">Đăng nhập vào tài khoản của bạn</span>
                </h2>
            </div>
            <div className="row px-xl-5" style={{ marginLeft: '480px' }}>
                <div className="col-lg-7 mb-5">
                    <div className="contact-form">
                        <div id="success" />
                        <form onSubmit={handleSubmit}>
                            <div className="control-group">
                                <label for='email'>Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder="Hãy nhập email của bạn"
                                    required="required"
                                    data-validation-required-message="Vui lòng nhập email"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div className="control-group">
                                <label for='password'>Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    placeholder="Hãy nhập mật khẩu của bạn"
                                    required="required"
                                    data-validation-required-message="Vui lòng nhập mật khẩu"
                                />
                                <p className="help-block text-danger" />
                            </div>
                            <div style={{ float: 'right' }}>
                                <button
                                    className="btn btn-primary py-2 px-4"
                                    type="submit"
                                >
                                    Đăng nhập
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

export default Login;