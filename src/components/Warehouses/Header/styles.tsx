import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const List = styled.ul`
  display: flex;
  padding: 0;
`;

export const Item = styled.li<{ current: boolean }>`
  flex: 1;
  text-align: center;
  border-bottom: 2px solid
    ${(props) => (props.current ? props.theme.blueColor : 'transparent')};
  transition: border-bottom 0.3s ease-in-out;
  list-style: none;
  font-weight: ${(props) => (props.current ? 'bold' : 'normal')};
  color: ${(props) => (props.current ? props.theme.blueColor : 'black')};
`;

export const SLink = styled(Link)`
  align-items: center;
  justify-content: center;
  color: black;
  text-decoration: none;
`;

export const Header = styled.header`
  color: white;
  margin-top: 10px;
  width: 100%;
  height: 50px;
`;
