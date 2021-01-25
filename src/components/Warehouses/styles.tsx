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
  box-pack: center;
  justify-content: center;
  box-align: center;
  box-orient: vertical;
  box-direction: normal;
  flex-direction: column;
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

export const Text = styled.div`
  font-family: sans-serif;
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
  font-family: sans-serif;
  font-weight: bold;
  width: ${(props) => props.width};
  font-size: 12px;
  text-align: center;
`;

export const WarehouseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Status = styled.div<{ color: string }>`
  width: 10%;
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => props.color};
  text-align: center;
`;

export const WarehouseInformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  width: 60%;
`;

export const Name = styled.div`
  font-size: 12px;
  font-weight: bold;
  text-align: center;
`;

export const ButtonsContainer = styled.div``;

export const Button = styled(Link)`
  text-align: center;
  padding: 1px;
  color: black;
  font-size: 8px;
  margin-right: 2px;
  border: 1px solid ${(props) => props.theme.blueColor};
  border-radius: 2px;
`;

export const Date = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  width: 30%;
`;

export const ShowMoreButton = styled.div`
  align-self: center;
  flex: 1;
  justify-self: center;
  padding: 15px;
  margin-top: 20px;
  width: 30%;
  font-size: 20px;
  border-radius: 20px;
  color: white;
  background-color: #2e559a;
  font-weight: bold;
  cursor: pointer;
`;
