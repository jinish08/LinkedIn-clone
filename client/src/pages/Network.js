import Header from "../components/Home/Header";
import styled from "styled-components";
import LeftSide from "../components/Network/LeftSide";
import Main from "../components/Network/Main";

const Network = () => {
  return (
    <>
    <Container>
      <Header page={"network"}/>
      <Layout>
        <LeftSide />
        <Main />
      </Layout>
      </Container>
    </>
  );
};

const Container = styled.div`
background-color: rgba(0, 0, 0, 0.05);
`;

const Layout = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: grid;
  grid-template-areas: "leftside main";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-rows: auto;
  margin-right: 13%;
  margin-left: 14%;
  height:700px;
  padding-top: 70px;

  @media (max-width: 768px) {
    margin-top: 50px;
    margin-right: 6%;
  margin-left: 7%;
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
export default Network