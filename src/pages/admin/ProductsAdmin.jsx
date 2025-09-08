import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Button, Table, Badge, Alert, Pagination, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../api/adminAPI';
import Loader from '../../components/common/Loader';
import ProductForm from '../../components/admin/ProductForm';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await adminAPI.getProducts({ keyword, page });
      setProducts(data.products);
      setPages(data.pages);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword, page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await adminAPI.deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError(err?.response?.data?.message || 'Delete failed');
    }
  };

  const handleSave = () => {
    setShowModal(false);
    setEditing(null);
    fetchProducts();
  };

  return (
    <>
      <Helmet>
        <title>Manage Products – ShopSmart</title>
      </Helmet>

      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Products</h2>
          <Button onClick={() => { setEditing(null); setShowModal(true); }}>+ Add Product</Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
          />
        </InputGroup>

        {loading && <Loader />}
        {!loading && (
          <>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img src={p.images[0]} alt={p.name} width={50} height={50} className="object-fit-cover rounded" />
                    </td>
                    <td>{p.name}</td>
                    <td>
                      <Badge bg="secondary">{p.category}</Badge>
                    </td>
                    <td>${p.price}</td>
                    <td>{p.stock}</td>
                    <td>{p.rating?.toFixed(1)} ⭐</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => { setEditing(p); setShowModal(true); }}
                      >
                        Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {pages > 1 && (
              <Pagination className="justify-content-center">
                {[...Array(pages).keys()].map((x) => (
                  <Pagination.Item key={x + 1} active={x + 1 === page} onClick={() => setPage(x + 1)}>
                    {x + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </>
        )}

        <ProductForm show={showModal} product={editing} onClose={() => setShowModal(false)} onSave={handleSave} />
      </Container>
    </>
  );
};

export default ProductsAdmin;
