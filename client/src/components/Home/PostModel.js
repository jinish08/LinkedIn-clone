import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const PostModal = (props) => {
  const editorText = useRef();
  const [sharedImage, setSharedImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setSharedImage(image);
  };

  const switchAssetArea = (area) => {
    setSharedImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: editorText.current.value,
    };
    if (sharedImage !== "") {
      const data = new FormData();
      const fileName = Date.now() + sharedImage.name;
      data.append("name", fileName);
      data.append("file", sharedImage);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={() => props.handleClick()}>
                <img src={PF + "/close-icon.png"} alt="" />
              </button>
            </Header>

            <SharedContent>
              <UserInfo>
                <img src={user.profilePicture || PF + "/user.svg"} alt="" />
                <span>{user.username}</span>
              </UserInfo>

              <Editor>
                <textarea
                  ref={editorText}
                  placeholder="What do you want to talk about?"
                  onFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jgp, image/png, image/jpeg"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file" style={{ cursor: "pointer" }}>
                        Select an image
                      </label>
                    </p>

                    {sharedImage && (
                      <img src={URL.createObjectURL(sharedImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please upload a video"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>

            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img
                    src={PF + "/photo-icon2.png"}
                    alt=""
                    height="26px"
                    width="26px"
                  />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img
                    src={PF + "/video-icon2.png"}
                    alt=""
                    height="26px"
                    width="26px"
                  />
                </AssetButton>
              </AttachAssets>

              <ShareComment>
                <AssetButton>
                  <img
                    src={PF + "/share-icon.png"}
                    alt=""
                    height="26px"
                    width="26px"
                  />
                  Anyone
                </AssetButton>
              </ShareComment>

              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: #000000;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: #fff;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 28px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 48px;
    width: 40px;
    min-width: auto;
    border: none;
    cursor: pointer;
    /* color: rgba(0, 0, 0, 0.15); */
    background-color: transparent;
    i26 {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
    margin-right: 5px;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  margin: 0 2px;
  color: rgba(0, 0, 0, 0.8);
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    img {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.5)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "#fff")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
    cursor: ${(props) => (props.disabled ? "none" : "pointer")};
    outline: none !important;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    font-family: "Courier New", Courier, monospace;
    border: none;
    &:focus {
      outline: none;
    }
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

export default PostModal;
