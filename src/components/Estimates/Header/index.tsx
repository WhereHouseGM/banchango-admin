import React from 'react';
import { List, Item, SLink, Header } from './styles';

interface IHeaderComponentProps {
  handleClick: () => void;
  estimateStatus: string;
}

const HeaderComponent: React.FC<IHeaderComponentProps> = ({
  handleClick,
  estimateStatus,
}) => {
  return (
    <Header>
      <List>
        <Item current={'ALL' === estimateStatus}>
          <SLink to="/warehouses/ALL" onClick={handleClick}>
            전체
          </SLink>
        </Item>
        <Item current={'IN_PROGRESS' === estimateStatus}>
          <SLink to="/warehouses/IN_PROGRESS" onClick={handleClick}>
            접수
          </SLink>
        </Item>
        <Item current={'VIEWABLE' === estimateStatus}>
          <SLink to="/warehouses/VIEWABLE" onClick={handleClick}>
            승인
          </SLink>
        </Item>
        <Item current={'REJECTED' === estimateStatus}>
          <SLink to="/warehouses/REJECTED" onClick={handleClick}>
            반려
          </SLink>
        </Item>
        <Item current={'DELETED' === estimateStatus}>
          <SLink to="/warehouses/DELETED" onClick={handleClick}>
            삭제
          </SLink>
        </Item>
      </List>
    </Header>
  );
};

export default HeaderComponent;
