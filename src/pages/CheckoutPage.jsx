import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';
import { orderAPI } from '../api/orderAPI';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const card = elements.getElement(CardElement);
    const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({ type: 'card', card });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    try {
      await orderAPI.createOrder({ items: cartItems, totalPrice, paymentMethod: paymentMethod.id });
      clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err?.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control defaultValue={user?.name} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" defaultValue={user?.email} required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Card</Form.Label>
            <CardElement className="form-control" />
          </Form.Group>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button type="submit" variant="success" disabled={loading}>
        {loading ? 'Processing…' : `Pay $${totalPrice.toFixed(2)}`}
      </Button>
    </Form>
  );
};

const CheckoutPage = () => (
  <>
    <Helmet>
      <title>Checkout – ShopSmart</title>
    </Helmet>
    <Container className="py-5">
      <h2>Secure Checkout</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  </>
);

export default CheckoutPage;
