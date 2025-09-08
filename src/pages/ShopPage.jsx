import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Alert, Pagination } from 'react-bootstrap';
import ProductList from '../components/customer/ProductList';
import FilterSidebar from '../components/customer/FilterSidebar';
import Loader from '../components/common/Loader';
import { productAPI } from '../api/productAPI';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filter, setFilter] = useState({ keyword: '', category: '', sort: '' });

  useEffect(() => {
    setLoading(true);
    productAPI
      .getProducts({ ...filter, page })
      .then((res) => {
        setProducts(res.data.products);
        setPages(res.data.pages);
      })
      .catch((err) => setError(err?.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [filter, page]);

  return (
    <>
      <Helmet>
        <title>Shop – ShopSmart</title>
      </Helmet>

      <Container className="py-5">
        <Row>
          <Col lg={3} className="mb-4">
            <FilterSidebar onFilter={setFilter} />
          </Col>

          <Col lg={9}>
            {loading && <Loader />}
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && !error && <ProductList products={products} />}

            {pages > 1 && (
              <Pagination className="justify-content-center mt-4">
                {[...Array(pages).keys()].map((x) => (
                  <Pagination.Item key={x + 1} active={x + 1 === page} onClick={() => setPage(x + 1)}>
                    {x + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ShopPage;
