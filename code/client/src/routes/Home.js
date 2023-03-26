import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import conventions from "../conventionList";
import ListGroup from "react-bootstrap/ListGroup";
import { FcOvertime } from "react-icons/fc";
import { FaSearchLocation } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { GiPathDistance } from "react-icons/gi";
import SizesExample from "./searchBar";
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
                <GiPathDistance />
                {conv.km} KM away from me!
              </ListGroup.Item>
              <ListGroup.Item>
                <FaSearchLocation />
                {conv.city}, {conv.location}
              </ListGroup.Item>
              <ListGroup.Item>
                <FcOvertime />
                {conv.starting_time}{" "}
              </ListGroup.Item>
              <ListGroup.Item>
                <GiNightSleep />
                {conv.ending_time}
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
