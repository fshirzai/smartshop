import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ProductCard from '../components/customer/ProductCard';
import Loader from '../components/common/Loader';
import { productAPI } from '../api/productAPI';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    productAPI
      .getFeatured()
      .then(({ data }) => setProducts(data))
      .catch((err) => setError(err?.response?.data?.message || 'Network error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>ShopSmart – Premium Electronics & More</title>
        <meta name="description" content="Discover top-rated gadgets with lightning-fast delivery." />
      </Helmet>

      <Container className="py-5">
        <h1 className="mb-4">Featured Products</h1>

        {loading && <Loader />}
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="g-4">
          {products.map((p) => (
            <Col key={p._id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
