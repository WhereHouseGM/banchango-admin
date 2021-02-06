import React from 'react';
import Helmet from 'react-helmet';
import EditImage from '../../../components/Warehouses/Images';

interface Image {
  url: string;
  isMain: boolean;
}

interface IEditImageProps {
  imageData: Array<Image>;
}

const Presenter: React.FC<IEditImageProps> = ({ imageData }) => (
  <>
    <Helmet>
      <title>반창고 허브 | 창고 사진 수정</title>
    </Helmet>
    <EditImage imageData={imageData} />
  </>
);

export default Presenter;
