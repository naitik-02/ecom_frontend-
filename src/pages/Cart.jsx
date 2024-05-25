import React, { useState } from 'react';
import { Button, Container, Table, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartData } from '../Context/CartContext';
import { server } from '../main';
import { MdDelete } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";

const Cart = () => {

  
  const { cart, subTotal, updateCart, removeFromCart } = CartData();
  const navigate = useNavigate();

  const updateCartHandler = async (action, id) => {
    await updateCart(action, id);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Shopping Cart</h2>
      {cart && cart.length > 0 ? (
        <Card className="shadow-sm">
          <Card.Body>
            <Table striped bordered hover responsive className="text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((e, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.product.title}</td>
                    <td>₹{e.product.price}</td>
                    <td>
                      <Link to={`/product/${e.product._id}`}>
                        <img
                          src={`${server}/${e.product.image}`}
                          style={{ width: "60px", height: "60px", objectFit: "cover" }}
                          alt=""
                        />
                      </Link>
                    </td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        onClick={() => updateCartHandler("dec", e._id)}
                        className="mx-2"
                      >
                        -
                      </Button>
                      {e.quantity}
                      <Button
                        variant="outline-secondary"
                        onClick={() => updateCartHandler("inc", e._id)}
                        className="mx-2"
                      >
                        +
                      </Button>
                    </td>
                    <td>₹{e.product.price * e.quantity}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(e._id)}
                      >
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ) : (
        <p className="text-center">No Items in Cart</p>
      )}

      {subTotal > 0 && (
        <Card className="shadow-sm mt-4">
          <Card.Body className="text-center">
            <h3>Subtotal</h3>
            <p>Total price to be paid: ₹{subTotal}</p>
            <Button
              variant="success"
              onClick={() => navigate("/checkout")}
              className="d-flex align-items-center justify-content-center"
            >
              Checkout <IoBagCheckOutline className="ms-2" />
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Cart;
