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
import { TfiFaceSad } from "react-icons/tfi";
import { useEffect } from "react";
import axios from "axios";
import AuthContext from "../AuthContext";
import { useContext } from "react";

const EditProfile = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profile, setProfile] = useState();
  const { userProfileData } = useContext(AuthContext);
  async function getProfile() {
    await axios
      .get(`http://127.0.0.1:8000/api/get-profiles?q=${userProfileData?.user}`) //Instead of one sending the connected user's id
      .then((res) => {
        setProfile(res.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getProfile();
  }, []);

  const handleDeleteAccount = () => {
    // Handle delete account logic here
    setShowDeleteModal(false);
  };

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
                src={
                  !profile
                    ? "https://via.placeholder.com/200x200"
                    : `http://localhost:8000/media/${profile?.profile_img}`
                }
                alt="Profile"
                className="rounded-circle border border-4 border-white shadow-sm"
                style={{ width: "200px", height: "200px" }}
              />
              <div
                className="position-absolute top-0 end-0"
                style={{ transform: "translate(50%, -50%)" }}
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
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new name"
                defaultValue={profile?.user?.first_name}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new last name"
                defaultValue={profile?.user?.last_name}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new address"
                defaultValue={profile?.address}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new company"
                defaultValue={profile?.company}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new position"
                defaultValue={profile?.position}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your new email"
                defaultValue={profile?.user?.email}
              />
            </Form.Group>
            {/* <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                defaultValue={profile?.user?.password}
              />
            </Form.Group> */}

            <br></br>
            <Button
              variant="primary"
              className="mb-1 rounded-pill"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
            <Alert
              variant="success"
              show={showSuccessAlert}
              onClose={() => setShowSuccessAlert(false)}
              dismissible
            >
              Your changes have been saved.
            </Alert>
            <hr />
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Delete Account
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Confirm Delete Account&nbsp;
            <TfiFaceSad color="red" />
          </Modal.Title>
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
    </Container>
  );
};

export default EditProfile;
