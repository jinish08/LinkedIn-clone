import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const desc = post.desc;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect (()=>{
    setIsLiked(post.likes.includes(currentUser._id));
  },[post.likes, currentUser._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("users?userId=" + post.userId);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <Article>
        <SharedActor>
          <a>
            <img src={user.profilePicture || PF + "/user.svg"} alt="" />
            <div>
              <span>{user.username}</span>
              <span>{user.desc}</span>
              <span>{format(post.createdAt)}</span>
            </div>
          </a>
          <button>
            <img src={PF+"/ellipsis.svg"} alt="ellipsis" />
          </button>
        </SharedActor>
        <Description>{desc}</Description>
        <SharedImg>
          <a>
            <img src={PF+"/"+post.img} alt="user" />
          </a>
        </SharedImg>
        <SocialCounts>
          <li>
            <button>
              <img
                src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                alt="like"
              />
              <img
                src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                alt="clap"
              />
              <span>{like}</span>
            </button>
          </li>
          <li>
            <a>2 comments</a>
          </li>
        </SocialCounts>
        <SocialActions>
          <button onClick={likeHandler} style={{padding:0}}>
            <img src={isLiked?PF+"/liked.png":"https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/20/000000/external-like-feedback-kmg-design-detailed-outline-kmg-design.png"} />
            {isLiked?<span style={{color:"#0a66c2"}}>Like</span>:<span style={{color:"rgba(0,0,0,0.9 )"}}>Like</span>}
          </button>
          <button>
            <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/20/000000/external-comment-chat-flatart-icons-outline-flatarticons-2.png" />
            <span >Comments</span>
          </button>
          <button>
            <img src="https://img.icons8.com/external-prettycons-lineal-prettycons/20/000000/external-forward-essentials-prettycons-lineal-prettycons.png" />
            <span>Share</span>
          </button>
          <button>
            <img src="https://img.icons8.com/external-outline-juicy-fish/20/000000/external-send-contact-us-outline-outline-juicy-fish.png" />
            <span>Send</span>
          </button>
        </SocialActions>
      </Article>
    </>
  );
};

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 15px 0;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
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
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(2) {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(3) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 5;
    background: transparent;
    border: none;
    outline: none;

    img {
      width: 20px;
      height: 20px;
      padding-bottom: 20px;
    }
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  justify-content: space-between;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  button {
    align-items: center;
    background-color: transparent;
    border: none;
  }
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
    img {
      width: 25px;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    
    
    border: none;
    background-color: #fff;
    img{
      max-height:28px;
      max-width:28px;
    }
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

export default Post;
