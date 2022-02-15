import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Contact = ({conversation}) => {

    const { user:currentUser } = useContext(AuthContext);

    const [user, setUser] = useState(null);

    useEffect(() => {
      const friendId = conversation.members.filter(user => user !== currentUser._id);
      const getUser = async () => {
        try {
          const res = await axios("/users?userId=" + friendId);
          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }, [currentUser,conversation]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Container><a>
    <img src={user?.profilePicture || PF + "/user.svg"} alt="" />
    <div>
      <span>{user?.username}</span>
      <span>{user?.desc}</span>
    </div>
  </a></Container>
  )
}

const Container = styled.div`
&:hover{
    background-color: #f5f5f5;
    border-left: 4px solid green;
}
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  min-height: 65px;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
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
  }
  `;

export default Contact;