import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { authAPI } from '../api/authAPI';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(user?.name || '');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirm) return setError('Passwords do not match');
    setLoading(true);
    try {
      const { data } = await authAPI.updateProfile({ name, password });
      setUser(data);
      setMessage('Profile updated');
      setPassword('');
      setConfirm('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile – ShopSmart</title>
      </Helmet>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2>My Profile</h2>

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control required value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email (read-only)</Form.Label>
                <Form.Control type="email" value={email} disabled />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password (leave blank to keep current)</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              </Form.Group>

              <Button type="submit" variant="dark" disabled={loading}>
                {loading ? 'Updating…' : 'Update Profile'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
