import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [profile, setProfile] = useState();

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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/EditProfile");
  };
  return (
    <Container className="py-5">
      {profile ? (
        <>
          <Row className="justify-content-center">
            <Col md={8} lg={6} className="text-center">
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
        </>
      ) : (
        ""
      )}
    </Container>
  );
};

export default UserProfile;
