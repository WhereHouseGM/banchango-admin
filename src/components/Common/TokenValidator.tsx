import { PropsWithChildren, ReactElement, ReactNode, useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import ErrorPage from './ErrorPage';

interface ITokenAndTypeValidatorProps {
  children: PropsWithChildren<ReactNode>;
}

interface TokenExp {
  exp: number;
}

const PathNames = {
  MAIN: '/',
};

const TokenAndTypeValidator: React.FC<ITokenAndTypeValidatorProps> = ({
  children,
}): ReactElement => {
  const location = useLocation();

  const verifyAccess: any = useCallback(() => {
    const isTokenExpired = (): boolean => {
      const accessToken: string | null = sessionStorage.getItem('AccessToken');
      if (accessToken !== null) {
        return (
          jwtDecode<TokenExp>(accessToken).exp * 1000 < new Date().getTime()
        );
      } else return false;
    };

    const isUserLoggedIn = (): boolean => {
      return sessionStorage.getItem('AccessToken') !== null;
    };

    switch (location.pathname) {
      case PathNames.MAIN:
        if (isUserLoggedIn()) {
          sessionStorage.clear();
          return (
            <ErrorPage
              title="이미 로그인이 되어 있었습니다."
              message="제가 로그아웃 처리 해드렸습니다."
              locationToGo="/"
              buttonMessage="다시 로그인하기"
            />
          );
        } else {
          return children;
        }
      default:
        if (isUserLoggedIn()) {
          if (isTokenExpired()) {
            sessionStorage.clear();
            return (
              <ErrorPage
                title="로그인 휴효기간이 만료되었습니다."
                message="제가 로그아웃 처리 해드렸습니다."
                locationToGo="/"
                buttonMessage="다시 로그인하러 가기"
              />
            );
          } else {
            return children;
          }
        } else {
          sessionStorage.clear();
          return (
            <ErrorPage
              title="잘못된 접근입니다."
              message="로그인을 먼저 해주세요."
              locationToGo="/"
              buttonMessage="로그인"
            />
          );
        }
    }
  }, [location.pathname, children]);

  return verifyAccess();
};

export default TokenAndTypeValidator;
