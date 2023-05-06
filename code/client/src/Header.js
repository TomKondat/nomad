import React, { useContext, useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./NomadLogo.css";
import { BsFillChatFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import AuthContext from "./AuthContext";

function Header() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, [localStorage.getItem("userData")]);

  return (
    <React.Fragment>
      <Navbar
        variant="dark"
        expand="lg"
        sticky="top"
        collapseOnSelect
        className="purple"
      >
        <Container>
          <LinkContainer to={`/`}>
            <Navbar.Brand>
              <img
                alt="Logo"
                src="/logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                style={{ marginRight: "3px" }}
              />
              <span style={{ fontWeight: "bold" }}>
                N<span className="orange">o</span>mad
              </span>
            </Navbar.Brand>
          </LinkContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <LinkContainer to="/">
              <Button size="lg" variant="navbar">
                <AiFillHome className="orange" />
              </Button>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Button size="lg" variant="navbar">
                <BsFillPersonFill className="orange" />
              </Button>
            </LinkContainer>
            <LinkContainer to="/friendspage">
              <Button size="lg" variant="navbar">
                <BsFillChatFill className="orange" />
              </Button>
            </LinkContainer>
          </div>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;
