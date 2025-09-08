export const ROLES = { USER: 'user', ADMIN: 'admin' };

export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ORDERS: '/orders',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    PRODUCTS: '/admin/products',
    ORDERS: '/admin/orders',
    USERS: '/admin/users',
  },
};

export const PRICE_RANGE = [0, 1000]; // for filters
export const PAGE_SIZE = 12; // products per page
export const REVIEW_LIMIT = 5; // reviews per load-more
