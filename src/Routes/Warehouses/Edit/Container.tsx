import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Presenter from './Presenter';
import { warehouseApi } from '../../../api';
import { message } from 'antd';

const Container: React.FC = () => {
  const params = useParams<{ warehouseId: string }>();
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
  const token = localStorage.getItem('AccessToken') || 'abc';
  const getApi = useCallback(() => {
    message.loading('잠시만 기다려 주세요.');
    warehouseApi
      .getWarehouseData(token, parseInt(params.warehouseId))
      .then(({ data }) => {
        setWarehouseData(data);
      })
      .catch(({ response: { status } }) => {
        message.destroy();
        if (status === 400) {
          message.warning('[400] : 요청 형식이 잘못되었습니다.');
          return;
        } else if (status === 401) {
          message.warning(
            '[401] : 토큰값이 잘못되었습니다. 다시 로그인 해주세요.',
          );
        } else if (status === 403) {
          message.warning('[403] : 로그인한 사용자가 관리자가 아닙니다.');
        } else if (status === 404) {
          message.warning('[404] : 조회 결과가 없습니다.');
        } else {
          message.warning(
            '알 수 없는 오류가 발생했습니다. 관리자에게 문의해 주세요.',
          );
        }
      });
  }, [params, token]);

  useEffect(() => {
    getApi();
  }, [getApi]);

  return <Presenter warehouseData={warehouseData} />;
};

export default Container;
