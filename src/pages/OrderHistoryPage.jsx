import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Table, Badge } from 'react-bootstrap';
import { orderAPI } from '../api/orderAPI';
import Loader from '../components/common/Loader';
import { useAuth } from '../hooks/useAuth';

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI
      .getMyOrders()
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>My Orders – ShopSmart</title>
      </Helmet>

      <Container className="py-5">
        <h2>Order History</h2>

        {loading && <Loader />}
        {!loading && orders.length === 0 && <p>You have not placed any orders yet.</p>}

        {!loading && orders.length > 0 && (
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o._id}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>${o.totalPrice.toFixed(2)}</td>
                  <td>
                    <Badge bg={o.status === 'delivered' ? 'success' : 'warning'}>{o.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default OrderHistoryPage;
