import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import FoodCard from "../components/FoodCard";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getAllFoodsApi } from "../services/allApi";

export default function MenuPage() {
  const [allCategory, setAllCategory] = useState([])
  const [allFoods, setAllFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([])
  const [serachKey, setSearchKey] = useState("")
  console.log(serachKey)

  useEffect(()=>{
    getAllCategory()
    getAllFoods()
  }, [serachKey])

  const getAllCategory = async ()=>{
    try {
      const result = await getAllFoodsApi(serachKey)
      const categories = result.data.map(item => item.category);
      const uniqueCategories = categories.filter((category, index) => categories.indexOf(category) === index);
      setAllCategory(uniqueCategories)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllFoods = async () => {
    try {
      const result = await getAllFoodsApi(serachKey);
      setAllFoods(result.data); // Store all foods in state
      setFilteredFoods(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterByCategory = (category)=>{
    if(category === "All"){
      setFilteredFoods(allFoods)
    }else{
      const filtered = allFoods.filter((food)=> food.category === category)
      setFilteredFoods(filtered)
    }
  }

  return (
    <>
      <Navbar />
      <Container className="py-4 mt-5">
        <Row>
          {/* Left Section */}
          <Col md={4} className="mb-4">
            <h2 className="mb-3">Explore Our Menu</h2>
            <p>Choose from a variety of delicious options crafted with the freshest ingredients.</p>
            <h5 className="mt-4">Categories</h5>
            <ListGroup>
              <ListGroup.Item action onClick={() => filterByCategory("All")}>
                All
              </ListGroup.Item>
              {allCategory.map((item, index) => (
                <ListGroup.Item key={index} action onClick={() => filterByCategory(item)}>
                  {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* Right Section */}
          <Col md={8}>
            {/* Search Box */}
           
            <Form className="mb-4 d-flex justify-content-end">
               <Form.Control onChange={(e)=>setSearchKey(e.target.value)}  type="text" placeholder="Search food..." className="w-50" />
            </Form>
            
            <Row>
              <FoodCard foods={filteredFoods} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
