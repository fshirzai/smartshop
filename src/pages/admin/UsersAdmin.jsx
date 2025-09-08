import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Table, Button, Alert, Badge, Pagination } from 'react-bootstrap';
import { adminAPI } from '../../api/adminAPI';
import Loader from '../../components/common/Loader';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await adminAPI.getUsers(page);
      setUsers(data.users);
      setPages(data.pages);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const toggleRole = async (id, role) => {
    try {
      await adminAPI.updateUserRole(id, role === 'admin' ? 'user' : 'admin');
      fetchUsers();
    } catch (err) {
      setError(err?.response?.data?.message || 'Update failed');
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Users – ShopSmart</title>
      </Helmet>

      <Container className="py-5">
        <h2 className="mb-4">Users</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading && <Loader />}
        {!loading && (
          <>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <Badge bg={u.role === 'admin' ? 'dark' : 'secondary'}>{u.role}</Badge>
                    </td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => toggleRole(u._id, u.role)}
                      >
                        Toggle Role
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
      </Container>
    </>
  );
};

export default UsersAdmin;
