import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { server } from "../main";
import { ProductData } from "../Context/ProductContext";
import axios from "axios";
import toast from "react-hot-toast";

const ProductCard = ({ product,admin }) => {
  const navigate = useNavigate();
  const {FetchAdminProduct} = ProductData()

  async function deleteHandler(){
    if(confirm("Are you sure want to delete this Product ")){
      try {
        const {data} = await axios.delete(`${server}/api/product/${product._id}`,{
          headers:{
            token : localStorage.getItem("token")
          }
        })
  
        toast.success(data.message)
        FetchAdminProduct()
      } catch (error) {
        console.error("Error deleting product:", error.response ? error.response.data : error.message)
      }
    }
  }

  return (
    <Card className="shadow-sm mb-3" style={{ width: "14rem" }}>
      <Card.Img variant="top" src={`${server}/${product.image}`} style={{ height: "200px", objectFit: "cover" }} />
      <Card.Body>
        <Card.Title className="fw-bold mb-2" style={{ fontSize: "1rem" }}>{product.title}</Card.Title>
        <Card.Text style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>{product.description}</Card.Text>
        <Card.Text className="fw-bold mb-0">₹{product.price}</Card.Text>
        <Button onClick={() => navigate(`/product/${product._id}`)} variant="primary" size="sm" className="mt-2">View Product</Button>
       { admin && <Button onClick={deleteHandler} variant="danger" size="sm" className="mt-2 ">Delete</Button>}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
