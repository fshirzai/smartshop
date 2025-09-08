import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import { productAPI } from '../../api/productAPI';
import Rating from '../common/Rating';

const ReviewForm = ({ productId }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setError('Please login to review');
    setLoading(true);
    try {
      await productAPI.createReview(productId, { rating, comment });
      setSuccess(true);
      setComment('');
      setRating(5);
    } catch (err) {
      setError(err?.response?.data?.message || 'Review failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Review posted!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <div className="d-flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                onClick={() => setRating(i + 1)}
                className={i < rating ? 'text-warning' : 'text-muted'}
              >
                ★
              </div>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="dark" disabled={loading}>
          {loading ? 'Posting…' : 'Submit Review'}
        </Button>
      </Form>
    </>
  );
};

ReviewForm.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ReviewForm;
