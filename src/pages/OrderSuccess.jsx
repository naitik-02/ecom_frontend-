import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center" style={{ marginTop: '50px' }}>
      <div className="d-flex flex-column align-items-center">
        <FaCheckCircle size={80} color="green" />
        <h1 className="mt-4">Order Placed Successfully!</h1>
        <p className="mt-2">Thank you for your purchase. Your order is being processed and will be delivered soon.</p>
        <Button variant="success" onClick={() => navigate('/')} className="mt-3">
          Continue Shopping
        </Button>
      </div>
    </Container>
  );
};

export default OrderSuccess;
