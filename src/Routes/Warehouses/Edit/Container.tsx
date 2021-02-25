import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Presenter from './Presenter';
import { warehouseApi } from '../../../api';
import { message } from 'antd';
import Loading from '../../../components/Loading';
import { handleApiError, WRONG_TOKEN } from '../../../components/Common/static';

const Container: React.FC = () => {
  const params = useParams<{ warehouseId: string }>();
  const [loading, setLoading] = useState<Boolean>(true);
  const [warehouseData, setWarehouseData] = useState({
    name: '',
    space: -1,
    address: '',
    addressDetail: '',
    description: '',
    availableWeekdays: -1,
    openAt: '',
    closeAt: '',
    availableTimeDetail: '',
    cctvExist: false,
    doorLockExist: false,
    airConditioningType: '',
    workerExist: false,
    canPark: false,
    warehouseType: '',
    minReleasePerMonth: -1,
    latitude: -1,
    longitude: -1,
    mainImageUrl: '',
    deliveryTypes: [''],
    warehouseCondition: [''],
    warehouseFacilityUsages: [''],
    warehouseUsageCautions: [''],
    images: [''],
    status: '',
    insurances: [''],
    securityCompanies: [''],
    mainItemTypes: [''],
    blogUrl: '',
  });
  const token = localStorage.getItem('AccessToken') || WRONG_TOKEN;
  const getApi = useCallback(() => {
    warehouseApi
      .getWarehouseData(token, parseInt(params.warehouseId))
      .then(({ data }) => {
        setWarehouseData(data);
        setLoading(false);
      })
      .catch(({ response: { status } }) => {
        message.destroy();
        handleApiError(status, '조회 결과가 없습니다.');
        setLoading(false);
      });
  }, [params, token]);

  useEffect(() => {
    getApi();
  }, [getApi]);

  return (
    <> {loading ? <Loading /> : <Presenter warehouseData={warehouseData} />}</>
  );
};

export default Container;
