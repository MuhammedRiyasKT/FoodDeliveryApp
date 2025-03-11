import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-left mb-3 mb-md-0">
            <h5>Food Delivery</h5>
            <p>Delicious meals delivered to your doorstep. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa aperiam quaerat aspernatur perferendis?.</p>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#" className="text-light text-decoration-none">Menu</a></li>
              <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <h5>Follow Us</h5>
            <div>
              <a href="#" className="text-light me-3 text-decoration-none"><i class="fa-brands fa-facebook"></i></a>
              <a href="#" className="text-light me-3 text-decoration-none"><i class="fa-brands fa-instagram"></i></a>
              <a href="#" className="text-light text-decoration-none"><i class="fa-brands fa-twitter"></i></a>
            </div>
          </Col>
        </Row>
        <hr className="my-3 border-light" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; 2025 Food Delivery. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
