import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Signup = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      username:username.current.value,
      email:email.current.value,
      password:password.current.value,
    }
    try{
      await axios.post("/auth/register",user);
      navigate("/login");
    } catch(err){
      console.log(err);
    }
  }

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Container>
      <Nav>
        <a href="/">
          <img src={PF+"/login-logo.svg"} alt="logo" />
        </a>
        <div>
          <Join href="/signup">Join now</Join>
          <SignIn href="/login">Sign in</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <Form onSubmit={handleClick}>
            <div>
              <Input type="text" required placeholder="Username" ref={username}/>
            </div>
            <div>
              <Input type="email" required placeholder="Email" ref={email}/>
            </div>
            <div>
              <Input type="password" required minLength="6" placeholder="Password" ref={password}/>
            </div>
            <div>
              <Button type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
          <a href="/login" style={{textDecoration:"none"}}>
          <p>Already have an account? Login In</p>
          </a>
          <img src={PF+"/login-hero.svg"} alt="hero" />
        </Hero>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 35px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  text-decoration:none;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
`;

const Section = styled.section`
  align-content: start;
  display: flex;
  min-height: 600px;
  padding-top: 60px;
  position: relative;
  flex-wrap: wrap;
  width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }

  img {
    z-index: -1;
    width: 500px;
    height: 670px;
    bottom: -10%;
    right: 0px;
    position: absolute;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.form`
margin-top:8%;
`;

const Input = styled.input`
  background: rgba(241, 241, 241, 0.7);
  width: 40%;
  padding: 14px;
  border-radius: 4px;
  border: 0;
  color: #3e3e3e;
  margin:10px 0;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: rgb(51, 89, 157);
  border: none;
  width: 42.5%;
  text-align: center;
  font-size:16px;
  padding: 14px;
  border-radius: 4px;
  color: white;
  margin:10px 0;
`;

export default Signup;