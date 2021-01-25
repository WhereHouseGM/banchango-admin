import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const List = styled.ul`
    display: flex;
`;

export const Item = styled.li<{current: boolean}>`
    width: 80px;
    height: 50px;
    text-align: center;
    border-bottom: 2px solid ${props => props.current ? props.theme.blueColor : 'transparent'};
    transition: border-bottom .3s ease-in-out;
`;

export const SLink = styled(Link)`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Header = styled.header`
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    z-index: 10;
    box-shadow : 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;