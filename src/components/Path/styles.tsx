import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  overflow: auto;
`;

export const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  box-align: center;
  align-items: center;
  box-pack: center;
  justify-content: center;
  width: 100%;
  display: flex;
  align-content: center;
`;

export const PathContainer = styled.div`
  background-color: white;
  width: 375px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #d5d5d5;
`;

export const ImageContainer = styled.div`
  background-color: inherit;
  height: 70px;
  display: flex;
  box-pack: center;
  justify-content: center;
  box-align: center;
  box-orient: vertical;
  box-direction: normal;
  flex-direction: column;
`;

export const Image = styled.div<{ logoImage: string }>`
  width: 150px;
  height: 45px;
  background-image: url(${(props) => props.logoImage});
  background-size: contain;
  align-self: center;
  background-repeat: no-repeat;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled(Link)`
  width: 90%;
  text-align: center;
  padding: 20px;
  font-size: 25px;
  line-height: 1.5;
  border: 1px solid ${(props) => props.theme.blueColor};
  border-radius: 3px;
  font-weight: bold;
  color: ${(props) => props.theme.blueColor};
  margin-bottom: 10px;
`;

export const LogoutButton = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.lightBlueColor};
  transition: all 0.2s;
  color: white;
  align-self: center;
  padding: 5px 10px 5px 10px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 5px;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.blueColor};
  }
`;
