import { Table, Badge, Button } from 'react-bootstrap';
import { adminAPI } from '../../api/adminAPI';

const UserTable = ({ users, onUpdate }) => {
  const toggleRole = async (id, role) => {
    try {
      await adminAPI.updateUserRole(id, role === 'admin' ? 'user' : 'admin');
      onUpdate();
    } catch (err) {
      alert(err?.response?.data?.message || 'Update failed');
    }
  };

  return (
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
              <Button size="sm" variant="outline-secondary" onClick={() => toggleRole(u._id, u.role)}>
                Toggle Role
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
