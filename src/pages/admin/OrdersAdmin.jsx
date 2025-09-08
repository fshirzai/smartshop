import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Table, Button, Alert, Badge, Pagination, Form } from 'react-bootstrap';
import { adminAPI } from '../../api/adminAPI';
import Loader from '../../components/common/Loader';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await adminAPI.getOrders({ status: statusFilter, page });
      setOrders(data.orders);
      setPages(data.pages);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, page]);

  const updateStatus = async (id, status) => {
    try {
      await adminAPI.updateOrderStatus(id, status);
      fetchOrders();
    } catch (err) {
      setError(err?.response?.data?.message || 'Update failed');
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Orders – ShopSmart</title>
      </Helmet>

      <Container className="py-5">
        <h2 className="mb-4">Orders</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Select
          className="mb-3"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </Form.Select>

        {loading && <Loader />}
        {!loading && (
          <>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td>{o._id}</td>
                    <td>{o.user?.name}</td>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td>${o.totalPrice.toFixed(2)}</td>
                    <td>
                      <Badge bg={o.paymentStatus === 'paid' ? 'success' : 'warning'}>{o.paymentStatus}</Badge>
                    </td>
                    <td>
                      <Badge bg={o.status === 'delivered' ? 'success' : 'primary'}>{o.status}</Badge>
                    </td>
                    <td>
                      <Form.Select
                        size="sm"
                        value={o.status}
                        onChange={(e) => updateStatus(o._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </Form.Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {pages > 1 && (
              <Pagination className="justify-content-center">
                {[...Array(pages).keys()].map((x) => (
                  <Pagination.Item key={x + 1} active={x + 1 === page} onClick={() => setPage(x + 1)}>
                    {x + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default OrdersAdmin;
