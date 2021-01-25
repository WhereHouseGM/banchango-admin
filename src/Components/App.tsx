import React from "react";
import styled from "styled-components";
import { Reset } from "styled-reset";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-size: contain;
  background-image: url("https://wallpaperaccess.com/full/16668.jpg");
  /* transform: scale(1.5); */
  position: relative;
  z-index: 1;
`;
const LoginBox = styled.div`
  width: 95%;
  max-width: 375px;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  line-height: 1.7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 10;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
const Desc = styled.div`
  margin-bottom: 15px;
`;
const InputBox = styled.input`
  padding: 5px;
  width: 80%;
  outline: none;
  margin-bottom: 15px;
`;
const SubmitButton = styled.div`
  width: 83%;
  border: 2px solid #1e56a0;
  color: #1e56a0;
  font-weight: bold;
  border-radius: 19px;
  padding: 3px 0;
`;

const App = () => {
  return (
    <div className="App">
      <Reset />
      <Container>
        <LoginBox>
          <img
            src={
              "https://user-images.githubusercontent.com/62606632/105474474-96a93280-5ce1-11eb-8b07-30e9c5c7cfac.png"
            }
            width="150px"
          />
          <Title>Sign In</Title>
          <Desc>Banchangohub Admin Page</Desc>
          <InputBox placeholder="ID" />
          <InputBox placeholder="Password" />
          <SubmitButton>Sign In</SubmitButton>
        </LoginBox>
      </Container>
    </div>
  );
};

export default App;
