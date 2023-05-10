import React, { useContext, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./BigLogo.css";

import AuthContext from "../AuthContext";

function Login() {
  const { loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    loginUser(data);
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center mt-4">
          <Col lg={8} xl={6} xxl={5}>
            <h1 className="mt-2 text-center">
              <img
                alt="Logo"
                src="/logo192.png"
                width="100"
                height="100"
                className="d-inline-block mx-auto"
              />

              <div className="biglogo">
                N<span className="orange">o</span>mad
              </div>
            </h1>
          </Col>
        </Row>
        <br></br>
        <Row className="justify-content-center">
          <Col lg={8} xl={6} xxl={5}>
            <Form.Group
              className="mb-3 mt-lg-3 mt-xl-4 mt-xxl-5"
              controlId="loginEmail"
            >
              <Form.Label>
                {" "}
                <strong>Username</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8} xl={6} xxl={5}>
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>
                <strong>Password</strong>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          <Col lg={8} xl={6} xxl={5}>
            <Button variant="primary" type="submit">
              Sign In
            </Button>

            <LinkContainer to={"/signup"}>
              <Button className="mx-4" variant="outline-primary">
                Sign Up
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <Navbar bg="light" className=" justify-content-center mt-5   shadow-sm">
          <p className=" text-center mb-0  lead">
            © 2023 Copyright: <strong>Nomad</strong>
          </p>
        </Navbar>
      </Form>
    </React.Fragment>
  );
}

export default Login;
