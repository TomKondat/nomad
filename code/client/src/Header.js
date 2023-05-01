import React, { useContext, useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "./NomadLogo.css";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
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

  const navigate = useNavigate();

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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <LinkContainer to="/">
              <Button variant="light">
                <AiFillHome className="orange" />
              </Button>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Button variant="light">
                <BsFillPersonFill className="orange" />
              </Button>
            </LinkContainer>
            <LinkContainer to="/friendspage">
              <Button variant="light">
                <FaUserFriends className="orange" />
              </Button>
            </LinkContainer>
          </div>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;
