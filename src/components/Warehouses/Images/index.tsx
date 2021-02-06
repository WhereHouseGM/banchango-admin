import React from 'react';
import LOGO_IMAGE from '../../../assets/LOGO.png';
import {
  Container,
  Wrapper,
  InformationContainer,
  LogoImage,
  LogoImageContainer,
  Text,
} from './styles';

interface Image {
  url: string;
  isMain: boolean;
}

interface IEditImageProps {
  imageData: {
    warehouseName: string;
    images: Array<Image>;
  };
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
          <Text>창고 사진 수정</Text>
        </InformationContainer>
      </Wrapper>
    </Container>
  );
};

export default EditImage;
