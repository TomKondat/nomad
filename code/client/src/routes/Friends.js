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
import { BsFillPersonPlusFill } from "react-icons/bs";
import { TfiViewList } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { BsFillChatTextFill } from "react-icons/bs";

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
          <Button variant="outline-light" className="ms-auto">
            <BsFillChatTextFill className="orange" />
          </Button>
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
                src="https://scontent.ftlv20-1.fna.fbcdn.net/v/t39.30808-1/283797259_5732332996780286_8152176667643302543_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_ohc=sasfYWfk8i0AX9Q-33Z&_nc_ht=scontent.ftlv20-1.fna&oh=00_AfCUwL9RnWIzfX3oTSVSN6fbeY9SbHTUnHUS1xyBKoG91A&oe=64531BCE"
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
