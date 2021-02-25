import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Presenter from './Presenter';
import { message } from 'antd';
import { warehouseApi } from '../../../api';
import Loading from '../../../components/Loading';
import { WRONG_TOKEN } from '../../../components/Common/static';

const Container: React.FC = () => {
  const params = useParams<{ warehouseId: string }>();
  const [loading, setLoading] = useState<Boolean>(true);
  const token = localStorage.getItem('AccessToken') || WRONG_TOKEN;
  const [imageData, setImageData] = useState({
    warehouseName: '',
    images: [
      {
        url: '',
        isMain: false,
      },
    ],
  });

  const getApi = useCallback(() => {
    warehouseApi
      .getWarehouseImages(token, parseInt(params.warehouseId))
      .then(({ data }) => {
        setImageData(data);
        setLoading(false);
      })
      .catch(({ response: { status } }) => {
        if (status === 401) {
          message.error(
            '[401] : 토큰값이 잘못되었습니다. 다시 로그인 해주세요.',
          );
        } else if (status === 403) {
          message.error('[403] : 로그인한 사용자가 관리자가 아닙니다.');
        } else if (status === 404) {
          message.error('[404] : 저장된 사진이 없습니다.');
        } else {
          message.error(
            `[${status}] : 알 수 없는 오류가 발생했습니다. 관리자에게 문의해 주세요.`,
          );
        }
        setLoading(false);
      });
  }, [params, token]);

  useEffect(() => {
    getApi();
  }, [getApi]);

  return <> {loading ? <Loading /> : <Presenter imageData={imageData} />}</>;
};

export default Container;
