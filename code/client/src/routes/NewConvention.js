import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Card,
  Modal,
} from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { BsFillChatTextFill } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import "../styles.css";
import Map from "../Map";

export default function NewConvention() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [convention, setConvention] = useState();
  let params = useParams();

  async function getConvention() {
    await axios
      .get(`/api/get-convention/?q=${params.conventionId}`)
      .then((res) => {
        setConvention(res.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getConvention();
  }, [params]);

  const openGoogleMaps = () => {
    const address = convention?.address;
    if (address) {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`;
      window.open(mapUrl, "_blank");
    }
  };

  return (
    <Container>
      {convention ? (
        <>
          <Row>
            <h1 className="display-4 text-center my-3">{convention?.name}</h1>
            <Col>
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "10px",
                }}
              >
                <Image
                  src={`/api/media/${convention?.convention_img}`}
                  alt="Convention Image"
                  fluid
                  style={{ filter: "brightness(80%)" }}
                  width="350px"
                  height="200px"
                />
              </div>
              <div className="my-2">
                <Row className="align-items-center">
                  <Col xs={1} className="d-flx align-items-center">
                    <Image
                      src={`/api/media/${convention?.organization?.organization_img}`}
                      alt="user profile picture"
                      roundedCircle
                      width={25}
                      height={25}
                    />
                  </Col>
                  <Col xs={11}>
                    <h6 className="mb-0">
                      Organized by:&nbsp;
                      {convention?.organization?.name}
                    </h6>
                  </Col>
                </Row>
              </div>

              <div className="my-3">
                <p className="lead">{convention?.description}</p>
              </div>
            </Col>

            <Col lg={4} className="my-2">
              <div className="card border-2 shadow-sm rounded">
                <div className="card-body">
                  <Row>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <LinkContainer
                        to={"/editnewconvention/" + params.conventionId}
                      >
                        <FiEdit className="blue" />
                      </LinkContainer>
                    </div>
                    <h3 className="card-title mb-3">Details</h3>
                  </Row>
                  <ul className="list-unstyled">
                    <li>
                      <strong>Address:</strong> {convention?.address}
                    </li>
                    <li>
                      <strong>Capacity:</strong> {convention?.capacity}
                    </li>
                    <li>
                      <strong>Start Time:</strong>{" "}
                      {new Date(convention.start_date).toLocaleString("en-gb")}
                    </li>
                    <li>
                      <strong>End Time:</strong>{" "}
                      {new Date(convention.end_date).toLocaleString("en-gb")}
                    </li>
                  </ul>

                  <Map address={convention?.address} />

                  {/* testing */}
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-light"
                      className="btn-block my-4 shadow fw-bold blue"
                    >
                      Join
                    </Button>
                    <Button
                      variant="outline-light"
                      className="btn-block my-4 shadow fw-bold blue"
                    >
                      Leave
                    </Button>
                    <Button
                      variant="outline-light"
                      className="btn-block my-4 shadow fw-bold blue"
                      onClick={handleShowModal}
                    >
                      Attendees
                    </Button>
                    <Button
                      variant="outline-light"
                      className="btn-block my-4 shadow fw-bold blue"
                      onClick={openGoogleMaps} // Call the function to open Google Maps
                    >
                      Open in Google Maps
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Attendees</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="mb-3">
                <Form.Group controlId="searchBar">
                  <Form.Control
                    type="text"
                    placeholder="Search for attendees"
                  />
                </Form.Group>
              </Form>
              <div>
                {[...Array(20)].map((_, index) => (
                  <Card key={index} className="mb-3">
                    <Card.Body className="d-flex align-items-center">
                      <Image
                        src="https://scontent.ftlv19-1.fna.fbcdn.net/v/t1.6435-9/187676540_4191046497582597_4147289563785806834_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CYDM_dbnO98AX-JdaHe&_nc_ht=scontent.ftlv19-1.fna&oh=00_AfBzc9Zb80VKwqufIESNRJxCd5jdZcfKfQqe0G8w7A7FHQ&oe=646E41E4"
                        width={60}
                        height={60}
                        roundedCircle
                        className="me-3"
                      />
                      <div>
                        <Card.Title className="mb-0">Noam Ezrot</Card.Title>
                        <Card.Text className="text-muted">Attendee</Card.Text>
                      </div>
                      <Button variant="outline-light" className="ms-auto">
                        <BsFillChatTextFill className="orange" />
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        ""
      )}
    </Container>
  );
}
