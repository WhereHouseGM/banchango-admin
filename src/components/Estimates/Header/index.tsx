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
          <SLink to="/estimates/ALL" onClick={handleClick}>
            전체
          </SLink>
        </Item>
        <Item current={'RECEPTED' === estimateStatus}>
          <SLink to="/estimates/RECEPTED" onClick={handleClick}>
            접수
          </SLink>
        </Item>
        <Item current={'IN_PROGRESS' === estimateStatus}>
          <SLink to="/estimates/IN_PROGRESS" onClick={handleClick}>
            진행중
          </SLink>
        </Item>
        <Item current={'DONE' === estimateStatus}>
          <SLink to="/estimates/DONE" onClick={handleClick}>
            완료
          </SLink>
        </Item>
      </List>
    </Header>
  );
};

export default HeaderComponent;
