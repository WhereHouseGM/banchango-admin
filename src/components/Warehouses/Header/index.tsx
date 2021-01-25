import React from 'react';
import { useParams } from 'react-router-dom';
import { List, Item, SLink, Header } from './styles';

interface IHeaderComponentProps {
    handleClick: () => void,
    warehouseStatus: string;
}

const HeaderComponent: React.FC<IHeaderComponentProps> = ({handleClick, warehouseStatus}) => {
    const params = useParams<{warehouseStatus: string}>();
  return (
    <Header>
      <List>
        <Item current={params.warehouseStatus === warehouseStatus}>
          <SLink to="/warehouses/ALL" onClick={handleClick}>전체</SLink>
        </Item>
        <Item current={params.warehouseStatus === warehouseStatus}>
          <SLink to="/warehouses/IN_PROGRESS" onClick={handleClick}>접수</SLink>
        </Item>
        <Item current={params.warehouseStatus === warehouseStatus}>
          <SLink to="/warehouses/VIEWABLE" onClick={handleClick}>승인</SLink>
        </Item>
        <Item current={params.warehouseStatus === warehouseStatus}>
          <SLink to="/warehouses/REJECTED" onClick={handleClick}>반려</SLink>
        </Item>
        <Item current={params.warehouseStatus === warehouseStatus}>
          <SLink to="/warehouses/DELETED" onClick={handleClick}>삭제</SLink>
        </Item>
      </List>
    </Header>
  );
};

export default HeaderComponent;
