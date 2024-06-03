import React from 'react';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';

function Login() {
    return (
        <>
            <Header />
            <section id="form">
                {/*form*/}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-1">
                            <div className="login-form">
                                {/*login form*/}
                                <h2>Đăng nhập vào tài khoản của bạn</h2>
                                <form action="#">
                                    <input type="text" placeholder="Tên tài khoản" />
                                    <input type="email" placeholder="Địa chỉ email" />
                                    {/* <span>
                                        <input type="checkbox" className="checkbox" />
                                        Keep me signed in
                                    </span> */}
                                    <button type="submit" className="btn btn-default">
                                        Đăng nhập
                                    </button>
                                </form>
                            </div>
                            {/*/login form*/}
                        </div>
                        <div className="col-sm-1">
                            <h2 className="or">OR</h2>
                        </div>
                        <div className="col-sm-4">
                            <div className="signup-form">
                                {/*sign up form*/}
                                <h2>Đăng ký người dùng mới!</h2>
                                <form action="#">
                                    <input type="text" placeholder="Tên tài khoản" />
                                    <input type="email" placeholder="Địa chỉ email" />
                                    <input type="password" placeholder="Mật khẩu" />
                                    <input type="password" placeholder="Nhập lại mật khẩu" />
                                    <button type="submit" className="btn btn-default">
                                        Đăng ký
                                    </button>
                                </form>
                            </div>
                            {/*/sign up form*/}
                        </div>
                    </div>
                </div>
            </section>
            {/*/form*/}
            <Footer />
        </>

    )
}

export default Login;