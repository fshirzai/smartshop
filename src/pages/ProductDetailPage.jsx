import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Alert, Button, Badge } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import ReviewForm from '../components/customer/ReviewForm';
import Loader from '../components/common/Loader';
import { productAPI } from '../api/productAPI';
import { useContext } from 'react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    productAPI
      .getProduct(id)
      .then(({ data }) => setProduct(data))
      .catch(() => {
        setError('Product not found');
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return null;

  return (
    <>
      <Helmet>
        <title>{product.name} – ShopSmart</title>
      </Helmet>

      <Container className="py-5">
        <Row>
          <Col md={6}>
            <img src={product.images[0]} alt={product.name} className="img-fluid rounded" />
          </Col>
          <Col md={6}>
            <h1>{product.name}</h1>
            <Badge bg="primary" className="mb-2">{product.category}</Badge>
            <p className="lead">{product.description}</p>
            <h3>${product.price}</h3>
            <p className="text-muted">In stock: {product.stock}</p>
            <Button
              variant="dark"
              size="lg"
              onClick={() => {
                addToCart(product);
                navigate('/cart');
              }}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h4>Customer Reviews</h4>
            <ReviewForm productId={id} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetailPage;
