import { useState } from 'react';
import { Table, Badge, Button, Collapse } from 'react-bootstrap';
import { adminAPI } from '../../api/adminAPI';

const OrderTable = ({ orders, onUpdate }) => {
  const [open, setOpen] = useState({});

  const toggleRow = (id) => setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  const updateStatus = async (id, status) => {
    try {
      await adminAPI.updateOrderStatus(id, status);
      onUpdate();
    } catch (err) {
      alert(err?.response?.data?.message || 'Update failed');
    }
  };

  return (
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
          <>
            <tr key={o._id} onClick={() => toggleRow(o._id)} style={{ cursor: 'pointer' }}>
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
                <Button size="sm" variant="outline-secondary" onClick={(e) => { e.stopPropagation(); toggleRow(o._id); }}>
                  {open[o._id] ? 'Hide' : 'View'}
                </Button>
              </td>
            </tr>
            <tr>
              <td colSpan={7} className="p-0">
                <Collapse in={open[o._id]}>
                  <div className="p-3 bg-light">
                    <h6>Items</h6>
                    <Table size="sm">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {o.items.map((i) => (
                          <tr key={i.product}>
                            <td>{i.name}</td>
                            <td>{i.qty}</td>
                            <td>${i.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="d-flex justify-content-end gap-2">
                      <Button size="sm" onClick={() => updateStatus(o._id, 'pending')} disabled={o.status === 'pending'}>
                        Mark Pending
                      </Button>
                      <Button size="sm" onClick={() => updateStatus(o._id, 'shipped')} disabled={o.status === 'shipped'}>
                        Mark Shipped
                      </Button>
                      <Button size="sm" onClick={() => updateStatus(o._id, 'delivered')} disabled={o.status === 'delivered'}>
                        Mark Delivered
                      </Button>
                    </div>
                  </div>
                </Collapse>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderTable;
