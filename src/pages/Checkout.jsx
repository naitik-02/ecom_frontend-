import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Card, Row } from "react-bootstrap";
import { server } from "../main";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import Loader from "../Components/Loader";

const Checkout = () => {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function fetchAddress() {
    setloading(true)
    try {
      const { data } = await axios.get(`${server}/api/address/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setAddress(data.alladdress);
      setloading(false)
    } catch (error) {
      console.log(error);
      setloading(false)
    }
  }

  async function deleteAddress(id) {
    try {
      await axios.delete(`${server}/api/address/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success("Address deleted successfully");
      fetchAddress();
    } catch (error) {
      toast.error("Failed to delete address");
    }
  }

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
   <>
   {
    loading ? <Loader/> : (
      <Container>
      <h1>Choose Address</h1>
      <Button onClick={handleShow} className="mb-3">Add Address</Button>
      <Row className="justify-content-center">
        {address && address.length > 0 ? (
          address.map((e, i) => (
            <Card key={i} className="mb-3" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Address {i + 1}</Card.Title>
                <Card.Text>Address: {e.address}</Card.Text>
                <Card.Text>Phone: {e.phone}</Card.Text>
                <Button onClick={() => navigate(`/payment/${e._id}`)}>Use Address</Button>
                <Button variant="danger" onClick={() => deleteAddress(e._id)} className="ms-2"><MdDelete /></Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No Address Yet</p>
        )}
      </Row>

      <AddressModal show={show} handleClose={handleClose} fetchAddress={fetchAddress} />
    </Container>
    )
   }
   </>
  );
};

export default Checkout;

const AddressModal = ({ show, handleClose, fetchAddress }) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${server}/api/address/new`, { address, phone }, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success("Address added successfully");
      setAddress("");
      setPhone("");
      fetchAddress();
      handleClose();
    } catch (error) {
      toast.error("Failed to add address");
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" placeholder="Enter Phone" minLength={10} maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </Form.Group>
          <Button type="submit">Add Address</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
