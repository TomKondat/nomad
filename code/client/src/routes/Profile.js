import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import EditProfile from "./EditProfile";

const UserProfile = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/EditProfile");
  };
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} className="text-center">
          <Image
            src="data:image/jpeg;base64,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"
            alt="user profile picture"
            roundedCircle
            className="mb-3"
          />
          <h1 className="mb-0">Noam Ezra</h1>

          <hr />
          <p className="text-muted">Address:</p>
          <p>Harama 52, Dimona</p>
          <p className="text-muted">Birthday:</p>
          <p>14/01/1997</p>
          <Button
            onClick={() => {
              handleClick();
            }}
            size="lg"
            variant="outline-primary"
            className="rounded-pill"
          >
            Edit Profile
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
