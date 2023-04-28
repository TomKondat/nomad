import { useParams } from "react-router-dom";
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

export default function NewConvention() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/EditConvention");
  };

  let params = useParams();

  return (
    <Container>
      <Row>
        <Col>
          <Button
            onClick={() => {
              handleClick();
            }}
            className="rounded-pill"
            variant="light"
          >
            <FiEdit />
          </Button>
          <h1 className="display-4 text-center my-4">
            Convention Number {params.conventionId}
          </h1>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "10px",
            }}
          >
            <Image
              src="https://vrscout.com/wp-content/uploads/2020/03/GoogleIO2020_2-copy.png"
              alt="Convention Image"
              fluid
              style={{ filter: "brightness(80%)" }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                zIndex: 1,
              }}
            >
              <h2 style={{ fontSize: "2rem" }}>Convention</h2>
            </div>
          </div>
          <div className="my-4">
            <p className="lead">short description here</p>
          </div>
        </Col>
        <Col lg={4} className="my-4">
          <div className="card border-0 shadow-sm rounded">
            <div className="card-body">
              <h3 className="card-title mb-3">Details</h3>
              <ul className="list-unstyled">
                <li>
                  <strong>Address:</strong> Harama 52, Dimona
                </li>
                <li>
                  <strong>Capacity:</strong> 500
                </li>
                <li>
                  <strong>Start Time:</strong> 9:00 AM
                </li>
                <li>
                  <strong>End Time:</strong> 5:00 PM
                </li>
              </ul>
              <div className="d-flex justify-content-between">
                <Button variant="primary" className="btn-block my-4">
                  Join
                </Button>
                <Button variant="danger" className="btn-block my-4">
                  Leave
                </Button>
                <Button
                  variant="secondary"
                  className="btn-block my-4"
                  onClick={handleShowModal}
                >
                  Attendees
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
              <Form.Control type="text" placeholder="Search for attendees" />
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
                  <Button variant="outline-primary" className="ms-auto">
                    Add Friend
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
