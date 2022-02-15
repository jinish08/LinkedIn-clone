import styled from "styled-components";
import {AuthContext} from '../../context/AuthContext'
import React , {useContext} from "react";
import { Link } from "react-router-dom";

const LeftSide = () => {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo src={user.profilePicture || PF+ "/user.svg"} width="120px" height="120px"/>
            {/* <Photo /> */}
            <Link1>{user.username}</Link1>
          </a>
          <a>
            <AddPhotoText>{user.desc}</AddPhotoText>
          </a>
        </UserInfo>
        <Widget>
          <Link to="/network">
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src={PF+"/widget-icon.svg"} alt="icon" />
          </Link>
        </Widget>
        <Item>
          <span>
            <img src={PF+"/item-icon.svg"} alt="icon" />
            <span>My Items</span>
          </span>
        </Item>
      </ArtCard>

      <CommunityCard>
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>
            Events
            <img src={PF+"/plus-icon.svg"} alt="plus" />
          </span>
        </a>
        <a>
          <span>Follow Hashtags</span>
        </a>
        <a>
          <span>Discover more</span>
        </a>
      </CommunityCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: leftside;
  @media (max-width: 768px) {
    display: none;
  }
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
  background: url("http://localhost:8800/images/card-bg.svg");
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

const Link1 = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rbga(0, 0, 0, 0.9);
  font-weight: 600;
`;

const AddPhotoText = styled.div`
  color: rgba(0, 0, 0, 0.6);
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.33;
  font-weight: 400;
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

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }

  svg {
    color: rgba(0, 0, 0, 1);
  }
`;

const Item = styled.div`
  border-color: rgba(0, 0, 0, 0.8);
  text-align: left;
  font-size: 12px;
  padding: 12px;
  display: block;
  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);
    svg {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const CommunityCard = styled(ArtCard)`
  padding: 8px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  a {
    color: black;
    padding: 4px 12px 4px 12px;
    font-size: 12px;

    &:hover {
      color: #0a66c2;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      border-top: 1px solid #d6cec2;
      padding: 12px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;

export default LeftSide;
