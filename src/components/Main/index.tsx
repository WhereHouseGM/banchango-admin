import React, { useState, createRef } from 'react';
import sha256 from 'crypto';
import { userApi } from '../../api';
import { message } from 'antd';
import LogoImage from '../../assets/LOGO.png';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Wrapper,
  LoginContainer,
  ImageContainer,
  Image,
  TextContainer,
  MainText,
  SubText,
  Input,
  SignInButton,
} from './styles';

const Main: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef: React.RefObject<HTMLInputElement> = createRef();
  const passwordRef: React.RefObject<HTMLInputElement> = createRef();
  const buttonRef: React.RefObject<HTMLButtonElement> = createRef();
  const history = useHistory();

  const clearInputs = () => {
    if (emailRef.current) {
      emailRef.current.value = '';
    }
    if (passwordRef.current) {
      passwordRef.current.value = '';
      passwordRef.current.focus();
    }
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (email === '') {
      message.warning('이메일을 입력해 주세요.');
      return;
    }
    if (password === '') {
      message.warning('비밀번호를 입력해 주세요.');
      return;
    }
    const requestBody = {
      email: email,
      password: sha256.createHash('sha256').update(password).digest('hex'),
    };
    userApi
      .signIn(requestBody)
      .then(({ data: { accessToken } }) => {
        localStorage.setItem('AccessToken', accessToken);
        history.push('/path');
      })
      .catch(({ response: { status } }) => {
        message.destroy();
        if (status === 400) {
          message.warning('[400] 요청 형식이 잘못되었습니다.');
        } else if (status === 404) {
          message.error('[404] 이메일 또는 비밀번호가 일치하지 않습니다.');
          clearInputs();
        } else if (status === 401 || status === 403) {
          message.error(
            `[${status}] : 토큰값이 잘못되었습니다. 로그인을 다시 해주세요.`,
          );
        } else {
          message.error(`[${status}] : 알 수 없는 오류가 발생했습니다.`);
        }
      });
  };

  return (
    <Container>
      <Wrapper>
        <LoginContainer>
          <ImageContainer>
            <Image logoImage={LogoImage}></Image>
          </ImageContainer>
          <TextContainer>
            <MainText>Sign in</MainText>
            <SubText>Banchangohub Admin Page</SubText>
            <Input
              type="text"
              id="email"
              placeholder="ID"
              ref={emailRef}
              onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                setEmail(event.currentTarget.value);
              }}
            />
            <Input
              type="password"
              id="password"
              placeholder="PASSWORD"
              ref={passwordRef}
              onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                setPassword(event.currentTarget.value);
              }}
              onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                  if (buttonRef.current) {
                    buttonRef.current.click();
                  }
                }
              }}
            />
            <SignInButton
              onClick={(event: React.FormEvent) => handleLogin(event)}
              ref={buttonRef}
            >
              Sign in
            </SignInButton>
          </TextContainer>
        </LoginContainer>
      </Wrapper>
    </Container>
  );
};

export default Main;
