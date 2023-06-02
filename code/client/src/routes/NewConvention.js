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
import { LoadGeoLocation } from "../LoadGeoLocation";
import AuthContext from "../AuthContext";
import { useContext } from "react";

export default function NewConvention() {
  const { userData } = useContext(AuthContext);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [attendees, setAttendees] = useState([]);
  const [convention, setConvention] = useState();
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    LoadGeoLocation().then((coords) => {
      setCurrentLocation(coords);
    });
  }, []);

  const openGoogleMaps = () => {
    const address = convention?.address;
    if (address && currentLocation) {
      const { lat, lng } = currentLocation;
      const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${encodeURIComponent(
        address
      )}`;
      window.open(mapUrl, "_blank");
    }
  };

  async function registerToConvention() {
    await axios
      .post(`/api/register/?q=${params.conventionId}`, {
        user: userData.id,
      })
      .then((res) => {
        // Handle successful registration
        console.log("User registered successfully");
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }

  async function viewRegisteredUsers() {
    await axios
      .get(`/api/registered-users/?q=${params.conventionId}`)
      .then((res) => {
        // Handle successful registration
        setAttendees(res.data);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }
  useEffect(() => {
    viewRegisteredUsers();
  }, []);

  // Filter attendees by search query
  function filterAttendees(attendees) {
    const filtered = attendees.filter((attendee) =>
      `${attendee?.user_data?.first_name} ${attendee?.user_data?.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredAttendees(filtered);
  }

  useEffect(() => {
    filterAttendees(attendees);
  }, [searchQuery, attendees]);

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

                  <div className="d-flex justify-content-between">
                    <Button
                      onClick={registerToConvention}
                      variant="outline-light"
                      className="btn-block my-4 shadow fw-bold blue"
                    >
                      Join
                    </Button>
                    <Button
                      variant="outline-light"
                      className="btn-block my-4 shadow fw-bold blue"
                      onClick={openGoogleMaps} // Call the function to open Google Maps
                    >
                      Navigate&nbsp;
                      <Image
                        src="https://cdn.worldvectorlogo.com/logos/google-maps-2020-icon.svg"
                        width={20}
                        height={20}
                        className=""
                      />
                    </Button>
                    <Button
                      variant="outline-light"
                      className="btn-block my-4 shadow fw-bold blue"
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
                  <Form.Control
                    type="text"
                    placeholder="Search for attendees"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <div>
                {filteredAttendees.map((attendee, index) => (
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
                        <Card.Title className="mb-0">
                          {attendee?.user_data?.first_name}{" "}
                          {attendee?.user_data?.last_name}
                        </Card.Title>
                        <Card.Text className="text-muted"></Card.Text>
                      </div>
                      <LinkContainer
                        to={`/chatpage/${attendee?.user_data?.username}`}
                      >
                        <Button
                          variant="outline-light"
                          className="ms-auto"
                          hidden={
                            userData.username === attendee?.user_data?.username
                          }
                        >
                          <BsFillChatTextFill className="orange" />
                        </Button>
                      </LinkContainer>
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
