import React from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import conventions from "../conventionList";
import "./Home.css";

import {
  BsSearch,
  BsPinMapFill,
  BsClockFill,
  BsClockHistory,
  BsSignTurnRightFill,
} from "react-icons/bs";

function Home() {
  return (
    <React.Fragment>
      <InputGroup size="sm" className="mb-3 mt-1">
        <InputGroup.Text id="inputGroup-sizing-sm">
          {" "}
          <BsSearch />
        </InputGroup.Text>
        <Form.Control placeholder="Search Convention" />
      </InputGroup>
      <Row
        xs={1}
        sm={2}
        md={3}
        lg={4}
        className="g-4 d-flex justify-content-center"
      >
        {conventions.map((conv) => (
          <Col key={conv.id} className="d-flex align-items-stretch">
            <Card
              className="p-0 pb-0 shadow convcard"
              style={{ width: "22rem" }}
            >
              <Card.Img variant="top" src={conv.img} className="convcardimg" />
              <Card.Body>
                <Card.Title>{conv.title}</Card.Title>
              </Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <BsSignTurnRightFill />
                  &nbsp;{conv.km}km away from you
                </ListGroup.Item>
                <ListGroup.Item>
                  <BsPinMapFill />
                  &nbsp;{conv.city}, {conv.location}
                </ListGroup.Item>
                <ListGroup.Item>
                  <BsClockFill />
                  &nbsp;{conv.starting_time}
                </ListGroup.Item>
                <ListGroup.Item>
                  <BsClockHistory />
                  &nbsp;{conv.ending_time}
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
