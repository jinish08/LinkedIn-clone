import styled from "styled-components";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Person from "./Person";

const Main = () => {
  const [friends, setFriends] = useState([]);
  const [conntections, setConnections] = useState([]);
  const { user } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await axios.get("users/newfriends/" + user._id);
      setFriends(res.data);
    };
    fetchFriends();
  }, [user._id]);

  useEffect(() => {
    const fetchConnections = async () => {
      const res = await axios.get("users/friends/" + user._id);
      setConnections(res.data);
    };
    fetchConnections();
  },[user._id]);

  return (
    <>
      <Container>
        <MainBox>
          <span>
          <span>Your Connections</span>
          <span>Manage</span>
          </span>
          {conntections.map((conntection) => (
            <Person key={conntection._id} friend={conntection} />
          ))}
          {conntections.length === 0 && (<h3>You have no connections</h3>)}
        </MainBox>
        <MainBox>
          <span>
            <span>People you might know</span>
            <span>See all</span>
          </span>
          {friends.map((friend) => (
            <Person key={friend._id} friend={friend} />
          ))}
          {friends.length === 0 && (<h3>No connections available to connect</h3>)}
        </MainBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const MainBox = styled.div`
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 18px;
  margin-bottom: 18px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  span {
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
      color: rgba(0, 0, 0, 0.7);
      margin: 15px;
    }
    span:nth-child(2) {
      display: flex;
      justify-content: flex-end;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

export default Main;
