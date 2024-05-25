import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../main";
import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  async function FetchOrders() {
    try {
      const { data } = await axios.get(`${server}/api/order/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchOrders();
  }, []);

  return (
    <Container>
      <h1>All orders</h1>

      {orders && orders.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Method</th>
              <th>Subtotal</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

            {orders.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.method}</td>
                <td>{e.subTotal}</td>
                <td>{e.status}</td>
                <td>
                  <Button onClick={() => navigate(`/order/${e._id}`)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </thead>
        </Table>
      ) : (
        <p>No orders yet</p>
      )}
    </Container>
  );
};

export default MyOrder;
