import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { server } from "../main";

const OrderPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  async function fetchOrder() {
    try {
      const { data } = await axios.get(`${server}/api/order/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setOrder(data.order);
    } catch (error) {
      console.log(error);
      setError(error.message || "An error occurred while fetching the order.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
        <div className="text-center">
          <Button onClick={() => navigate("/orders")}>Go Back</Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      {order && (
        <Container>
          <h3 className="text-center my-2 text-danger">
            OrderId - {order._id}
          </h3>

          <h4 className="text-center my-2 text-primary">Products</h4>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items &&
                order.items.map((e, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.product?.title || "N/A"}</td>
                    <td>₹{e.product?.price || "N/A"}</td>
                    <td>
                      {e.product?.image ? (
                        <Link to={`/product/${e.product._id}`}>
                          <img
                            src={`${server}/${e.product.image}`}
                            alt={e.product.title}
                            width={60}
                          />
                        </Link>
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{e.quantity}</td>
                    <td>₹ {e.product ? e.product.price * e.quantity : "N/A"}</td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <h5 className="text-center my-2 text-primary">
            Subtotal - ₹{order.subTotal}
          </h5>
          <h5 className="text-center my-2 text-primary">
            Payment Method - {order.method}
          </h5>
          <h5 className="text-center my-2 text-primary">
            Status - {order.status}
          </h5>
          {order.paymentInfo && (
            <h5 className="text-center my-2 text-primary">
              paymentId - {order.paymentInfo}
            </h5>
          )}
          <p className="text-center">
            <Button onClick={() => navigate("/orders")}>Go Back</Button>
          </p>
        </Container>
      )}
    </>
  );
};

export default OrderPage;
