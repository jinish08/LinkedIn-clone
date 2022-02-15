import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

const LeftSide = () => {
  const { user } = useContext(AuthContext);
  const [conntections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      const res = await axios.get("users/friends/" + user._id);
      setConnections(res.data);
    };
    fetchConnections();
  },[user._id]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo
              src={user.profilePicture || PF + "/user.svg"}
              width="120px"
              height="120px"
            />
            <Link>Welcome, {user.username} !</Link>
          </a>
        </UserInfo>
        <Widget>
          <a>
            <div>
              <span>Connections</span>
            </div>
            <span>{conntections.length}</span>
          </a>
        </Widget>
      </ArtCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: leftside;
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: 2px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 0 1px rbg(0 0 0 /15%), 0 0 0 rbg(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
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
  margin: -38px auto 12px;
  border-radius: 50%;
`;

const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 0;

  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;

    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 14px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }

    span{
        color:rgba(0, 0, 0, 0.6)
    }
  }

  svg {
    color: rgba(0, 0, 0, 1);
  }
`;


export default LeftSide;
