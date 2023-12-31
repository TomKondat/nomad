import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import AuthContext from "../AuthContext";
import { useContext } from "react";
import Form from "react-bootstrap/Form";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineLocationOff } from "react-icons/md";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [show, setShow] = useState(false);

  const [showLocation, setShowLocation] = useState(false);
  const handleLocationSwitch = () => {
    setShowLocation(!showLocation);
  };

  const handleShow = () => setShow(true);
  const { logoutUser, userProfileData } = useContext(AuthContext);

  const handleClose = () => {
    setShow(false);
  };

  const handleLogOut = () => {
    logoutUser();
  };

  useEffect(() => {
    axios
      .get(`/api/profile?q=${userProfileData?.user}`)
      .then((res) => setProfile(res.data));
  }, [userProfileData?.user]);

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
                <Button variant="danger" onClick={handleLogOut}>
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
                  <div className="float-start">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      variant="info"
                      label={
                        showLocation ? (
                          <MdOutlineLocationOn size={25} />
                        ) : (
                          <MdOutlineLocationOff size={25} />
                        )
                      }
                      checked={showLocation}
                      onChange={handleLocationSwitch}
                      className=""
                    />
                  </div>
                </Col>
              </Row>

              {profile ? (
                <Image
                  src={`/api/${profile?.user_profile_data?.profile_img}`}
                  alt="user profile picture"
                  roundedCircle
                  className="mb-3"
                  style={{ width: "200px", height: "200px" }}
                />
              ) : (
                ""
              )}

              <h1 className="mb-0">
                {profile?.user_data?.first_name} {profile?.user_data?.last_name}
              </h1>
              <p className="text-muted mt-2">
                {profile?.user_profile_data?.position}
              </p>

              <hr />
              <p className="text-muted">Company:</p>
              <p> {profile?.user_profile_data?.company}</p>
              <p className="text-muted">Address:</p>
              <p> {profile?.user_profile_data?.address}</p>
              <p className="text-muted">Birthdate:</p>
              <p>{profile?.user_profile_data?.birthdate}</p>
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
