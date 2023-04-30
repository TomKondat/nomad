import React from "react";
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
function Header() {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/");
  };
  const handleClickProfile = () => {
    navigate("/profile");
  };
  const handleClickFriends = () => {
    navigate("/friends");
  };
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
            <Button
              variant="light"
              onClick={() => {
                handleClickHome();
              }}
            >
              <AiFillHome className="orange" />
            </Button>
            <Button
              variant="light"
              onClick={() => {
                handleClickProfile();
              }}
            >
              <BsFillPersonFill className="orange" />
            </Button>
            <Button
              variant="light"
              onClick={() => {
                handleClickFriends();
              }}
            >
              <FaUserFriends className="orange" />
            </Button>
          </div>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;
