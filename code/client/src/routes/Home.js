import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import conventions from "../conventionList";
import SizesExample from "./searchBar";

import {
  BsPinMapFill,
  BsClockFill,
  BsClockHistory,
  BsSignTurnRightFill,
} from "react-icons/bs";

function Home() {
  return (
    <React.Fragment>
      <br />
      <SizesExample></SizesExample>
      {conventions.map((conv) => (
        <Card key={conv.id} className=" mt-3" style={{ width: "22rem" }}>
          <Card.Img variant="top" src={conv.img} />
          <Card.Body>
            <Card.Title>{conv.title}</Card.Title>
            <ListGroup className="list-group-flush">
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
            <Button variant="outline-dark">More details</Button>
          </Card.Body>
        </Card>
      ))}
    </React.Fragment>
  );
}

export default Home;
