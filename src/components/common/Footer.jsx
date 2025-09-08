import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-dark text-white mt-auto py-4">
    <Container>
      <Row>
        <Col md={4}>
          <h5>ShopSmart</h5>
          <p className="small">Premium electronics & more, delivered fast.</p>
        </Col>
        <Col md={4}>
          <h6>Quick Links</h6>
          <ul className="list-unstyled small">
            <li><a href="/shop" className="text-white-50">Shop</a></li>
            <li><a href="/cart" className="text-white-50">Cart</a></li>
            <li><a href="/login" className="text-white-50">Login</a></li>
          </ul>
        </Col>
        <Col md={4}>
          <h6>Help</h6>
          <ul className="list-unstyled small">
            <li><a href="/contact" className="text-white-50">Contact</a></li>
            <li><a href="/privacy" className="text-white-50">Privacy Policy</a></li>
          </ul>
        </Col>
      </Row>
      <hr className="my-3 bg-white-50" />
      <div className="text-center small text-white-50">
        © {new Date().getFullYear()} ShopSmart. All rights reserved.
      </div>
    </Container>
  </footer>
);

export default Footer;
