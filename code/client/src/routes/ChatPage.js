import React, { useCallback } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import "../styles.css";
import WebIM from "../WebIM";
import { useRef, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext";
import axios from "axios";

function OutgoingMessage(props) {
  const { userProfileData } = props;
  return (
    <div className="d-flex flex-column mb-2">
      <div className="d-flex  mb-2 ">
        <img
          src={`/api/${userProfileData.profile_img}`}
          className="rounded-circle me-2"
          alt="User Avatar"
          height={35}
          width={35}
        />
        <div
          className="rounded bg-light text-black py-2 px-3"
          style={{ wordBreak: "break-word" }}
        >
          {props.msg}
        </div>
      </div>
      <div className="d-flex justify-content-start small mb-1">
        {`${props.time}`}
      </div>
    </div>
  );
}

function IncomingMessage(props) {
  return (
    <div className="d-flex flex-column mb-2">
      <div className="d-flex justify-content-end mb-2">
        <div
          className="rounded chatb text-white py-2 px-3 ms-auto"
          style={{ wordBreak: "break-word" }}
        >
          {props.msg}
        </div>
        <img
          src={
            `/api/${props.profileImg}` || "https://via.placeholder.com/35x35"
          }
          className="rounded-circle ms-2"
          alt="User Avatar"
          height={35}
          width={35}
        />
      </div>
      <div className="d-flex justify-content-end small mb-1">{`${props.time}`}</div>
    </div>
  );
}

function ChatPage() {
  const { userData, userProfileData } = useContext(AuthContext);

  const params = useParams();
  const wasRenderd = useRef(false);
  const messageEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState(""); // Add state for the profile image

  const connect = useCallback(
    (agoraToken) => {
      WebIM.conn.open({
        user: userData.username,
        agoraToken: agoraToken,
      });
    },
    [userData.username]
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    const txt = e.target[0].value;

    const option = {
      chatType: "singleChat",
      type: "txt",
      to: params.username,
      from: userData.username,
      msg: txt,
      ext: {
        // name:ext?.name,
        // color:ext?.color,
        // side:ext?.side,
        // userId:ext?.userId,
        // sender:ext.sender,
      },
    };
    const message = WebIM.message.create(option);
    WebIM.conn.send(message);
    // console.log(e.target[0].value);

    setMessages((m) => [...m, message]);
    setText("");
  };

  useEffect(() => {
    if (wasRenderd.current) return;
    console.log();
    wasRenderd.current = true;

    fetch(`/api/agora/get_token/user?uid=${userData.username}`)
      .then((res) => res.json())
      .then((res) => {
        connect(res.userToken);
      });
    WebIM.conn.addEventHandler(userData.username, {});
  }, [connect, userData.username]);

  useEffect(() => {
    axios
      .get(`/api/get-receiver-profile-image/?q=${params.username}`)
      .then((res) => {
        setProfileImg(res.data.profile_img);
        setName(res.data.user?.first_name + " " + res.data.user?.last_name);
      })
      .catch((error) => console.log(error));
  }, [params.username]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  WebIM.conn.listen({
    onTextMessage: (msg) => {
      setMessages((m) => [...m, msg]);
    },
  });

  // WebIM.conn.close() //to
  // window.addEventListener('popstate',handleDisconnect) //refresh
  // window.addEventListener('beforeunload',handleDisconnect) //back

  return (
    <>
      <Container className=" mt-2 mb-2">
        <Row>
          <Col>
            <div className="card blue shadow">
              <div className="card-header  ">
                <div className="d-flex align-items-center ">
                  <img
                    src={
                      `/api/${profileImg}` ||
                      "https://via.placeholder.com/35x35"
                    }
                    height={45}
                    width={45}
                    className="rounded-circle me-2"
                    alt="User Avatar"
                  />
                  <h3 className="mb-0">
                    <strong>{name}</strong>
                  </h3>
                </div>
              </div>
              <div
                className="card-body overflow-auto"
                style={{ height: "600px" }}
              >
                {messages.map((message) =>
                  message.from === userData.username ? (
                    <OutgoingMessage
                      userProfileData={userProfileData}
                      key={message.id}
                      msg={message.msg}
                      time={new Date(parseInt(message.time)).toLocaleTimeString(
                        "en-gb",
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    />
                  ) : (
                    <IncomingMessage
                      profileImg={profileImg}
                      key={message.id}
                      msg={message.sourceMsg}
                      time={new Date(parseInt(message.time)).toLocaleTimeString(
                        "en-gb",
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    />
                  )
                )}
                <div ref={messageEndRef} />
              </div>

              <div className="card-footer">
                <Form onSubmit={handleSendMessage}>
                  <InputGroup className="mb-3">
                    <FormControl
                      as="textarea"
                      rows={1}
                      value={text}
                      placeholder="Message"
                      aria-label="Message"
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                      style={{
                        resize: "none",
                        overflow: "auto",
                        maxHeight: "80px",
                      }}
                    />
                    <Button
                      id="button-addon2"
                      type="submit"
                      disabled={text === "" || /^\s+$/.test(text)}
                    >
                      <BsFillArrowLeftCircleFill
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      />
                    </Button>
                  </InputGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ChatPage;
