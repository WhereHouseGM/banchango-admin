import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Presenter from './Presenter';
import { warehouseApi } from '../../../api';
import Loading from '../../../components/Loading';
import { handleApiError, WRONG_TOKEN } from '../../../components/Common/static';

const Container: React.FC = () => {
  const params = useParams<{ warehouseId: string }>();
  const [loading, setLoading] = useState<Boolean>(true);
  const token = sessionStorage.getItem('AccessToken') || WRONG_TOKEN;
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
        handleApiError(status, '저장된 사진이 없습니다.');
        setLoading(false);
      });
  }, [params, token]);

  useEffect(() => {
    getApi();
  }, [getApi]);

  return <> {loading ? <Loading /> : <Presenter imageData={imageData} />}</>;
};

export default Container;
