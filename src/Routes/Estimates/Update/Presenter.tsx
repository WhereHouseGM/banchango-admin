import React from 'react';
import Helmet from 'react-helmet';
import UpdateData from '../../../components/Estimates/Update';

interface IUser {
  userId: number;
  name: string;
  email: string;
  type: string;
  phoneNumber: string;
  telephoneNumber: string;
  companyName: string;
  role: string;
  isDeleted: boolean;
}

interface IItem {
  id: number;
  name: string;
  keepingNumber: number;
  weight: number;
  barcode: string;
  sku: number;
  url?: string;
  perimeter: number;
  keepingType: string;
}

interface IUpdateDataProps {
  estimateData: {
    id: number;
    content: string;
    status: string;
    monthlyAverageRelease: number;
    user: IUser;
    warehouseName: string;
    items: Array<IItem>;
  };
}

const Presenter: React.FC<IUpdateDataProps> = ({ estimateData }) => (
  <>
    <Helmet>
      <title>반창고 허브 | 견적 요청 갱신</title>
    </Helmet>
    <UpdateData estimateData={estimateData} />
  </>
);

export default Presenter;
