import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdminNav = () => (
  <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
    <Container>
      <LinkContainer to="/admin">
        <Navbar.Brand>ShopSmart Admin</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ms-auto">
          <LinkContainer to="/admin/dashboard">
            <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/products">
            <Nav.Link>Products</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/orders">
            <Nav.Link>Orders</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/users">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default AdminNav;
