import { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Alert, Form } from 'react-bootstrap';
import { CartContext } from '../../contexts/CartContext';
import { orderAPI } from '../../api/orderAPI';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const StripeCheckout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
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
      <Form.Group className="mb-3">
        <Form.Label>Card Details</Form.Label>
        <CardElement className="form-control" />
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button type="submit" variant="success" className="w-100" disabled={loading}>
        {loading ? 'Processing…' : `Pay $${totalPrice.toFixed(2)}`}
      </Button>
    </Form>
  );
};

export default StripeCheckout;
