import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { adminAPI } from '../../api/adminAPI';
import Loader from '../../components/common/Loader';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Filler);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminAPI
      .getDashboard()
      .then(({ data }) => setStats(data))
      .catch((err) => setError(err?.response?.data?.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const { salesChart, topProducts, totalSales, totalOrders, totalUsers } = stats;

  return (
    <>
      <Helmet>
        <title>Admin Dashboard – ShopSmart</title>
      </Helmet>

      <Container className="py-5">
        <h2 className="mb-4">Dashboard</h2>

        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column justify-content-center">
                <div className="fs-2 fw-bold">${totalSales.toFixed(2)}</div>
                <div className="text-muted">Total Sales</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column justify-content-center">
                <div className="fs-2 fw-bold">{totalOrders}</div>
                <div className="text-muted">Total Orders</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column justify-content-center">
                <div className="fs-2 fw-bold">{totalUsers}</div>
                <div className="text-muted">Total Users</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={8}>
            <Card>
              <Card.Header>Sales Trend (Last 30 Days)</Card.Header>
              <Card.Body>
                <Line
                  data={salesChart}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card>
              <Card.Header>Top 5 Products</Card.Header>
              <Card.Body>
                <Bar
                  data={topProducts}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
