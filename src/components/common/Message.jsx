import { Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const Message = ({ variant = 'info', children, dismissible = false, timeout = 0 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (timeout > 0) {
      const timer = setTimeout(() => setShow(false), timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout]);

  if (!show) return null;

  return (
    <Alert variant={variant} dismissible={dismissible} onClose={() => setShow(false)}>
      {children}
    </Alert>
  );
};

export default Message;
