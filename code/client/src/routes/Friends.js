import { useState } from "react";
import {
  Card,
  Image,
  Button,
  Offcanvas,
  Navbar,
  Container,
  FormControl,
} from "react-bootstrap";
import { TfiViewList } from "react-icons/tfi";
import { BsFillChatTextFill } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

function FriendsPage() {
  const [showFriendRequest, setShowFriendRequest] = useState(false);
  const [showFriendList, setShowFriendList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [friendListQuery, setFriendListQuery] = useState("");

  const handleClose = () => {
    setShowFriendRequest(false);
    setShowFriendList(false);
  };

  const handleShowFriendRequest = () => setShowFriendRequest(true);
  const handleShowFriendList = () => setShowFriendList(true);

  return (
    <div>
      <Navbar bg="light" variant="light" className=" my-2">
        <Container>
          <div className="d-flex align-items-center gap-3">
            <FormControl
              type="text"
              placeholder="Search Chats"
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button variant="light" onClick={handleShowFriendList}>
              <TfiViewList />
            </Button>
          </div>
        </Container>
      </Navbar>

      <Card className="mb-3 mt-2">
        <Card.Body className="d-flex align-items-center">
          <Image
            src="https://scontent.ftlv20-1.fna.fbcdn.net/v/t1.6435-9/96850622_3305316466145067_5235646729612689408_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=W9PTVgqSyb0AX-UEsW-&_nc_ht=scontent.ftlv20-1.fna&oh=00_AfCknNeRXKjBsDKp8ggVpRuQvF9PP68DK-iXgizE3OvaWA&oe=6475F7F6"
            width={60}
            height={60}
            roundedCircle
            className="me-3"
          />
          <div>
            <Card.Title className="mb-0">Ron Vak</Card.Title>
            <Card.Text className="text-muted">Amdocs</Card.Text>
          </div>
          <LinkContainer to="/chatpage/ronvak">
            <Button variant="outline-light" className="ms-auto">
              <BsFillChatTextFill className="orange" />
            </Button>
          </LinkContainer>
        </Card.Body>
      </Card>

      {/* search users */}
      <Offcanvas show={showFriendList} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormControl
            type="text"
            placeholder="Search"
            className="mb-3"
            value={friendListQuery}
            onChange={(e) => setFriendListQuery(e.target.value)}
          />
          <Card className="mb-3">
            <Card.Body className="d-flex align-items-center">
              <Image
                src="https://scontent.ftlv19-1.fna.fbcdn.net/v/t39.30808-6/283797259_5732332996780286_8152176667643302543_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kYQscuX-lEkAX-JtVlk&_nc_ht=scontent.ftlv19-1.fna&oh=00_AfAoBoXiIKNAIEdHc0ELAs2w68A03RlGYZDLBjTwBnVbWw&oe=645E26D0"
                width={60}
                height={60}
                roundedCircle
                className="me-3"
              />
              <div>
                <Card.Title className="mb-0">Peleg Swisa</Card.Title>
                <Card.Text className="text-muted">Microsoft</Card.Text>
              </div>
              <Button variant="outline-light" className="ms-auto">
                <BsFillChatTextFill className="orange" />
              </Button>
            </Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default FriendsPage;
