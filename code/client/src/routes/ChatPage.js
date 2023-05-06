import React from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import "./BigLogo.css";
import WebIM from "../WebIM";
import { useRef, useEffect, useState } from "react";

function ChatPage() {
  const [messages, setMessages] = useState([]);

  const wasRenderd = useRef(false);

  useEffect(() => {
    if (wasRenderd.current) return;
    wasRenderd.current = true;
    connect();
  }, []);

  const connect = () => {
    WebIM.conn.open({
      user: "tom",
      agoraToken:
        "007eJxTYPh0T/ywn+T8jjlbnp/iOndWRHNe8hWjrrfRMvkNE/s+r3JVYLAwNkpNTrJIMTFJTjNJNUi2ME4zNrQ0M7cwTDOzSE4y2G4UltIQyMgwZ7kXAyMDKxAzMoD4KgxmSabG5obmBrqpSWnJuoaGqSm6FqlmabqmpqZG5qZpKWkpBoYAD0Eotw==",
    });
  };

  WebIM.conn.addEventHandler("tom", {});

  WebIM.conn.listen({
    onTextMessage: (msg) => {
      setMessages((m) => [...m, msg]);
    },
  });

  // WebIM.conn.close() //to
  // window.addEventListener('popstate',handleDisconnect) //refresh
  // window.addEventListener('beforeunload',handleDisconnect) //back

  const handleSendMessage = (e) => {
    e.preventDefault();
    const txt = e.target[0].value;

    const option = {
      chatType: "singleChat",
      type: "txt",
      to: "hen",
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
  };

  return (
    <>
      <Container className="h-100 mt-4">
        <Row className="h-100">
          <Col md={9} sm={12}>
            <div className="card blue shadow" style={{ height: "700px" }}>
              <div className="card-header  ">
                <div className="d-flex align-items-center ">
                  <img
                    src="https://via.placeholder.com/45x45"
                    height={45}
                    width={45}
                    className="rounded-circle me-2"
                    alt="User Avatar"
                  />
                  <h3 className="mb-0">Username</h3>
                </div>
              </div>
              <div className="card-body overflow-auto">
                <div className="d-flex flex-column mb-2">
                  <div className="d-flex justify-content-center mb-2">
                    <div> 4 May 2023</div>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src="https://via.placeholder.com/35x35"
                      className="rounded-circle me-2"
                      alt="User Avatar"
                      height={35}
                      width={35}
                    />
                    <div
                      className="rounded bg-primary text-white py-2 px-3"
                      style={{ wordBreak: "break-word" }}
                    >
                      hello.
                    </div>
                  </div>
                  <div className="d-flex justify-content-start small mb-1">
                    10:30 AM
                  </div>
                </div>
                <div className="d-flex flex-column mb-4">
                  <div className="d-flex align-items-center justify-content-end mb-2">
                    <div
                      className="rounded bg-secondary text-white py-2 px-3 ms-auto"
                      style={{ wordBreak: "break-word" }}
                    >
                      hi.
                    </div>
                    <img
                      src="https://via.placeholder.com/35x35"
                      className="rounded-circle ms-2"
                      alt="User Avatar"
                      height={35}
                      width={35}
                    />
                  </div>
                  <div className="d-flex justify-content-end small mb-1">
                    10:35 AM
                  </div>
                </div>
                {messages.map((message) => (
                  <div className="d-flex flex-column mb-4" key={message.id}>
                    <div className="d-flex align-items-center justify-content-end mb-2">
                      <div
                        className="rounded bg-secondary text-white py-2 px-3 ms-auto"
                        style={{ wordBreak: "break-word" }}
                      >
                        {message.sourceMsg}
                      </div>
                      <img
                        src="https://via.placeholder.com/35x35"
                        className="rounded-circle ms-2"
                        alt="User Avatar"
                        height={35}
                        width={35}
                      />
                    </div>
                    <div className="d-flex justify-content-end small mb-1">
                      10:35 AM
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-footer">
                <Form onSubmit={handleSendMessage}>
                  <InputGroup className="mb-3">
                    <FormControl placeholder="Message" aria-label="Message" />
                    <Button variant="primary" id="button-addon2" type="submit">
                      Send <BsFillArrowLeftCircleFill />
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
