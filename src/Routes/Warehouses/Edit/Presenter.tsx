import React from 'react';
import Helmet from 'react-helmet';
import EditData from '../../../components/Warehouses/Edit';

interface IEditDataProps {
  warehouseData: {
    name: string;
    space: number;
    address: string;
    addressDetail: string;
    description: string;
    availableWeekdays: number;
    openAt: string;
    closeAt: string;
    availableTimeDetail: string;
    cctvExist: boolean;
    doorLockExist: boolean;
    airConditioningType: string;
    workerExist: boolean;
    canPark: boolean;
    warehouseType: string;
    minReleasePerMonth: number;
    latitude: number;
    longitude: number;
    mainImageUrl: string;
    deliveryTypes: Array<string>;
    warehouseCondition: Array<string>;
    warehouseFacilityUsages: Array<string>;
    warehouseUsageCautions: Array<string>;
    images: Array<string>;
    status: string;
    insurances: Array<string>;
    securityCompanies: Array<string>;
    mainItemTypes: Array<string>;
    blogUrl?: string;
  };
}

const Presenter: React.FC<IEditDataProps> = ({ warehouseData }) => (
  <>
    <Helmet>
      <title>반창고 허브 | 창고 정보 수정</title>
    </Helmet>
    <EditData warehouseData={warehouseData} />
  </>
);

export default Presenter;
