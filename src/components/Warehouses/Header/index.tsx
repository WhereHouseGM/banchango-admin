import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { List, Item, SLink, Header } from './styles';

const HeaderComponent: React.FC<RouteComponentProps> = (props) => {
  const {
    location: { pathname },
  } = props;
  console.log(props);

  return (
    <Header>
      <List>
        <Item current={pathname === '/warehouses/ALL'}>
          <SLink to="/warehouses/ALL">전체</SLink>
        </Item>
        <Item current={pathname === '/warehouses/IN_PROGRESS'}>
          <SLink to="/warehouses/IN_PROGRESS">접수</SLink>
        </Item>
        <Item current={pathname === '/warehouses/VIEWABLE'}>
          <SLink to="/warehouses/VIEWABLE">승인</SLink>
        </Item>
        <Item current={pathname === '/warehouses/REJECTED'}>
          <SLink to="/warehouses/REJECTED">반려</SLink>
        </Item>
        <Item current={pathname === '/warehouses/DELETED'}>
          <SLink to="/warehouses/DELETED">삭제</SLink>
        </Item>
      </List>
    </Header>
  );
};

export default withRouter(HeaderComponent);
