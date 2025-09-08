import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from './Loader';

const PrivateRoute = ({ children, admin = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  if (admin && user.role !== 'admin') return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;
