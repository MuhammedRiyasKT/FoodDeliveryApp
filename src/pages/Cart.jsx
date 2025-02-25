import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Form } from "react-bootstrap";
import { storeContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import SERVER_URL from '../services/serverUrl'

const Cart = () => {
 const navigate = useNavigate()
 const {cartItems, addToCart, removeFromCart, cartData, getTotalCartAmount} = useContext(storeContext)

  return (
    <>
    <Navbar />
    <Container className="py-5">
      <Row>
      <Col md={8}>
      <Card className="shadow-lg rounded-4">
        <Card.Body>
          <h3 className="text-center mb-4">🛒 Your Cart</h3>

          {cartData.length > 0 ? (
            <ListGroup variant="flush">
              {cartData.map((item, index)=>{
                if(cartItems[item._id]>0){
                  return(
                    <ListGroup.Item key={index} className="mb-3 rounded-3 shadow-sm">
                  <Row className="align-items-center">
                    {/* 🖼 Product Image */}
                    <Col xs={3} className="text-center">
                      <img
                        src={`${SERVER_URL}/images/${item?.image}`}
                        alt={item.name}
                        className="img-fluid rounded-circle border border-2"
                        style={{ width: "70px", height: "70px", objectFit: "cover" }}
                      />
                    </Col>

                    {/* 📝 Product Details */}
                    <Col>
                      <h5 className="fw-bold">{item.name}</h5>
                      <p className="text-muted mb-1">Price: ${item.price.toFixed(2)}</p>
                      <p className="text-primary">Category: {item.category}</p>
                    </Col>

                    {/* 🔢 Quantity Display */}
                    <Col xs="auto">
                      <h6>Quantity: {cartItems[item._id]}</h6>
                    </Col>

                    {/* 💰 Total Price */}
                    <Col xs="auto">
                      <h6 className="fw-bold">Total: ${(item.price * cartItems[item._id]).toFixed(2)}</h6>
                    </Col>

                    {/* ❌ Remove Button */}
                    <Col xs="auto">
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(item._id)}>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                  )
                }
              })}
            </ListGroup>
          ) : (
            <p className="text-center text-muted">Your cart is empty 🛍️</p>
          )}
        </Card.Body>
      </Card>
    </Col>

        {/* 📋 Order Summary Section */}
        <Col md={4}>
          <Card className="shadow">
            <Card.Body>
              <h4 className="mb-4">Summary</h4>
              <Row>
                <Col>Subtotal:</Col>
                <Col className="text-right">${getTotalCartAmount()}</Col><br />
              </Row>
              <hr />
              <Row>
                <Col>Delivery Fee:</Col>
                <Col className="text-right">{getTotalCartAmount()===0?0:2}</Col><br />
              </Row>
              <hr />
              <Row>
                <Col className="fw-bold">Total:</Col>
                <Col className="text-right">${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</Col><br />
              </Row>

              {/* 🎟️ Promo Code Input */}
              <Form className="mt-3">
                <Form.Group className="mb-3">
                  <Form.Label>Promo Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter promo code" />
                </Form.Group>
                <Button variant="primary" className="w-100">
                  Apply Promo Code
                </Button>
              </Form>

              {/* ✅ Checkout Button */}
              <Button onClick={()=>navigate('/order')} variant="success" className="w-100 mt-4">
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Cart;
