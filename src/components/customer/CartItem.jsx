import PropTypes from 'prop-types';
import { Button, InputGroup, Form, Image } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

const CartItem = ({ item }) => {
  const { updateQty, removeFromCart } = useContext(CartContext);

  return (
    <tr>
      <td className="align-middle">
        <Image src={item.images[0]} width={60} height={60} rounded className="me-3" />
        {item.name}
      </td>
      <td className="align-middle">${item.price.toFixed(2)}</td>
      <td className="align-middle">
        <InputGroup size="sm" style={{ width: 120 }}>
          <Button
            variant="outline-secondary"
            onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))}
          >
            -
          </Button>
          <Form.Control
            className="text-center"
            value={item.qty}
            onChange={(e) => updateQty(item._id, Number(e.target.value))}
          />
          <Button
            variant="outline-secondary"
            onClick={() => updateQty(item._id, Math.min(item.stock, item.qty + 1))}
          >
            +
          </Button>
        </InputGroup>
      </td>
      <td className="align-middle">${(item.price * item.qty).toFixed(2)}</td>
      <td className="align-middle">
        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item._id)}>
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
