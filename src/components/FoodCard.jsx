import React, { useContext } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { storeContext } from "../context/StoreContext";
import SERVER_URL from '../services/serverUrl'

const FoodCard = ({ foods }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(storeContext);

  return (
    <div className="container py-4">
      <div className="row g-4 justify-content-center">
        {foods.length > 0 ? (
          foods.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Card className="shadow-lg h-100 border-0 rounded-4 hover-shadow" style={{ transition: "0.3s" }}>
                <Card.Img
                  variant="top"
                  src={`${SERVER_URL}/images/${item?.image}`}
                  alt={item.name}
                  className="rounded-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <h5 className="fw-bold">{item.name.slice(0, 15)}...</h5>
                  <p className="text-muted small">{item.description.slice(0, 50)}</p>

                  <div className="d-flex justify-content-between align-items-center my-2">
                    <Badge bg="success" className="px-2">${item.price}..</Badge>
                    <Badge bg="info" className="px-2">{item.category}...</Badge>
                  </div>

                  {!cartItems[item._id] ? (
                    <Button
                      variant="primary"
                      className="w-100 mt-auto d-flex align-items-center justify-content-center gap-2"
                      onClick={() => addToCart(item._id)}
                    >
                      <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                    </Button>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <Button
                        variant="danger"
                        className="rounded-circle"
                        style={{ width: "35px", height: "35px" }}
                        onClick={() => removeFromCart(item._id)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </Button>

                      <span className="fw-bold">{cartItems[item._id]}</span>

                      <Button
                        variant="success"
                        className="rounded-circle"
                        style={{ width: "35px", height: "35px" }}
                        onClick={() => addToCart(item._id)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className="text-center text-danger mt-5 fs-5">Foods not found</div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
