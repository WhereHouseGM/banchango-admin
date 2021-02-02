import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Wrapper, InformationContainer } from './styles';

const UpdateData: React.FC = () => {
  const params = useParams<{ estimateId: string }>();

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
