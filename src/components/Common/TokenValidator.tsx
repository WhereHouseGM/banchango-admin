import {PropsWithChildren, ReactElement, ReactNode, useCallback} from 'react';
import jwtDecode from 'jwt-decode';
import {useLocation} from 'react-router-dom';

interface ITokenAndTypeValidatorProps {
    children: PropsWithChildren<ReactNode>;
};

interface TokenExp {
    exp: number;
}

const PathNames = {
    MAIN: "/",
};

const TokenAndTypeValidator: React.FC<ITokenAndTypeValidatorProps> = ({children}): ReactElement => {
    
    const location = useLocation();

    const verifyAccess: any = useCallback(() => {

        const isTokenExpired = (): boolean => {
            const accessToken : string | null = localStorage.getItem('AccessToken');
            if(accessToken !== null) {
                return jwtDecode<TokenExp>(accessToken).exp * 1000 < new Date().getTime();
            } else return false;
        }

        const isUserLoggedIn = (): boolean => {
            return localStorage.getItem('AccessToken') !== null;
        }

        switch(location.pathname) {
            case PathNames.MAIN:
                if(isUserLoggedIn()) {
                    alert('로그인이 이미 되어 있었습니다. 다시 로그인하세용.');
                    localStorage.clear();
                    return children;
                } else {
                    return children;
                }
            default:
                if(isUserLoggedIn()) {
                    if(isTokenExpired()) {
                        alert('유효기간이 만료되었습니다. 다시 로그인 해주세요.');
                        localStorage.clear();
                        window.location.href = "/";
                        return;
                    } else {
                        return children;
                    }
                } else {
                    alert('잘못된 접근입니다. 다시 로그인 해주세요.');
                    localStorage.clear();
                    window.location.href = "/";
                    return;
                }
        }
    }, [location.pathname, children]);

    return verifyAccess();
}

export default TokenAndTypeValidator;