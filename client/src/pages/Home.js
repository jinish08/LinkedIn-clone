import styled from "styled-components";
import Header from "../components/Home/Header";
import LeftSide from "../components/Home/LeftSide";
import Main from "../components/Home/Main";
import RightSide from "../components/Home/RightSide";

const Home = () => {
  return (
    <>
    <Container>
      <Header page={"home"}/>
      <Layout>
        <LeftSide />
        <Main />
        <RightSide />
      </Layout>
      </Container>
    </>
  );
};

const Container = styled.div`
background-color: rgba(0, 0, 0, 0.03);
`;

const Layout = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 15px;
  row-gap: 15px;
  grid-template-rows: auto;
  margin: 12%;
  margin-top:0;
  margin-bottom: 0;
  padding-top: 60px;

  @media (max-width: 768px) {
    margin:5%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Home;
