import React from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserData } from "../Context/UserContext";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { user } = UserData(); // Assuming you have a user object available from context
const navigate = useNavigate()
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          {user ? (
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white text-center">
                <FaUserCircle size={50} />
                <h3 className="mt-2">My Account</h3>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Username:</strong> {user.username}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {user.email}
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Link  className="me-2">
                    <Button onClick={user.role !== "admin" ? navigate("/") : navigate("/admin/dashboard")} variant="primary">Dashboard</Button>
                  </Link>
                  <Link to="/orders">
                    <Button variant="secondary">Orders</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <div className="text-center">
              <p>Please log in to view your account details.</p>
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
