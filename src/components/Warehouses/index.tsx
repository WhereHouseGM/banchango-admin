import React from 'react';
import Header from './Header';
import {
  Container,
  Wrapper,
  InformationContainer,
  ImageContainer,
  Image,
  Text,
  NavBar,
  NavText,
  WarehouseContainer,
  Status,
  WarehouseInformationWrapper,
  Name,
  ButtonsContainer,
  Button,
  Date,
} from './styles';
import { statusToColor, statusToText } from './static';

import LogoImage from '../../assets/LOGO.png';

const Warehouses: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <InformationContainer>
          <ImageContainer>
            <Image logoImage={LogoImage}></Image>
          </ImageContainer>
          <Text>창고 정보 관리</Text>
          <Header />
          <NavBar>
            <NavText width={'10%'}>상태</NavText>
            <NavText width={'60%'}>창고 정보</NavText>
            <NavText width={'30%'}>최근 수정일</NavText>
          </NavBar>
          <WarehouseContainer>
            <Status color={statusToColor('DELETED')}>
              {statusToText('DELETED')}
            </Status>
            <WarehouseInformationWrapper>
              <Name>주식회사 꼬메이베베</Name>
              <ButtonsContainer>
                <Button to="/">정보</Button>
                <Button to="/">이미지</Button>
              </ButtonsContainer>
            </WarehouseInformationWrapper>
            <Date>2020-12-11 13:10</Date>
          </WarehouseContainer>
        </InformationContainer>
      </Wrapper>
    </Container>
  );
};

export default Warehouses;
