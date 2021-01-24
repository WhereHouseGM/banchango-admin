import React, { useState } from 'react';
import sha256 from 'crypto';
import { userApi } from '../../api';
import { message } from 'antd';
import LogoImage from '../../assets/LOGO.png';
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

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const requestBody = {
      email: email,
      password: sha256.createHash('sha256').update(password).digest('hex'),
    };
    userApi
      .signIn(requestBody)
      .then(({ data }) => {
        console.log(data);
        alert('SUCCESS!');
      })
      .catch(({ response: { status } }) => {
        if (status === 400) {
          message.destroy();
          message.warning('[400] 요청 형식이 잘못되었습니다.');
        } else if (status === 404) {
          message.destroy();
          message.error('이메일 또는 비밀번호가 일치하지 않습니다.');
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
              onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                setEmail(event.currentTarget.value);
              }}
            />
            <Input
              type="password"
              id="password"
              placeholder="PASSWORD"
              onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                setPassword(event.currentTarget.value);
              }}
            />
            <SignInButton
              onClick={(event: React.FormEvent) => handleLogin(event)}
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
