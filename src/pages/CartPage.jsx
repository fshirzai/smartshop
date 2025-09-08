import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/customer/CartItem';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);

  return (
    <>
      <Helmet>
        <title>Shopping Cart – ShopSmart</title>
      </Helmet>

      <Container className="py-5">
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <Alert variant="info">Your cart is empty. <Link to="/shop">Continue shopping</Link></Alert>
        ) : (
          <>
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center">
              <Button variant="outline-danger" onClick={clearCart}>
                Clear Cart
              </Button>
              <div>
                <h4>Total: ${totalPrice.toFixed(2)}</h4>
                <Link to="/checkout">
                  <Button variant="dark" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default CartPage;
