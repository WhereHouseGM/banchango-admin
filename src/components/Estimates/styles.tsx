import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 100%;
  overflow: auto;
`;

export const ImageContainer = styled.div`
  background-color: inherit;
  height: 70px;
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
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

export const InformationContainer = styled.div`
  background-color: white;
  width: 375px;
  min-height: 500px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #d5d5d5;
`;

export const Image = styled.div<{ logoImage: string }>`
  width: 150px;
  height: 45px;
  background-image: url(${(props) => props.logoImage});
  background-size: contain;
  align-self: flex-start;
  margin-left: 10px;
  background-repeat: no-repeat;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const ToPathButton = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.lightBlueColor};
  transition: all 0.2s;
  color: white;
  align-self: flex-end;
  border-radius: 8px;
  font-size: 13px;
  padding: 5px;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.blueColor};
  }
  margin-right: 3px;
`;

export const LogoutButton = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.lightBlueColor};
  transition: all 0.2s;
  color: white;
  align-self: flex-end;
  padding: 5px;
  border-radius: 8px;
  font-size: 13px;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.blueColor};
  }
`;

export const Text = styled.div`
  margin-left: 10px;
  font-weight: bold;
`;

export const NavBar = styled.div`
  display: flex;
  &:first-child {
    margin-left: 150px;
  }
  margin-bottom: 15px;
`;

export const NavText = styled.div<{ width: string }>`
  font-weight: bold;
  width: ${(props) => props.width};
  font-size: 12px;
  text-align: center;
`;

export const EstimateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

export const Status = styled.div<{ color: string }>`
  width: 10%;
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => props.color};
  text-align: center;
`;

export const Name = styled(Link)`
  font-size: 12px;
  font-weight: bold;
  width: 60%;
  text-align: center;
  color: black;
`;

export const Date = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  width: 30%;
`;

export const ShowMoreButton = styled.div`
  align-self: center;
  justify-self: center;
  padding: 5px;
  margin: 20px auto 5px auto;
  text-align: center;
  width: 120px;
  font-size: 14px;
  border-radius: 5px;
  color: white;
  background-color: #2e559a;
  font-weight: bold;
  cursor: pointer;
`;
