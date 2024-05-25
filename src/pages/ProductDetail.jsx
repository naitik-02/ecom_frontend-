import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { server } from "../main";
import { useParams } from "react-router-dom";
import { CartData } from "../Context/CartContext";
import { UserData } from "../Context/UserContext";
import Loader from "../Components/Loader";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const { addToCart } = CartData();
  const { isAuth, user } = UserData();

  async function fetchProduct() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/product/${params.id}`);
      setProduct(data.product);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function updateStock() {
    try {
      const { data } = await axios.put(
        `${server}/api/product/${params.id}`,
        { stock },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);

      fetchProduct();
      setStock("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const addToCartHandler = async (product) => {
    await addToCart(product);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="mt-4">
      {product && (
        <Row className="mt-5">
          <Col md={6}>
            <Image src={`${server}/${product.image}`} alt="" fluid />
          </Col>
          <Col md={6}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>category - {product.category}</p>
            <p>Price - ₹ {product.price}</p>
            {user.role === "admin" && <p>stock - {product.stock}</p>}
            {user.role === "admin" && (
              <>
                <input
                  type="number"
                  placeholder="update Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
                <Button className="mx-2" onClick={updateStock}>
                  Update Stock
                </Button>
              </>
            )}
            <br />
            {product.stock === 0 ? (
              <p className="text-danger">Out of Stock</p>
            ) : (
              <>
                {isAuth ? (
                  <Button
                    onClick={() => addToCartHandler(product._id)}
                    variant="secondary"
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <p className="text-danger">
                    Please Login to Add this product to your cart
                  </p>
                )}
              </>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetails;
