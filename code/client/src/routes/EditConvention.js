import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const EditConvention = () => {
  const params = useParams();

  const [showSuccess, setShowSuccess] = useState(false);
  const [originalConvention, setOriginalConvention] = useState({});
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
    console.log(e);

    /*
    const data = {
      // Fill this with submit data
    };

    axios
      // This doesn't exist yet
      .put(`/api/convention?q=${originalConvention?.user_data?.id}`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));

    setShowSuccess(true);
    */
  }

  function handleResetChanges() {
    setFormValues(originalConvention);
    setFormKey(Date.now());
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
        .match(/(.*)\:\d{2}\.\d{3}Z/)[1];
      data["end_date"] = new Date(Date.parse(data["end_date"]))
        .toISOString()
        .match(/(.*)\:\d{2}\.\d{3}Z/)[1];
      setOriginalConvention(data);
      setFormValues(data);
    });
  }, []);

  useEffect(() => {
    setHasChanges(!deepEqual(originalConvention, formValues));
  }, [formValues]);

  return (
    <React.Fragment>
      <Container className="my-5">
        <header className="text-center mb-5">
          <h1 className="display-4">Edit Convention</h1>
        </header>

        {showSuccess ? (
          <Alert
            variant="success"
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            Convention edited successfully!
          </Alert>
        ) : null}

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

export default EditConvention;
