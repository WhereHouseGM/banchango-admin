import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Presenter from './Presenter';
import { message } from 'antd';
import Loading from '../../../components/Loading';
import { estimateApi } from '../../../api';
import { WRONG_TOKEN } from '../../../components/Common/static';

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
  const token = localStorage.getItem('AccessToken') || WRONG_TOKEN;
  const getApi = useCallback(() => {
    estimateApi
      .getEstimateData(token, parseInt(params.estimateId))
      .then(({ data }) => {
        setEstimateData(data);
        setLoading(false);
      })
      .catch(({ response: { status } }) => {
        message.destroy();
        if (status === 400) {
          message.error('[400] : 요청 형식이 잘못되었습니다.');
        } else if (status === 401) {
          message.error('[401] 토큰값이 잘못되었습니다. 다시 로그인 해주세요.');
        } else if (status === 403) {
          message.error('[403] : 로그인한 사용자가 관리자가 아닙니다.');
        } else if (status === 404) {
          message.error('[404] : 조회 결과가 없습니다.');
        } else {
          message.error(
            '알 수 없는 오류가 발생했습니다. 관리자에게 문의해 주세요.',
          );
        }
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
