import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { storeContext } from "../context/StoreContext";
import { placeOrderApi } from "../services/allApi";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const token = sessionStorage.getItem("token")
  const navigate = useNavigate()
  const { getTotalCartAmount, cartData, cartItems } = useContext(storeContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    zipCode: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    cartData.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address:formData,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "authorization":`Bearer ${token}`
      }
      try {
        const response = await placeOrderApi(orderData, reqHeader)
        if(response.data){
          const {session_url}= response.data
          window.location.replace(session_url)
        }else{
          alert('error')
        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  useEffect(()=>{
     if(!token){
      navigate('/cart')
     }else if(getTotalCartAmount()===0){
      navigate('/cart')
     }

  }, [])

  return (
    <Container className="my-5">
      <Form onSubmit={placeOrder}>
        <Row>
          {/* 📝 Left Side - Shipping Form */}
          <Col md={8}>
            <Card className="shadow p-4">
              <h3 className="mb-4">Shipping Information</h3>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={onChangeHandler}
                      placeholder="Enter first name"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={onChangeHandler}
                      placeholder="Enter last name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChangeHandler}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={onChangeHandler}
                  placeholder="Enter street"
                  required
                />
              </Form.Group>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={onChangeHandler}
                      placeholder="City"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={onChangeHandler}
                      placeholder="State"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={onChangeHandler}
                      placeholder="Country"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={onChangeHandler}
                  placeholder="Enter zip code"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={onChangeHandler}
                  placeholder="Enter phone number"
                  required
                />
              </Form.Group>
            </Card>
          </Col>

          {/* 💰 Right Side - Order Summary */}
          <Col md={4}>
            <Card className="shadow p-4">
              <h4 className="mb-4">Order Summary</h4>

              <Row className="mb-2">
                <Col>Subtotal:</Col>
                <Col className="text-end">${getTotalCartAmount()}</Col>
              </Row>
              <hr />
              <Row className="mb-2">
                <Col>Delivery Fee:</Col>
                <Col className="text-end">${getTotalCartAmount() === 0 ? 0 : 2}</Col>
              </Row>
              <hr />
              <Row className="fw-bold mb-3">
                <Col>Total:</Col>
                <Col className="text-end">
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </Col>
              </Row>

              <Button type="submit" variant="success" className="w-100">
                Proceed to Payment
              </Button>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default PlaceOrder;
