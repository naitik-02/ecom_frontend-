import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { UserData } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaKey } from 'react-icons/fa';

const Verify = () => {
  const navigate = useNavigate();
  const { VerifyUser } = UserData();
  const [otp, setOtp] = useState('');

  async function HandleSubmit(e) {
    e.preventDefault();
    await VerifyUser(Number(otp), navigate);
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <div className="text-center mb-4">
                <FaKey size={50} />
                <h2 className="mt-3">Verify OTP</h2>
              </div>
              <Form onSubmit={HandleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicOtp">
                  <Form.Label>Enter your OTP</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Verify;
