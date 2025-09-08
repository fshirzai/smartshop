import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const NotFoundPage = () => (
  <Container className="text-center py-5">
    <h1 className="display-1">404</h1>
    <p className="lead">Page not found.</p>
    <Link to="/">
      <Button variant="dark">Go Home</Button>
    </Link>
  </Container>
);

export default NotFoundPage;
