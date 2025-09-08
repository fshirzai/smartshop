import PropTypes from 'prop-types';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../common/Rating';

const ProductCard = ({ product }) => (
  <Card className="h-100 shadow-sm">
    <Link to={`/product/${product._id}`}>
      <Card.Img
        variant="top"
        src={product.images[0]}
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
    </Link>
    <Card.Body className="d-flex flex-column">
      <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
        <Card.Title className="fs-6">{product.name}</Card.Title>
      </Link>
      <Card.Text className="text-muted small flex-grow-1">{product.description}</Card.Text>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <Badge bg="primary">{product.category}</Badge>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span className="fw-bold">${product.price.toFixed(2)}</span>
        <span className="small text-muted">Stock: {product.stock}</span>
      </div>
    </Card.Body>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
