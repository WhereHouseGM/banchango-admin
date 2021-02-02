import React from 'react';
import Presenter from './Presenter';
import Helmet from 'react-helmet';

const Estimates: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>반창고 허브 | 견적 요청 관리</title>
      </Helmet>
      <Presenter />
    </>
  );
};

export default Estimates;
