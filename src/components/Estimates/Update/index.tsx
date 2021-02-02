import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Wrapper, InformationContainer } from './styles';

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

const UpdateData: React.FC<IUpdateDataProps> = ({ estimateData }) => {
  const params = useParams<{ estimateId: string }>();
  useEffect(() => {
    console.log(estimateData);
  }, []);
  return (
    <Container>
      <Wrapper>
        <InformationContainer>
          INFORMATIONS!, ID : {parseInt(params.estimateId)}
        </InformationContainer>
      </Wrapper>
    </Container>
  );
};

export default UpdateData;
