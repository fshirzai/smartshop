import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => (
  <Row className="g-4">
    {products.map((p) => (
      <Col key={p._id} xs={12} sm={6} md={4} lg={3}>
        <ProductCard product={p} />
      </Col>
    ))}
  </Row>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
