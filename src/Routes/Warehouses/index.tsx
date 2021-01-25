import React from 'react';
import Presenter from './Presenter';
import Helmet from 'react-helmet';

const Warehouses: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>반창고 허브 | 창고 관리</title>
            </Helmet>
            <Presenter />
        </>
    )
};

export default Warehouses;