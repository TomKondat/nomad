import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
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
  const { userProfileData } = useContext(AuthContext);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [convention, setConvention] = useState();
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  let params = useParams();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const getConvention = useCallback(async () => {
    await axios
      .get(`/api/get-convention/?q=${params.conventionId}`)
      .then((res) => {
        setConvention(res.data);
      })
      .catch((error) => console.log(error));
  }, [params.conventionId]);

  const checkIfRegistered = useCallback(async () => {
    await axios
      .get(`/api/is-registered/?q=${params.conventionId}&u=${userData.id}`)
      .then((res) => {
        console.log(res.data);
        setIsRegistered(res.data.registered);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.conventionId, userData.id]);

  useEffect(() => {
    getConvention();
    checkIfRegistered();
  }, [getConvention, checkIfRegistered]);

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
        console.log("User registered successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    checkIfRegistered();
  }

  async function unregisterFromConvention() {
    await axios
      .delete(`/api/unregister/?q=${params.conventionId}&u=${userData.id}`)
      .then((res) => {
        console.log("User unregistered successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    checkIfRegistered();
  }

  useEffect(() => {
    axios
      .get(`/api/registered-users/?q=${params.conventionId}`)
      .then((res) => {
        // Handle successful registration
        setAttendees(res.data);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }, [params.conventionId]);

  useEffect(() => {
    // Filter attendees by search query
    const filtered = attendees.filter((attendee) =>
      `${attendee?.user_data?.first_name} ${attendee?.user_data?.last_name} ${attendee?.profile_data?.company}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredAttendees(filtered);
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
                  style={{ filter: "brightness(100%)" }}
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
                        <Button
                          size="sm"
                          variant="outline-light"
                          hidden={userProfileData?.is_organizer === false}
                        >
                          <FiEdit className="blue" />
                        </Button>
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
                    {isRegistered ? (
                      <Button
                        onClick={unregisterFromConvention}
                        variant="outline-light"
                        className="btn-block my-4 shadow fw-bold blue"
                      >
                        Leave
                      </Button>
                    ) : (
                      <Button
                        onClick={registerToConvention}
                        variant="outline-light"
                        className="btn-block my-4 shadow fw-bold blue"
                      >
                        Join
                      </Button>
                    )}
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
              <Modal.Title className="display-6 text-center ">
                <strong>Attendees</strong>
              </Modal.Title>
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
                        src={`/api/${attendee?.profile_data?.profile_img}`}
                        width={70}
                        height={70}
                        roundedCircle
                        className="me-3"
                      />
                      <div>
                        <Card.Title className="mb-0">
                          {attendee?.user_data?.first_name}{" "}
                          {attendee?.user_data?.last_name}
                        </Card.Title>
                        <Card.Text className="text-muted">
                          {" "}
                          {attendee?.profile_data?.position}
                          <br />{" "}
                          <strong>{attendee?.profile_data?.company}</strong>
                        </Card.Text>
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
