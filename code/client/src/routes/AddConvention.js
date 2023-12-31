import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

const AddConvention = () => {
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [organizers, setOrganizers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      organization_id: e.target.orgId.value,
      name: e.target.name.value,
      description: e.target.description.value,
      address: e.target.address.value,
      capacity: e.target.capacity.value,
      start_date: e.target.startdate.value.replace("T", " "),
      end_date: e.target.enddate.value.replace("T", " "),
    };

    fetch("/api/convention/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 201) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.log(res);
      }
    });
  };

  useEffect(() => {
    axios.get("/api/organizations").then((res) => setOrganizers(res.data));
  }, []);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setProfileImage("");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="d-flex justify-content-center mb-4">
            <div className="position-relative">
              <img
                src={profileImage || "https://via.placeholder.com/250x200"}
                alt="Profile"
                className=" border border-4 border-white shadow-sm"
                style={{
                  width: "250px",
                  height: "200px",
                  borderRadius: "10px",
                }}
              />
              <div
                className="position-absolute top-0 end-0"
                style={{ transform: "translate(100%, -100%)" }}
              >
                <label htmlFor="profile-image" className="btn btn-light">
                  <FaCamera size={18} />
                </label>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleProfileImageChange}
                />
              </div>
            </div>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formOrganizer">
              <Form.Label>Organizer</Form.Label>
              <Form.Select name="orgId" required>
                {organizers.map((organizer) => (
                  <option key={organizer.id} value={organizer.id}>
                    {organizer.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formConventionName">
              <Form.Label>Convention name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter convention name"
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                type="text"
                placeholder="Enter convention description"
              />
            </Form.Group>
            <Form.Group controlId="formCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                placeholder="Enter convention capacity"
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter convention address"
                required
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="formStartDate">
                  <Form.Label>Starting date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="startdate"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formEndDate">
                  <Form.Label>Ending date</Form.Label>
                  <Form.Control type="datetime-local" name="enddate" required />
                </Form.Group>
              </Col>
            </Row>
            <br></br>
            <Button variant="primary" className="mb-1" type="submit">
              Create Convention
            </Button>
          </Form>
          <Container className="p-0">
            {showSuccess ? (
              <Alert
                variant="success"
                onClose={() => setShowSuccess(false)}
                dismissible
              >
                Convention created successfully!
              </Alert>
            ) : null}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AddConvention;
