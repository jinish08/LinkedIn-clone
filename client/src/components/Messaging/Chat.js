import React, { useState,useEffect } from 'react'
import styled from "styled-components";
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import {format} from "timeago.js";

const Chat = ({own,message}) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + message.sender);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [message]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Container><a>
    <img src={user?.profilePicture || PF + "/user.svg"} alt="" />
    <div>
      <span>{user?.username}<span>.{format(message.createdAt)}</span></span>
      <span>{message?.text}</span>
    </div>
  </a></Container>
  )
}

const Container = styled.div`
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
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 15px;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          padding-bottom: 5px;
          span{
            margin-left: 10px;
            font-size: 13px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.6);
          }
        }
        &:nth-child(2) {
            padding-top: 5px;
          font-size: 15px;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }
  `;

export default Chat;