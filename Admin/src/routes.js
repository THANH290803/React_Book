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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Category from "views/examples/Category";
import Icons from "views/examples/Icons.js";
import Publisher from "views/examples/Publisher";
import Book from "views/examples/Book";
import Order from "views/examples/Order";
import Payment from "views/examples/Payment";
import Customer from "views/examples/Customer";
import Employee from "views/examples/Employee";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  {
    path: "/employee",
    name: "Quản lý nhân viên",
    icon: "ni ni-single-02 text-yellow",
    component: <Employee />,
    layout: "/admin",
  },
  {
    path: "/Customer",
    name: "Quản lý khách hàng",
    icon: "ni ni-circle-08 text-pink",
    component: <Customer />,
    layout: "/admin",
  },
  {
    path: "/publisher",
    name: "Quản lý nhà xuất bản",
    icon: "ni ni-badge text-purple",
    component: <Publisher />,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Quản lý danh mục",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Category />,
    layout: "/admin",
  },
  {
    path: "/book",
    name: "Quản lý sách",
    icon: "ni ni-books text-orange",
    component: <Book />,
    layout: "/admin",
  },
  {
    path: "/order",
    name: "Quản lý đơn hàng",
    icon: "ni ni-bag-17 text-green",
    component: <Order />,
    layout: "/admin",
  },
  {
    path: "/payment_method",
    name: "Phương thức thanh toán",
    icon: "ni ni-money-coins text-blue",
    component: <Payment />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    // name: "User Profile",
    // icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/login",
    // name: "Login",
    // icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },
];
export default routes;
