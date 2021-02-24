import React, { useCallback, useEffect, useState } from 'react';
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
import { userApi } from '../../api';
import { message } from 'antd';
import { ShowMoreButton } from '../Warehouses/styles';

interface ApiResult {
  name: string;
  email: string;
  companyName?: string;
  phoneNumber: string;
  telephoneNumber?: string;
  type: string;
}

const Users: React.FC = () => {
  const token = localStorage.getItem('AccessToken') || 'abc';
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<Array<ApiResult>>([]);
  const [isExtraLoading, setIsExtraLoading] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const convertTypeToText = (type: string): string => {
    if (type === 'OWNER') {
      return '창고주';
    } else if (type === 'SHIPPER') {
      return '화주';
    } else return '알 수 없음';
  };

  const getApi = useCallback(async () => {
    userApi
      .getUsers(token, pageIndex, 10)
      .then(({ data }) => {
        if (isExtraLoading) {
          setResults((prevResults) => [...prevResults, ...data]);
        } else {
          setResults(data);
        }
      })
      .catch(({ response: { status } }) => {
        if (status === 401 || status === 403) {
          message.warning('토큰에 문제가 있습니다. 로그인을 다시 해주세요.');
        } else {
          alert(`[${status}] : 알 수 없는 오류가 발생했습니다.`);
        }
      });
  }, [pageIndex, isExtraLoading, setResults, token]);

  useEffect(() => {
    getApi();
  }, [getApi]);

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
              <Text width={'30%'}>이메일</Text>
              <Text width={'18%'}>휴대폰 번호</Text>
              <Text width={'20%'}>유선 전화 번호</Text>
              <Text width={'15%'}>회원 유형</Text>
              <Text width={'20%'}>회사(창고)명</Text>
            </TextContainer>
            {results.length !== 0
              ? results.map((result, idx) => {
                  return (
                    <TextContainer key={idx}>
                      <Text width={'20%'}>{result.name}</Text>
                      <Text width={'30%'}>{result.email}</Text>
                      <Text width={'18%'}>{result.phoneNumber}</Text>
                      <Text width={'20%'}>
                        {result.telephoneNumber
                          ? result.telephoneNumber
                          : '없음'}
                      </Text>
                      <Text width={'15%'}>
                        {convertTypeToText(result.type)}
                      </Text>
                      <Text width={'20%'}>
                        {result.companyName ? result.companyName : '없음'}
                      </Text>
                    </TextContainer>
                  );
                })
              : null}
            {results.length % 10 === 0 && results.length !== 0 ? (
              <ShowMoreButton
                onClick={() => {
                  setPageIndex(pageIndex + 1);
                  setIsExtraLoading(true);
                }}
              >
                더 보기
              </ShowMoreButton>
            ) : null}
          </InformationContainer>
        </Wrapper>
      </Container>
    );
  }
};

export default Users;
