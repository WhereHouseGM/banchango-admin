import React, { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';
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
  ShowMoreButton,
} from './styles';
import { statusToColor, statusToText } from './static';
import LogoImage from '../../assets/LOGO.png';
import { warehouseApi } from '../../api';
import ErrorPage from '../Common/ErrorPage';
import { message } from 'antd';

interface ApiResult {
  name: string;
  warehouseId: number;
  lastModifiedAt: string;
  status: string;
}

const Warehouses: React.FC = () => {
  const params = useParams<{ warehouseStatus: string }>();
  const [results, setResults] = useState<Array<ApiResult>>([]);
  const [isExtraLoading, setIsExtraLoading] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const token = localStorage.getItem('AccessToken') || 'abc';

  const getApi = useCallback(async () => {
    warehouseApi
      .getWarehouses(token, pageIndex, 10, params.warehouseStatus)
      .then(({ data: { requests } }) => {
        if (isExtraLoading) {
          setResults((prevResults) => [...prevResults, ...requests]);
        } else {
          setResults(requests);
        }
      })
      .catch(({ response: { status } }) => {
        if (status === 404) {
          if (isExtraLoading) {
            message.warning('더 이상 결과가 없습니다.');
          } else {
            message.warning('결과가 존재하지 않습니다.');
          }
        }
      });
  }, [pageIndex, isExtraLoading, setResults, params, token]);

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
  } else
    return (
      <Container>
        <Wrapper>
          <InformationContainer>
            <ImageContainer>
              <Image logoImage={LogoImage}></Image>
            </ImageContainer>
            <Text>창고 정보 관리</Text>
            <Header
              handleClick={() => {
                setIsExtraLoading(false);
                setPageIndex(0);
              }}
              warehouseStatus={params.warehouseStatus}
            />
            <NavBar>
              <NavText width={'10%'}>상태</NavText>
              <NavText width={'60%'}>창고 정보</NavText>
              <NavText width={'30%'}>최근 수정일</NavText>
            </NavBar>
            {results.map((result, idx) => {
              return (
                <WarehouseContainer key={idx}>
                  <Status color={statusToColor(result.status)}>
                    {statusToText(result.status)}
                  </Status>
                  <WarehouseInformationWrapper>
                    <Name>{result.name}</Name>
                    <ButtonsContainer>
                      <Button to={`/warehouses/edit/data/${result.warehouseId}`}>정보</Button>
                      <Button to="/">이미지</Button>
                    </ButtonsContainer>
                  </WarehouseInformationWrapper>
                  <Date>{result.lastModifiedAt}</Date>
                </WarehouseContainer>
              );
            })}
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
};

export default Warehouses;
