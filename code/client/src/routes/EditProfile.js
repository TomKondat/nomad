import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../AuthContext";
import { useContext } from "react";

const EditProfile = () => {
  const { userProfileData } = useContext(AuthContext);

  const [showSuccess, setShowSuccess] = useState(false);
  const [originalProfile, setOriginalProfile] = useState({});
  const [formValues, setFormValues] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());

  // Used to compare profile objects
  function deepEqual(object1, object2) {
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
  }

  function isObject(object) {
    return object != null && typeof object === "object";
  }

  function handleSunmit(e) {
    e.preventDefault();
    console.log("Handle submit here!", e.target);
    setShowSuccess(true);
  }

  function handleResetChanges() {
    setFormValues(originalProfile);
    setFormKey(Date.now());
  }

  function handleInputChange(e, cat) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [cat]: { ...formValues[cat], [name]: value },
    });
  }

  useEffect(() => {
    axios.get(`/api/get-profiles?q=${userProfileData?.user}`).then((res) => {
      setOriginalProfile(res.data);
      setFormValues(res.data);
    });
  }, []);

  useEffect(() => {
    setHasChanges(!deepEqual(originalProfile, formValues));
  }, [formValues]);

  return (
    <React.Fragment>
      <Container className="my-5">
        <header className="text-center mb-5">
          <h1 className="display-4">Edit Profile</h1>
        </header>

        {showSuccess ? (
          <Alert
            variant="success"
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            Profile edited successfully!
          </Alert>
        ) : null}

        <Form key={formKey} onSubmit={handleSunmit}>
          <Row>
            <Col lg={3}>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  placeholder="Enter your first name"
                  defaultValue={formValues?.user_data?.first_name}
                  onChange={(e) => handleInputChange(e, "user_data")}
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={3}>
              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  placeholder="Enter your last name"
                  defaultValue={formValues?.user_data?.last_name}
                  onChange={(e) => handleInputChange(e, "user_data")}
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  defaultValue={formValues?.user_profile_data?.address}
                  onChange={(e) => handleInputChange(e, "user_profile_data")}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  placeholder="Enter your company"
                  defaultValue={formValues?.user_profile_data?.company}
                  onChange={(e) => handleInputChange(e, "user_profile_data")}
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  placeholder="Enter your position"
                  defaultValue={formValues?.user_profile_data?.position}
                  onChange={(e) => handleInputChange(e, "user_profile_data")}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col lg={9}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  defaultValue={formValues?.user_data?.email}
                  onChange={(e) => handleInputChange(e, "user_data")}
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={3}>
              <Form.Group className="mb-3" controlId="formBirthdate">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  type="date"
                  name="birthdate"
                  defaultValue={formValues?.user_profile_data?.birthdate}
                  onChange={(e) => handleInputChange(e, "user_profile_data")}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

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
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default EditProfile;
