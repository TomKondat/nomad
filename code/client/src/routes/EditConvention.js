import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Image,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

const EditConvention = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [originalConvention, setOriginalConvention] = useState({});
  const [formValues, setFormValues] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());

  // Used to compare profile objects
  const deepEqual = useCallback((object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        (areObjects && !deepEqual(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }

    return true;
  }, []);

  function isObject(object) {
    return object != null && typeof object === "object";
  }

  function handleSunmit(e) {
    e.preventDefault();

    const data = {
      id: formValues?.id,
      name: e.target.name.value,
      start_date: e.target.start_date.value,
      end_date: e.target.end_date.value,
      description: e.target.description.value,
      capacity: e.target.capacity.value,
      address: e.target.address.value,
    };

    axios.put("/api/update-convention/", data).then((res) => {
      if (res.status === 200) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate(`/conventionpage/${params.conventionId}`);
        }, 2000);
      } else {
        console.log(res);
      }
    });
  }

  function handleResetChanges() {
    setFormValues(originalConvention);
    setFormKey(Date.now());
  }

  function handleDeleteConvention() {
    axios
      .delete(`/api/delete-convention/?q=${params.conventionId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));

    setShowDelete(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }
  useEffect(() => {
    axios.get(`/api/get-convention/?q=${params.conventionId}`).then((res) => {
      const data = res.data;
      data["start_date"] = new Date(Date.parse(data["start_date"]))
        .toISOString()
        .match(/(.*):\d{2}\.\d{3}Z/)[1];
      data["end_date"] = new Date(Date.parse(data["end_date"]))
        .toISOString()
        .match(/(.*):\d{2}\.\d{3}Z/)[1];
      setOriginalConvention(data);
      setFormValues(data);
    });
  }, [params.conventionId]);

  useEffect(() => {
    setHasChanges(!deepEqual(originalConvention, formValues));
  }, [formValues, originalConvention, deepEqual]);

  return (
    <React.Fragment>
      <Container className="my-5">
        <header className="text-center mb-5">
          <h1 className="display-4">Edit Convention</h1>
        </header>

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="d-flex justify-content-center mb-4">
              <div className="position-relative">
                <Image
                  src={
                    formValues
                      ? `/api/media/${formValues?.convention_img}`
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
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Form key={formKey} onSubmit={handleSunmit}>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formConventionName">
                <Form.Label>Convention name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter convention name"
                  defaultValue={formValues?.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={3}>
              <Form.Group className="mb-3" controlId="formStartDate">
                <Form.Label>Start date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="start_date"
                  defaultValue={formValues?.start_date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={3}>
              <Form.Group className="mb-3" controlId="formEndDate">
                <Form.Label>End date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="end_date"
                  defaultValue={formValues?.end_date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  name="description"
                  placeholder="Enter convention description"
                  defaultValue={formValues?.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={3}>
              <Form.Group className="mb-3" controlId="formCapacity">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="number"
                  name="capacity"
                  placeholder="Enter convention capacity"
                  defaultValue={formValues?.capacity}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={3}>
              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter convention address"
                  defaultValue={formValues?.address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Delete Convention</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this convention? This action is
              not reversible!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDeleteConvention}>
                Delete Convention
              </Button>
            </Modal.Footer>
          </Modal>

          <Container className="p-0 mt-3">
            <Button variant="primary" type="submit" disabled={!hasChanges}>
              Save Changes
            </Button>{" "}
            <Button
              variant="secondary"
              onClick={handleResetChanges}
              disabled={!hasChanges}
            >
              Reset Changes
            </Button>
          </Container>
          <hr />
          <Container className="p-0 mt-1">
            <Button variant="danger" onClick={handleShow}>
              Delete Convention
            </Button>
          </Container>
        </Form>

        {showSuccess ? (
          <Alert
            className="mt-3"
            variant="success"
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            Convention edited successfully! Redirecting to convention page
          </Alert>
        ) : null}

        {showDelete ? (
          <Alert
            className="mt-3"
            variant="danger"
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            Convention deleted successfully! Redirecting to home
          </Alert>
        ) : null}
      </Container>
    </React.Fragment>
  );
};

export default EditConvention;
