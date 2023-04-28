import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./NomadLogo.css";
function Header() {
  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg" sticky="top" collapseOnSelect>
        <Container>
          <LinkContainer to={`/`}>
            <Navbar.Brand>
              <img
                alt="Logo"
                src="/logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              <div className="logo">
                N<span className="orange">o</span>mad
              </div>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Offcanvas placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Nomad</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Navbar.Collapse>
                <Nav className="me-auto">
                  <LinkContainer to={`/`}>
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={`friends`}>
                    <Nav.Link>Friends</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={`profile`}>
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as:{" "}
                  <LinkContainer to={`profile`}>
                    <a href="/#">Noam Ezra</a>
                  </LinkContainer>
                </Navbar.Text>
                &nbsp;&nbsp;
                <LinkContainer to={`profile`}>
                  <Nav.Link>
                    <img
                      alt="Profile"
                      src="https://www.rd.com/wp-content/uploads/2022/04/GettyImages-1331768807.jpg"
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      style={{ borderRadius: "50%", border: "2px solid gray" }}
                    />
                  </Nav.Link>
                </LinkContainer>
              </Navbar.Collapse>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;
