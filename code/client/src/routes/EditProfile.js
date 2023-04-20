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

const EditProfile = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleDeleteAccount = () => {
    // Handle delete account logic here
    setShowDeleteModal(false);
  };

  const handleSaveChanges = () => {
    // Handle save changes logic here
    setShowSuccessAlert(true);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="mb-4">Edit Profile</h2>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your last name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter your address" />
            </Form.Group>
            <br></br>
            <Button
              variant="primary"
              className="mb-3"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
            <hr />
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Delete Account
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>

      <Alert
        variant="success"
        show={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
        dismissible
      >
        Your changes have been saved.
      </Alert>
    </Container>
  );
};

export default EditProfile;
