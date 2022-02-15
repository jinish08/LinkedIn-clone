import styled from "styled-components";
import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import Chat from "./Chat";
import axios from "axios";
import { io } from "socket.io-client";

const Main = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const [friend, setFriend] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    const getFriend = async () => {
      try {
        const receiverId = await currentChat?.members.find(
          (member) => member !== user._id
        );
        const res = await axios.get("/users?userId=" + receiverId);
        setFriend(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    currentChat && getFriend();
  }, [currentChat?.members]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <Container>
        <Header>
          <HText>
            <p>
              {currentChat ? (
                <>
                  <span>{friend.username}</span>
                </>
              ) : (
                <span>Open a conversation to start a chat</span>
              )}
            </p>
            <img src={PF + "/ellipsis.svg"} alt="ellipsis" />
          </HText>
        </Header>
        <Body>
          <Wrapper>
            <Chats>
              {messages.map((message) => (
                <div key={message._id} ref={scrollRef}>
                  <Chat message={message} key={message._id} />
                </div>
              ))}
            </Chats>
            {currentChat && (
              <Bottom>
                <TextArea
                  placeholder="Write a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Send onClick={handleSubmit}>Send</Send>
              </Bottom>
            )}
          </Wrapper>
        </Body>
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const Header = styled.div`
  background-color: #fff;
`;

const HText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  border-radius: 0 10px 0 0;
  p {
    display: flex;
    flex-direction: column;
    margin: 5px 0;
    span {
      text-align: left;
      margin: 8px 0;
      &:first-child {
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }
      &:nth-child(2) {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 0 5px 5px 0;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const Body = styled.div`
  margin-top: 1px;
  flex: 5.5;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
`;

const Chats = styled.div`
  height: 67vh;
  overflow-y: scroll;
  padding-right: 10px;
  background-color: #fff;
`;

const Bottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  margin-top: 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 90px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  border-left: none;
  border-right: none;
  border-color: rgba(0, 0, 0, 0.3);
`;

const Send = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #0a66c2;
  color: white;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export default Main;
