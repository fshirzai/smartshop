import { Spinner, Container } from 'react-bootstrap';

const Loader = ({ size = 5, color = 'dark' }) => (
  <Container className="d-flex justify-content-center align-items-center py-5">
    <Spinner
      animation="border"
      role="status"
      style={{ width: `${size}rem`, height: `${size}rem` }}
      variant={color}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </Container>
);

export default Loader;
