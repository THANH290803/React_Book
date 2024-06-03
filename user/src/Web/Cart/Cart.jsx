import React from 'react';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { Link } from 'react-router-dom';

function Cart() {
    return (
        <>
            <Header />
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li>
                                <Link to={'/'}>Trang chủ</Link>
                            </li>
                            <li className="active">Giỏ hàng</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Sản phẩm</td>
                                    <td className="description" />
                                    <td className="price">Giá tiền</td>
                                    <td className="quantity">Số lượng</td>
                                    <td className="total">Tổng giá</td>
                                    <td />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="cart_product">
                                        <a href="">
                                            <img src="images/cart/one.png" alt="" />
                                        </a>
                                    </td>
                                    <td className="cart_description">
                                        <h4>
                                            <a href="">Colorblock Scuba</a>
                                        </h4>
                                        <p>Web ID: 1089772</p>
                                    </td>
                                    <td className="cart_price">
                                        <p>$59</p>
                                    </td>
                                    <td className="cart_quantity">
                                        <div className="cart_quantity_button">
                                            <a className="cart_quantity_down" href="">
                                                {" "}
                                                -{" "}
                                            </a>
                                            <input
                                                className="cart_quantity_input"
                                                type="text"
                                                name="quantity"
                                                defaultValue={1}
                                                autoComplete="off"
                                                size={2}
                                            />
                                            <a className="cart_quantity_up" href="">
                                                {" "}
                                                +{" "}
                                            </a>
                                        </div>
                                    </td>
                                    <td className="cart_total">
                                        <p className="cart_total_price">$59</p>
                                    </td>
                                    <td className="cart_delete">
                                        <a className="cart_quantity_delete" href="">
                                            <i className="fa fa-times" />
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="cart_product">
                                        <a href="">
                                            <img src="images/cart/two.png" alt="" />
                                        </a>
                                    </td>
                                    <td className="cart_description">
                                        <h4>
                                            <a href="">Colorblock Scuba</a>
                                        </h4>
                                        <p>Web ID: 1089772</p>
                                    </td>
                                    <td className="cart_price">
                                        <p>$59</p>
                                    </td>
                                    <td className="cart_quantity">
                                        <div className="cart_quantity_button">
                                            
                                            <a className="cart_quantity_down" href="">
                                                {" "}
                                                -{" "}
                                            </a>
                                            <input
                                                className="cart_quantity_input"
                                                type="text"
                                                name="quantity"
                                                defaultValue={1}
                                                autoComplete="off"
                                                size={2}
                                            />
                                            <a className="cart_quantity_up" href="">
                                                {" "}
                                                +{" "}
                                            </a>
                                        </div>
                                    </td>
                                    <td className="cart_total">
                                        <p className="cart_total_price">$59</p>
                                    </td>
                                    <td className="cart_delete">
                                        <a className="cart_quantity_delete" href="">
                                            <i className="fa fa-times" />
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="cart_product">
                                        <a href="">
                                            <img src="images/cart/three.png" alt="" />
                                        </a>
                                    </td>
                                    <td className="cart_description">
                                        <h4>
                                            <a href="">Colorblock Scuba</a>
                                        </h4>
                                        <p>Web ID: 1089772</p>
                                    </td>
                                    <td className="cart_price">
                                        <p>$59</p>
                                    </td>
                                    <td className="cart_quantity">
                                        <div className="cart_quantity_button">
                                            
                                            <a className="cart_quantity_down" href="">
                                                {" "}
                                                -{" "}
                                            </a>
                                            <input
                                                className="cart_quantity_input"
                                                type="text"
                                                name="quantity"
                                                defaultValue={1}
                                                autoComplete="off"
                                                size={2}
                                            />
                                            <a className="cart_quantity_up" href="">
                                                {" "}
                                                +{" "}
                                            </a>
                                        </div>
                                    </td>
                                    <td className="cart_total">
                                        <p className="cart_total_price">$59</p>
                                    </td>
                                    <td className="cart_delete">
                                        <a className="cart_quantity_delete" href="">
                                            <i className="fa fa-times" />
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>{" "}
            {/*/#cart_items*/}
            <section id="do_action">
                <div className="container">
                    <div className="heading">
                        <h3>Bạn thích làm gi tiếp theo?</h3>
                        <p>
                            Xin vui lòng kiểm tra lại các thông tin chi tiết và tiến hành thanh toán cho đơn hàng.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="total_area">
                                <ul>
                                    <li>
                                        Tạm tính <span>$59</span>
                                    </li>
                                    {/* <li>
                                        Eco Tax <span>$2</span>
                                    </li>
                                    <li>
                                        Shipping Cost <span>Free</span>
                                    </li> */}
                                    <li>
                                        Tổng tiền <span>$61</span>
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href="">
                                    Cập nhập
                                </a>
                                <Link to={'/checkout'} className="btn btn-default check_out">
                                    Xác nhận
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*/#do_action*/}
            <Footer />
        </>

    )
}

export default Cart;