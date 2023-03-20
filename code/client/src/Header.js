import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="Logo"
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            &nbsp;Nomad
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Friends</Nav.Link>
              <Nav.Link href="#">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Noam Ezra</a>
            </Navbar.Text>
            &nbsp;&nbsp;
            <img
              alt="Profile"
              src="https://www.rd.com/wp-content/uploads/2022/04/GettyImages-1331768807.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ borderRadius: "50%", border: "2px solid gray" }}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;
