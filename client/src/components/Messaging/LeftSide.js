import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Contact from "./Contact";

const LeftSide = ({ conversations, setCurrentChat }) => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Container>
      <Header>
        <HText>
          <p>Messaging</p>
          <img src={PF + "/ellipsis.svg"} alt="ellipsis" />
        </HText>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img src={PF + "/search-icon.svg"} alt="icon" />
          </SearchIcon>
        </Search>
        <Users>
          {conversations.map((conversation) => (
            <div
              onClick={() => {
                setCurrentChat(conversation);
              }}
              key={conversation._id}
            >
              <Contact conversation={conversation} />
            </div>
          ))}
        </Users>
      </Header>
    </Container>
  );
};

const Container = styled.div`
  grid-area: leftside;
  height: 100%;
  /* @media (max-width: 768px) {
    display: none;
  } */
`;

const Header = styled.div`
  background-color: #fff;
`;

const HText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  border-radius: 10px 0 0 0;
  p {
    font-weight: 600;
    margin: 13px 0;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const Users = styled.div`
  height: 79vh;
  overflow-y: scroll;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  position: relative;
  & > div {
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 83%;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;

const SearchIcon = styled.span`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.15s;
`;

export default LeftSide;
