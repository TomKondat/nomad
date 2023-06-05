import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../styles.css";
import {
  BsSearch,
  BsPinMapFill,
  BsClockFill,
  BsClockHistory,
  BsSignTurnRightFill,
} from "react-icons/bs";
import { MdAddToPhotos } from "react-icons/md";
import { Button, Container, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { LoadGeocoding } from "../LoadGeocoding";

function Home() {
  const [search, setSearch] = useState("");
  const [conventions, setConventions] = useState([]);
  const [conventionsInit, setConventionsInit] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getConvention() {
    await axios
      .get("/api/get-conventions/")
      .then((res) => {
        setConventionsInit(res.data);
        setConventions(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getConvention();
  }, []);

  useEffect(() => {
    const calculateDistances = async () => {
      const conventionsWithDistance = [];
      const conventionsWithoutDistance = [];

      for (const conv of conventionsInit) {
        try {
          const distance = await LoadGeocoding(conv.address);
          if (distance !== null) {
            conv.distance = distance;
            conventionsWithDistance.push(conv);
          } else {
            conv.distance = null; // Set distance as null for conventions without a valid location
            conventionsWithoutDistance.push(conv);
          }
        } catch (error) {
          console.log(
            `Error calculating distance for convention: ${conv.name}`,
            error
          );
          conv.distance = null; // Set distance as null for conventions with errors
          conventionsWithoutDistance.push(conv);
        }
      }

      const sortedConventions = [
        ...conventionsWithDistance.sort((a, b) => a.distance - b.distance),
        ...conventionsWithoutDistance,
      ];

      setConventions(sortedConventions);
    };

    calculateDistances();
  }, [conventionsInit]);

  useEffect(() => {
    const conventionList = conventionsInit.filter((convention) => {
      if (
        search === "" ||
        convention.name.toLowerCase().includes(search.toLowerCase())
      ) {
        return convention;
      }
      return null;
    });
    setConventions(conventionList);
  }, [search, conventionsInit]);

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs={10}>
            <InputGroup size="sm" className="mb-3 mt-1">
              <InputGroup.Text id="inputGroup-sizing-sm">
                {" "}
                <BsSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search Convention"
              />
            </InputGroup>
          </Col>
          <Col xs={1}>
            <LinkContainer to="/AddConvention">
              <Button variant="light">
                <MdAddToPhotos />
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
      {loading ? (
        // make this div in the center of the page and in the middle of the page
        <div
          className="d-flex justify-content-center align-items-center purpleSpinner"
          style={{ marginTop: "150px" }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{ width: "4rem", height: "4rem", borderWidth: "0.4em" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : conventions.length === 0 ? (
        <Container>
          <Alert variant="danger">
            <Alert.Heading>Oh no!</Alert.Heading>
            <p>It seems that there are no conventions here.</p>
            <p>Maybe check back later?</p>
          </Alert>
        </Container>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="mx-4 mb-4 g-4 d-flex">
          {conventions.map((conv) => (
            <LinkContainer key={conv.id} to={`conventionpage/${conv.id}`}>
              <Col className="d-flex align-items-stretch justify-content-center">
                <Card
                  className="p-0 pb-0 shadow convcard"
                  style={{ width: "22rem" }}
                >
                  <Card.Img
                    variant="top"
                    src={`/api/media/${conv.convention_img}`}
                    className="convcardimg"
                  />
                  <Card.Body>
                    <Card.Title>{conv.name}</Card.Title>
                  </Card.Body>
                  <ListGroup variant="flush">
                    {conv.distance !== null ? (
                      <ListGroup.Item>
                        <BsSignTurnRightFill className="blue" />
                        &nbsp;
                        {isNaN(conv.distance)
                          ? "Calculating distance..."
                          : Math.round(conv.distance) + " KM away from me!"}
                      </ListGroup.Item>
                    ) : (
                      <ListGroup.Item>
                        <BsSignTurnRightFill className="not-found" />
                        &nbsp;
                        {conv.address
                          ? "Location not found"
                          : "Invalid address"}
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <BsPinMapFill />
                      &nbsp;{conv.address}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <BsClockFill />
                      &nbsp;{new Date(conv.start_date).toLocaleString("en-gb")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <BsClockHistory />
                      &nbsp;{new Date(conv.end_date).toLocaleString("en-gb")}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      )}
    </React.Fragment>
  );
}

export default Home;
