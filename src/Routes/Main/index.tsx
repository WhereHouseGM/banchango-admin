import React from 'react';
import Presenter from './Presenter';
import Helmet from 'react-helmet';

const Main: React.FC = () => {
  return (
    <>
    <Helmet>
      <title>반창고 허브 | 어드민 페이 </title>
    </Helmet>
  <Presenter />
  </>
  )
};

export default Main;
