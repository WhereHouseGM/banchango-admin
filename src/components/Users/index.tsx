import React, { useState } from 'react';
import {
  Container,
  ImageContainer,
  InformationContainer,
  Wrapper,
  Image,
  HeaderText,
  SearchContainer,
  SearchInput,
  SearchButton,
  TextContainer,
  Text,
} from './styles';
import LogoImage from '../../assets/LOGO.png';
import ErrorPage from '../Common/ErrorPage';

interface ApiResult {
  name: string;
  email: string;
  companyName: string;
  phoneNumber?: string;
  telephoneNumber: string;
}

const Users: React.FC = () => {
  const token = localStorage.getItem('AccessToken') || 'abc';
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<Array<ApiResult>>([]);
  const [isExtraLoading, setIsExtraLoading] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>();

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
            <HeaderText>회원 정보 조회</HeaderText>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="창고 명으로 검색"
                onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                  setSearchQuery(event.currentTarget.value);
                }}
              />
              <SearchButton>검색</SearchButton>
            </SearchContainer>
            <TextContainer>
              <Text width={'20%'}>이름</Text>
              <Text width={'20%'}>이메일</Text>
              <Text width={'20%'}>휴대폰 번호</Text>
              <Text width={'20%'}>유선 전화 번호</Text>
              <Text width={'20%'}>회사(창고)명</Text>
            </TextContainer>
          </InformationContainer>
        </Wrapper>
      </Container>
    );
  }
};

export default Users;
