import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const Person = ({ friend }) => {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [isConnected, setIsConnected] = useState(user.following.includes(friend._id));

  const connectHandler = async () => {
    console.log(isConnected);
    try {
      if (!isConnected) {
        await axios.put("/users/" + friend._id + "/follow", { userId: user._id });
        dispatch({ type: "FOLLOW", payload: friend._id });
        setIsConnected(true);
      } else {
        await axios.put("/users/" + friend._id + "/unfollow", { userId: user._id });
        dispatch({ type: "UNFOLLOW", payload: friend._id });
        setIsConnected(false);
      }
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <Photo
            src={friend.profilePicture || PF + "/user.svg"}
            width="120px"
            height="120px"
          />
          <Link>{friend.username}</Link>
          <p>{friend.desc}</p>
        </UserInfo>
        <Widget>
          <input type="button" value={isConnected?"remove connection":"connect"} onClick={connectHandler} />
        </Widget>
      </ArtCard>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 8px;
  min-width: 150px;
  max-width: 168px;
  flex: 1 1 auto;
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
  p {
    padding: 0;
    margin: 0;
    font-size: 13px;
    color: #828282;
  }
`;

const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;

const Photo = styled.img`
  box-shadow: none;
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.2);
  margin: -38px auto 2px;
  border-radius: 50%;
`;

const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const Widget = styled.div`
  input[type="button"] {
    cursor:pointer;
    padding: 7px 20px;
    border-radius: 20px;
    border: 1px solid #0a66c2;
    color:#0a66c2;
    width: 90%;
    margin-bottom: 10px;
    background: transparent;
  }
`;

export default Person;
