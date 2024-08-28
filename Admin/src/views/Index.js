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
import { useState, useEffect } from "react";
// import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import axios from "axios";
import moment from "moment";
import "moment/locale/vi";

// Utility function to generate gradient color
const generateGradient = (ctx, color) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  return gradient;
};

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState('data1');
  const [monthlyRevenueData, setMonthlyRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Doanh thu',
        data: [],
        backgroundColor: '#5e72e4',
        borderColor: '#5e72e4',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/statistical')
      .then(response => {
        const data = response.data.monthly_revenue; // Access monthly_revenue array

        // Create a list of all months in the year
        const allMonths = Array.from({ length: 12 }, (_, i) => moment().month(i).format('MMMM YYYY'));

        // Create a map to store revenue data
        const revenueMap = data.reduce((acc, item) => {
          const monthLabel = moment(`${item.year}-${item.month}`, 'YYYY-M').format('MMMM YYYY');
          acc[monthLabel] = parseInt(item.total_revenue, 10);
          return acc;
        }, {});

        // Generate labels and data points for all months
        const labels = allMonths.map(month => `Tháng ${moment(month, 'MMMM YYYY').format('M')} / ${moment(month, 'MMMM YYYY').format('YYYY')}`);
        const dataPoints = allMonths.map(month => revenueMap[month] || 0);

        setMonthlyRevenueData({
          labels: labels,
          datasets: [
            {
              label: 'Doanh thu',
              data: dataPoints,
              backgroundColor: '#5e72e4',
              borderColor: '#5e72e4',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const [monthlyOrderCountData, setMonthlyOrderCountData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Số lượng sản phẩm đã bán ra',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)', // Màu đường với gradient
        backgroundColor: generateGradient(document.createElement('canvas').getContext('2d'), 'rgba(75, 192, 192, 0.2)'), // Gradient màu nền
        borderWidth: 4,
        pointBorderColor: '#fff', // Màu viền điểm
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Màu nền điểm
        pointRadius: 6, // Kích thước điểm
        pointHoverRadius: 8, // Kích thước điểm khi hover
        pointStyle: 'circle', // Kiểu điểm
        fill: true, // Hiển thị nền dưới đường
        tension: 0.5, // Làm mềm đường
        shadowOffsetX: 2, // Đổ bóng cho điểm
        shadowOffsetY: 2,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowBlur: 10,
      },
    ],
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/statistical')
      .then(response => {
        const data = response.data.monthly_order_counts;

        // Create a list of all months in the year
        const allMonths = Array.from({ length: 12 }, (_, i) => moment().month(i).format('MMMM YYYY'));

        // Create a map to store order count data
        const orderCountMap = data.reduce((acc, item) => {
          const monthLabel = moment(`${item.year}-${item.month}`, 'YYYY-M').format('MMMM YYYY');
          acc[monthLabel] = item.total_orders;
          return acc;
        }, {});

        // Generate labels and data points for all months
        const labels = allMonths.map(month => `Tháng ${moment(month, 'MMMM YYYY').format('M')} / ${moment(month, 'MMMM YYYY').format('YYYY')}`);
        const dataPoints = allMonths.map(month => orderCountMap[month] || 0);

        setMonthlyOrderCountData({
          labels: labels,
          datasets: [
            {
              label: 'Số lượng sản phẩm đã bán ra',
              data: dataPoints,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: generateGradient(document.createElement('canvas').getContext('2d'), 'rgba(75, 192, 192, 0.2)'),
              borderWidth: 4,
              pointBorderColor: '#fff',
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointRadius: 6,
              pointHoverRadius: 8,
              pointStyle: 'circle',
              fill: true,
              tension: 0.5,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 10,
            },
          ],
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data('data' + index);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12" style={{ paddingBottom: '30px' }}>
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Tổng quát
                    </h6>
                    <h2 className="text-white mb-0">Doanh thu</h2>
                  </div>
                  {/* <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Tháng</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Tuần</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div> */}
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={monthlyRevenueData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              return `${context.dataset.label}: ${context.raw.toLocaleString('vi-VN')} VND`;
                              
                            },
                          },
                        },
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: 'Tháng',
                          },
                          ticks: {
                            callback: (value) => moment(value, 'MMMM YYYY').format('MMM YYYY'),
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Doanh thu (VND)',
                          },
                          ticks: {
                            callback: (value) => `${value.toLocaleString('vi-VN')} VND`,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <br />
          <br />
          <Col xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Hiệu suất
                    </h6>
                    <h2 className="mb-0">Số lượng sản phẩm đã bán ra</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={monthlyOrderCountData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: '#fff',
                            boxWidth: 12,
                            font: {
                              size: 14,
                              weight: 'bold',
                            },
                          },
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              return `${context.dataset.label}: ${context.raw.toLocaleString('vi-VN')} sản phẩm`;
                            },
                            title: (tooltipItems) => {
                              return tooltipItems[0].label;
                            },
                          },
                          backgroundColor: '#333',
                          bodyFont: {
                            size: 14,
                            weight: 'bold',
                          },
                          titleFont: {
                            size: 16,
                            weight: 'bold',
                          },
                        },
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: 'Tháng',
                            color: '#fff',
                            font: {
                              size: 14,
                              weight: 'bold',
                            },
                          },
                          grid: {
                            display: false,
                          },
                          ticks: {
                            color: '#fff',
                            callback: (value) => moment(value, 'MMMM YYYY').format('MMM YYYY'),
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Số lượng sản phẩm',
                            color: '#fff',
                            font: {
                              size: 14,
                              weight: 'bold',
                            },
                          },
                          grid: {
                            color: '#333',
                            borderDash: [5, 5],
                          },
                          ticks: {
                            display: true, // Ensure this is set to true
                            color: '#fff',
                            callback: (value) => `${value.toLocaleString('vi-VN')}`,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
