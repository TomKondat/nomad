import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import AuthContext from "../AuthContext";
import { useContext } from "react";

const UserProfile = () => {
  const [profile, setProfile] = useState();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const { logoutUser } = useContext(AuthContext);

  const handleClose = () => {
    logoutUser();
    setShow(false);
  };

  async function getProfile() {
    await axios
      .get(`http://127.0.0.1:8000/api/get-profiles?q=${2}`) //Instead of one sending the connected user's id
      .then((res) => {
        setProfile(res.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Container className="py-5">
      {profile ? (
        <>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Log out</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to log out?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <LinkContainer to="/Login">
                <Button variant="danger" onClick={handleClose}>
                  Log out
                </Button>
              </LinkContainer>
            </Modal.Footer>
          </Modal>

          <Row className="justify-content-center">
            <Col md={8} lg={6} className="text-center">
              <Row>
                <Col>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    className="float-end "
                    onClick={handleShow}
                  >
                    <SlLogout />
                  </Button>

                  <LinkContainer to="/EditProfile">
                    <Button
                      size="sm"
                      variant="outline-secondary mx-2"
                      className="float-end"
                    >
                      <FiEdit />
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
              {profile ? (
                <Image
                  src={`http://localhost:8000/media/${profile?.profile_img}`}
                  alt="user profile picture"
                  roundedCircle
                  className="mb-3"
                />
              ) : (
                ""
              )}

              <h1 className="mb-0">
                {profile?.user?.first_name} {profile?.user?.last_name}
              </h1>
              <p className="text-muted mt-2">{profile?.position}</p>

              <hr />
              <p className="text-muted">Company:</p>
              <p> {profile?.company}</p>
              <p className="text-muted">Address:</p>
              <p> {profile?.address}</p>
              <p className="text-muted">Birthdate:</p>
              <p>{profile?.birthdate}</p>
            </Col>
          </Row>
        </>
      ) : (
        ""
      )}
    </Container>
  );
};

export default UserProfile;
