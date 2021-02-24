import React from 'react';
import {
  Container,
  ImageContainer,
  InformationContainer,
  Wrapper,
  Image,
} from './styles';
import LogoImage from '../../assets/LOGO.png';
import ErrorPage from '../Common/ErrorPage';

interface IUserInfo {
  userId: number;
  name: string;
  email: string;
  type: string;
  companyName: string;
  phoneNumber?: string;
  telephoneNumber: string;
}

interface IApiResult {
  users: Array<IUserInfo>;
}

const Users: React.FC = () => {
  const token = localStorage.getItem('AccessToken') || 'abc';

  if (token === null) {
    return (
      <ErrorPage
        title="잘못된 접근입니다."
        message="로그인을 먼저 해주세요."
        locationToGo="/"
        buttonMessage="로그인"
      />
    );
  } else {
    return (
      <Container>
        <Wrapper>
          <InformationContainer>
            <ImageContainer>
              <Image logoImage={LogoImage}></Image>
            </ImageContainer>
          </InformationContainer>
        </Wrapper>
      </Container>
    );
  }
};

export default Users;
