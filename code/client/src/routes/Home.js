import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Home.css";

import {
  BsSearch,
  BsPinMapFill,
  BsClockFill,
  BsClockHistory,
  BsSignTurnRightFill,
} from "react-icons/bs";

function Home() {
  const [conventions, setConventions] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get-conventions/")
      .then((res) => setConventions(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <React.Fragment>
      <InputGroup size="sm" className="mb-3 mt-1">
        <InputGroup.Text id="inputGroup-sizing-sm">
          {" "}
          <BsSearch />
        </InputGroup.Text>
        <Form.Control placeholder="Search Convention" />
      </InputGroup>
      <Row xs={1} sm={2} md={3} lg={4} className="mx-4 mb-4 g-4 d-flex">
        {conventions.map((conv) => (
          <Col
            key={conv.id}
            className="d-flex align-items-stretch justify-content-center"
          >
            <Card
              className="p-0 pb-0 shadow convcard"
              style={{ width: "22rem" }}
            >
              {/* <Card.Img variant="top" src={conv.img} className="convcardimg" /> */}
              <Card.Body>
                <Card.Title>{conv.name}</Card.Title>
              </Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <BsSignTurnRightFill />
                  &nbsp;{conv.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  <BsPinMapFill />
                  &nbsp;{conv.address}
                </ListGroup.Item>
                <ListGroup.Item>
                  <BsClockFill />
                  &nbsp;{conv.start_date}
                </ListGroup.Item>
                <ListGroup.Item>
                  <BsClockHistory />
                  &nbsp;{conv.end_date}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
}

export default Home;
