import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loader from './components/common/Loader';
import PrivateRoute from './components/common/PrivateRoute';

/* ---------- lazy pages ---------- */
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/* ---------- admin ---------- */
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProductsAdmin = lazy(() => import('./pages/admin/ProductsAdmin'));
const OrdersAdmin = lazy(() => import('./pages/admin/OrdersAdmin'));
const UsersAdmin = lazy(() => import('./pages/admin/UsersAdmin'));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main className="min-vh-100">
            <Suspense fallback={<Loader />}>
              <Routes>
                {/* ----- public ----- */}
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/page/:pageNumber" element={<ShopPage />} />
                <Route path="/search/:keyword" element={<ShopPage />} />
                <Route path="/search/:keyword/page/:pageNumber" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* ----- protected customer ----- */}
                <Route element={<PrivateRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/orders" element={<OrderHistoryPage />} />
                </Route>

                {/* ----- protected admin ----- */}
                <Route element={<PrivateRoute admin />}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/products" element={<ProductsAdmin />} />
                  <Route path="/admin/orders" element={<OrdersAdmin />} />
                  <Route path="/admin/users" element={<UsersAdmin />} />
                </Route>

                {/* ----- 404 ----- */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
