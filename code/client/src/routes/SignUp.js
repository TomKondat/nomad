import { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

function SignUp() {
  const [passwordError, setPasswordError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(false);

    if (e.target.password.value !== e.target.verifyPassword.value) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
      first_name: e.target.firstName.value,
      last_name: e.target.lastName.value,
      profile: {
        birthdate: e.target.birthdate.value,
        address: e.target.address.value,
        company: e.target.company.value,
        position: e.target.position.value,
      },
    };

    fetch("http://localhost:8000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 201) {
          setShowSuccess(true);
        } else {
          console.log(res);
        }

        return res.json();
      })
      .then(() =>
        fetch("http://localhost:8000/api/agora/users/register_user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: e.target.username.value,
            username: e.target.username.value,
            password: e.target.username.value,
          }),
        })
      );
  };

  return (
    <Container className="my-5">
      <header className="text-center mb-5">
        <h1 className="display-4">Sign Up</h1>
        <p className="lead">Create an account and start using Nomad</p>
      </header>

      {showSuccess ? (
        <Alert
          variant="success"
          onClose={() => setShowSuccess(false)}
          dismissible
        >
          User created successfully!
        </Alert>
      ) : null}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter your username"
                required
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                required
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter your address"
              required
            />
          </Form.Group>
        </Row>

        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3" controlId="formCompany">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                placeholder="Enter your company"
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
                required
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mb-3" controlId="formBirthdate">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control type="date" name="birthdate" required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group controlId="formVerifyPassword">
              <Form.Label>Verify Password</Form.Label>
              <Form.Control
                type="password"
                name="verifyPassword"
                placeholder="Re-enter your password"
                className={`${passwordError ? "is-invalid" : ""}`}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter matching passwords.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button className="mt-3" variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}
export default SignUp;
