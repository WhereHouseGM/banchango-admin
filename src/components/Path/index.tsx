import React from 'react';
import {
  Container,
  Wrapper,
  PathContainer,
  ImageContainer,
  Image,
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
        </PathContainer>
      </Wrapper>
    </Container>
  );
};

export default Path;
