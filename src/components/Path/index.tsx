import React from 'react';
import {
  Container,
  Wrapper,
  PathContainer,
  ImageContainer,
  Image,
  ButtonContainer,
  Button,
} from './styles';
import LogoImage from '../../assets/LOGO.png';

const Path: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <PathContainer>
          <ImageContainer>
            <Image logoImage={LogoImage}></Image>
          </ImageContainer>
          <ButtonContainer>
            <Button to="/estimates/ALL">견적 요청 관리</Button>
            <Button to="/warehouses/ALL">창고 정보 관리</Button>
            <Button to="/">회원 정보 조회</Button>
          </ButtonContainer>
        </PathContainer>
      </Wrapper>
    </Container>
  );
};

export default Path;
