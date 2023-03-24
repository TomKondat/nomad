import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Login() {
  return (
    <React.Fragment>
      <Form>
        <Row className="justify-content-center">
          <Col lg={8} xl={6} xxl={5}>
            <h1 className="mt-2 text-center">
              <img
                alt="Logo"
                src="/logo192.png"
                width="128"
                height="128"
                className="d-inline-block mx-auto"
              />
              Nomad
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8} xl={6} xxl={5}>
            <Form.Group
              className="mb-3 mt-lg-3 mt-xl-4 mt-xxl-5"
              controlId="loginEmail"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8} xl={6} xxl={5}>
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8} xl={6} xxl={5}>
            <Form.Group className="mb-3" controlId="loginRemember">
              <Form.Check
                type="checkbox"
                label="Remember me"
                defaultChecked
              ></Form.Check>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8} xl={6} xxl={5}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            &nbsp;&nbsp;
            <Button variant="outline-primary">Forgot password?</Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
}

export default Login;
