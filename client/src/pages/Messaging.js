import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Home/Header";
import LeftSide from "../components/Messaging/LeftSide";
import Main from "../components/Messaging/Main";
import RightSide from "../components/Messaging/RightSide";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";


const Messaging = () => {
  const { user } = useContext(AuthContext);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);


  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);


  return (
    <>
      <Container>
        <Header page={"messaging"} />
        <Layout>
          <LeftSide
            conversations={conversations}
            setCurrentChat={setCurrentChat}
          />
          <Main
            currentChat={currentChat}
          />
          <RightSide />
        </Layout>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.03);
`;

const Layout = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 6fr) minmax(0, 11fr) minmax(300px, 7fr);
  /* column-gap: 15px; */
  grid-template-rows: auto;
  margin: 0 12%;
  padding-top: 60px;

  @media (max-width: 768px) {
    margin: 5%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Messaging;
