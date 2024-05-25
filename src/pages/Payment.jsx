import React, { useEffect, useState } from "react";
import { CartData } from "../Context/CartContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { server } from "../main";
import { Container, Image, Button, Form } from "react-bootstrap";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";

const Payment = () => {
  const { cart, subTotal, FetchCart } = CartData();
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  async function FetchAddress() {
    try {
      const { data } = await axios.get(`${server}/api/address/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setAddress(data.address);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchAddress();
  }, [params.id]);

  const PaymentCod = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/order/new/cod`,
        {
          method,
          phone: address.phone,
          address: address.address,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLoading(false);

      FetchCart();
      navigate("/ordersuccess");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const paymentOnline = async () => {
    setLoading(true);
    const {
      data: { order, orderOptions },
    } = await axios.post(
      `${server}/api/order/new/online`,
      {
        method,
        phone: address.phone,
        address: address.address,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    const options = {
      key: "rzp_test_YK4NAaFueGaHnt",
      amount: order.subTotal,
      currency: "INR",
      name: "Let's Negotiate", //your business name
      description: "India will negotiate",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api/payment`,
            {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              orderOptions,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          navigate("/ordersuccess");
          toast.success(data.message);
          FetchCart();
          setLoading(false);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },

      theme: {
        color: "#9e1163",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <h2 className="mb-4">Proceed to Payment</h2>

          <h6 className="mb-3">Products</h6>

          {cart &&
            cart.map((e, i) => (
              <div className="d-flex align-items-center mb-3" key={i}>
                <Image src={`${server}/${e.product.image}`} alt="" width={60} />
                <div className="ms-3">
                  <p className="m-0">{e.product.title}</p>
                  <p className="m-0">₹{e.product.price}</p>
                  <p className="m-0">Quantity - {e.quantity}</p>
                </div>
              </div>
            ))}

          <div className="mt-3 mb-4">
            <strong>Total Price to be Paid:</strong> ₹{subTotal}
          </div>

          {address && (
            <div className="mb-4">
              <strong>Delivery Address:</strong>
              <div>
                <span className="me-2">Address - {address.address}</span>
                <span>Phone - {address.phone}</span>
              </div>
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Select Payment Method:</Form.Label>
            <Form.Select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>Choose Payment Method</option>
              <option value="cod">Cash on Delivery (COD)</option>
              <option value="online">Online Payment</option>
            </Form.Select>
          </Form.Group>

          {cart && cart.length > 0 && (
            <Button
              onClick={method === "cod" ? PaymentCod : paymentOnline}
              disabled={!method}
            >
              Proceed to Payment <RiSecurePaymentLine className="ms-2" />
            </Button>
          )}
        </Container>
      )}
    </>
  );
};

export default Payment;
