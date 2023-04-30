import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import { FaCamera } from "react-icons/fa";

const AddConvention = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const handleSaveChanges = () => {
    // Handle save changes logic here
    setShowSuccessAlert(true);
  };

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
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Convention name</Form.Label>
              <Form.Control type="text" placeholder="Enter convention name" />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                type="text"
                placeholder="Enter convention description"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter convention capacity"
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter convention address"
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Starting date</Form.Label>
              <Form.Control type="date" name="birthday" />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Ending date</Form.Label>
              <Form.Control type="date" name="birthday" />
            </Form.Group>
            <br></br>
            <Button
              variant="primary"
              className="mb-1 rounded-pill"
              onClick={handleSaveChanges}
            >
              Create Convention
            </Button>
            <Alert
              variant="success"
              show={showSuccessAlert}
              onClose={() => setShowSuccessAlert(false)}
              dismissible
            >
              Your convention has created.
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddConvention;
