import React from 'react';
import { Helmet } from 'react-helmet';
import Presenter from './Presenter';

const Users: React.FC = () => (
  <>
    <Helmet>
      <title>반창고 허브 | 회원 정보 조회</title>
    </Helmet>
    <Presenter />
  </>
);

export default Users;
