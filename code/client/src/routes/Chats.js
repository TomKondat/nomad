import { useEffect, useState } from "react";
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
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../AuthContext";

function Chats() {
  const [showFriendList, setShowFriendList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [friendListQuery, setFriendListQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const handleClose = () => {
    setShowFriendList(false);
  };

  const handleShowFriendList = () => setShowFriendList(true);
  const { userProfileData } = useContext(AuthContext);

  async function getProfiles() {
    await axios
      .get(`/api/get-profiles/?q=${userProfileData?.user?.id}`)
      .then((res) => {
        setProfiles(res.data);
        filterProfiles(res.data);
      })
      .catch((error) => console.log(error));
  }

  function filterProfiles(profiles) {
    const filtered = profiles.filter((profile) =>
      `${profile.user?.first_name} ${profile.user?.last_name}${profile?.company}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredProfiles(filtered);
  }

  useEffect(() => {
    getProfiles();
  }, []);

  useEffect(() => {
    filterProfiles(profiles);
  }, [searchQuery, profiles]);

  return (
    <div>
      <Navbar bg="light" variant="light" className=" my-2">
        <Container>
          <div className="d-flex align-items-center gap-3 flex-grow-1">
            <FormControl
              type="text"
              placeholder="Search Chats"
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end">
            {/* <Button variant="light" onClick={handleShowFriendList}>
              <TfiViewList />
            </Button> */}
          </div>
        </Container>
      </Navbar>
      <header className="text-center my-3">
        <h1 className="display-4 blue ">
          <strong>Chats</strong>
        </h1>
      </header>

      {filteredProfiles.map((profile) => (
        <Card key={profile.id} className="mb-3 mt-2 shadow-sm">
          <Card.Body className="d-flex align-items-center">
            <Image
              src={`/api/${profile?.profile_img}`}
              width={70}
              height={70}
              roundedCircle
              className="me-3"
            />
            <div>
              <Card.Title className="mb-0">
                {profile.user?.first_name}&nbsp;
                {profile.user?.last_name}
              </Card.Title>
              <Card.Text className="text-muted">
                {profile?.position}
                <br /> <strong>{profile?.company}</strong>
              </Card.Text>
            </div>
            <LinkContainer to={`/chatpage/${profile?.user?.username}`}>
              <Button variant="outline-light" className="ms-auto" size="lg">
                <BsFillChatTextFill className="orange" />
              </Button>
            </LinkContainer>
          </Card.Body>
        </Card>
      ))}
      {/* search users */}
      {/* <Offcanvas show={showFriendList} onHide={handleClose} placement="start">
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
      </Offcanvas> */}
    </div>
  );
}

export default Chats;
