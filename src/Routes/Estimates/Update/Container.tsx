import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Presenter from './Presenter';
import { message } from 'antd';
import Loading from '../../../components/Loading';
import { estimateApi } from '../../../api';
import { handleApiError, WRONG_TOKEN } from '../../../components/Common/static';

const Container: React.FC = () => {
  const params = useParams<{ estimateId: string }>();
  const [loading, setLoading] = useState(true);
  const [estimateData, setEstimateData] = useState({
    id: -1,
    content: '',
    status: '',
    monthlyAverageRelease: -1,
    warehouseName: '',
    user: {
      userId: -1,
      name: '',
      email: '',
      type: '',
      phoneNumber: '',
      telephoneNumber: '',
      companyName: '',
      role: '',
      isDeleted: false,
    },
    items: [
      {
        id: -1,
        name: '',
        keepingNumber: -1,
        weight: -1,
        sku: -1,
        barcode: '',
        url: '',
        perimeter: -1,
        keepingType: '',
      },
    ],
  });
  const token = sessionStorage.getItem('AccessToken') || WRONG_TOKEN;
  const getApi = useCallback(() => {
    estimateApi
      .getEstimateData(token, parseInt(params.estimateId))
      .then(({ data }) => {
        setEstimateData(data);
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
    <> {loading ? <Loading /> : <Presenter estimateData={estimateData} />} </>
  );
};

export default Container;
