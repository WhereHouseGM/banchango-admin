import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  width: 90%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  line-height: 1.7;
  text-align: center;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  white-space: pre-wrap;
`;

const Body = styled.div`
  margin: 20px 0;
`;

const GoToMainPage = styled.div`
  margin-top: 20px;
  border-radius: 20px;
  border: 1px solid black;
  font-size: 20px;
  padding: 10px 20px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

interface IErrorPageProps {
    title: string;
    message: string;
    locationToGo?: string;
    newLocation?: string;
    buttonMessage: string;
}

const ErrorPage: React.FC<IErrorPageProps> = ({
  title,
  message,
  locationToGo,
  newLocation,
  buttonMessage,
}) => {
  const history = useHistory();
  return (
    <Container>
      <Title>{title}</Title>
      <Body>{message}</Body>
      <GoToMainPage
        onClick={() => {
            if(locationToGo !== null && locationToGo !== undefined) {
                history.push(locationToGo);
            } else if(newLocation !== null && newLocation !== undefined) {
                window.open(newLocation);
            }
        }}
      >
        {buttonMessage}
      </GoToMainPage>
    </Container>
  );
};


export default ErrorPage;
