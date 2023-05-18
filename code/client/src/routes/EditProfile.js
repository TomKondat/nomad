import React, { useState, useEffect } from "react";
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
import axios from "axios";
import AuthContext from "../AuthContext";
import { useContext } from "react";

const EditProfile = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profile, setProfile] = useState();
  const { userProfileData } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    address: "",
    company: "",
    position: "",
    email: "",
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const hasChanges = checkForChanges();
    setHasChanges(hasChanges);
    setIsSaveDisabled(!hasChanges || checkForEmptyFields());
  }, [formValues]);

  async function getProfile() {
    await axios
      .get(`http://127.0.0.1:8000/api/get-profiles?q=${userProfileData?.user}`)
      .then((res) => {
        const profileData = res.data;
        setProfile(profileData);
        setFormValues({
          name: profileData?.user?.first_name,
          lastName: profileData?.user?.last_name,
          address: profileData?.address,
          company: profileData?.company,
          position: profileData?.position,
          email: profileData?.user?.email,
        });
      })
      .catch((error) => console.log(error));
  }

  const handleDeleteAccount = () => {
    // Handle delete account logic here
    setShowDeleteModal(false);
  };

  const handleSaveChanges = () => {
    if (isSaveDisabled) {
      return; // If save button is disabled, do nothing
    }

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

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const checkForChanges = () => {
    const { name, lastName, address, company, position, email } = formValues;

    return (
      name !== profile?.user?.first_name ||
      lastName !== profile?.user?.last_name ||
      address !== profile?.address ||
      company !== profile?.company ||
      position !== profile?.position ||
      email !== profile?.user?.email
    );
  };

  const checkForEmptyFields = () => {
    const { name, lastName, address, company, position, email } = formValues;

    return (
      !name.trim() ||
      !lastName.trim() ||
      !address.trim() ||
      !company.trim() ||
      !position.trim() ||
      !email.trim()
    );
  };

  const handleResetChanges = () => {
    setFormValues({
      name: profile?.user?.first_name,
      lastName: profile?.user?.last_name,
      address: profile?.address,
      company: profile?.company,
      position: profile?.position,
      email: profile?.user?.email,
    });
    setHasChanges(false);
    setIsSaveDisabled(true);
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
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new last name"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new address"
                value={formValues.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="company">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new company"
                value={formValues.company}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="position">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new position"
                value={formValues.position}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your new email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <br />
            <Button
              variant="primary"
              className="mb-1 rounded-pill"
              onClick={handleSaveChanges}
              disabled={isSaveDisabled}
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
            <Button
              variant="secondary"
              className="ms-2 rounded-pill"
              onClick={handleResetChanges}
              disabled={!hasChanges}
            >
              Reset Changes
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
