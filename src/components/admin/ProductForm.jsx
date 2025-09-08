import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Row, Col, Image } from 'react-bootstrap';
import { adminAPI } from '../../api/adminAPI';
import { categoryAPI } from '../../api/categoryAPI';
import { uploadToCloudinary } from '../../utils/cloudinary';

const ProductForm = ({ show, product, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      categoryAPI.getCategories().then(({ data }) => setCategories(data));
      if (product) {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setStock(product.stock);
        setCategory(product.category);
        setImages(product.images);
      } else {
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setCategory('');
        setImages([]);
      }
    }
  }, [show, product]);

  const handleImageDrop = async (e) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    if (files.length + images.length > 5) return setError('Max 5 images');
    setLoading(true);
    try {
      const urls = await Promise.all(files.map((file) => uploadToCloudinary(file)));
      setImages((prev) => [...prev, ...urls]);
    } catch (err) {
      setError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name, description, price, stock, category, images };
      if (product) await adminAPI.updateProduct(product._id, payload);
      else await adminAPI.createProduct(payload);
      onSave();
    } catch (err) {
      setError(err?.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Edit Product' : 'Add Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control required value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select required value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price ($)</Form.Label>
                <Form.Control type="number" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" required value={stock} onChange={(e) => setStock(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Images (drag & drop, max 5)</Form.Label>
            <div
              onDrop={handleImageDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border rounded p-3 text-center"
            >
              {images.length === 0 && <span className="text-muted">Drop images here</span>}
              <div className="d-flex flex-wrap gap-2">
                {images.map((url, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <Image src={url} width={100} height={100} className="object-fit-cover rounded" />
                    <Button
                      size="sm"
                      variant="danger"
                      style={{ position: 'absolute', top: 0, right: 0 }}
                      onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Cancel
            </Button>
            <Button type="submit" variant="dark" disabled={loading}>
              {loading ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;
