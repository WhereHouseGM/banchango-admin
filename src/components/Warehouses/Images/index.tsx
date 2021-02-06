import React from 'react';
import LOGO_IMAGE from '../../../assets/LOGO.png';
import {
  Container,
  Wrapper,
  InformationContainer,
  LogoImage,
  LogoImageContainer,
} from './styles';

interface Image {
  url: string;
  isMain: boolean;
}

interface IEditImageProps {
  imageData: Array<Image>;
}

const EditImage: React.FC<IEditImageProps> = ({ imageData }) => {
  console.log(imageData);
  return (
    <Container>
      <Wrapper>
        <InformationContainer>
          <LogoImageContainer>
            <LogoImage logoImage={LOGO_IMAGE}></LogoImage>
          </LogoImageContainer>
        </InformationContainer>
      </Wrapper>
    </Container>
  );
};

export default EditImage;
