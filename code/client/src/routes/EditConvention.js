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
import { useParams } from "react-router-dom";
import axios from "axios";

const EditConvention = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  let params = useParams();
  const [convention, setConvention] = useState();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    capacity: "",
    address: "",
    starting_time: "",
    ending_time: "",
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const hasChanges = checkForChanges();
    setHasChanges(hasChanges);
  }, [formValues]);

  async function getConvention() {
    await axios
      .get(`http://127.0.0.1:8000/api/get-convention/?q=${params.conventionId}`)
      .then((res) => {
        const conventionData = res.data;
        setConvention(conventionData);
        setFormValues({
          name: convention?.name,
          description: convention?.description,
          capacity: convention?.capacity,
          address: convention?.address,
          starting_time: convention?.start_date,
          ending_time: convention?.end_date,
        });
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getConvention();
  }, [params]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const checkForChanges = () => {
    const { name, description, capacity, address, starting_time, ending_time } =
      formValues;

    return (
      name !== convention?.name ||
      description !== convention?.description ||
      capacity !== convention?.capacity ||
      address !== convention?.address ||
      starting_time !== convention?.start_date ||
      ending_time !== convention?.end_date
    );
  };

  const handleResetChanges = () => {
    setFormValues({
      name: convention?.name,
      description: convention?.description,
      capacity: convention?.capacity,
      address: convention?.address,
      starting_time: convention?.start_date,
      ending_time: convention?.end_date,
    });
    setHasChanges(false);
  };

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
        {/* <h1 className="display-4 text-center py-2 bg-light">Edit Profile</h1> */}
        <Col md={8} lg={6}>
          <div className="d-flex justify-content-center mb-4">
            <div className="position-relative">
              <img
                src={
                  convention
                    ? `http://localhost:8000/media/${convention?.convention_img}`
                    : "https://via.placeholder.com/250x200"
                }
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
            <Form.Group controlId="name">
              <Form.Label>Convention name</Form.Label>
              <Form.Control
                type="text"
                value={formValues.name}
                placeholder="Enter convention name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                type="text"
                placeholder="Enter convention description"
                value={formValues.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="capacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter convention capacity"
                value={formValues.capacity}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter convention address"
                value={formValues.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartTime">
              <Form.Label>Starting date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="birthday"
                value={formValues.starting_time?.slice(0, -1)}
                onChange={handleInputChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formEndTime">
              <Form.Label>Ending date</Form.Label>
              <Form.Control
                type="datetime-local"
                value={formValues.ending_time?.slice(0, -1)}
                onChange={handleInputChange}
                disabled
              />
            </Form.Group>
            <br></br>
            <Button
              variant="primary"
              className="mb-1 rounded-pill"
              onClick={handleSaveChanges}
              disabled={!hasChanges}
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
              Delete Convention
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Convention</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this Convention? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete Convention
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditConvention;
