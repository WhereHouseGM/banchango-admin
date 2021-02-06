import React from 'react';
import LOGO_IMAGE from '../../../assets/LOGO.png';
import NO_IMAGE from '../../../assets/NO_IMAGE.png';
import {
  Container,
  Wrapper,
  InformationContainer,
  LogoImage,
  LogoImageContainer,
  Text,
  ImageContainer,
  Image,
  ImageInput,
  AddButton,
} from './styles';

interface IImage {
  url: string;
  isMain: boolean;
}

interface IEditImageProps {
  imageData: {
    warehouseName: string;
    images: Array<IImage>;
  };
}

const EditImage: React.FC<IEditImageProps> = ({ imageData }) => {
  console.log(imageData);
  const lengthOfExtraImages = (): number =>
    imageData.images.filter((image) => image.isMain === false).length;
  return (
    <Container>
      <Wrapper>
        <InformationContainer>
          <LogoImageContainer>
            <LogoImage logoImage={LOGO_IMAGE}></LogoImage>
          </LogoImageContainer>
          <Text>창고 사진 수정 - {imageData.warehouseName}</Text>
          <Text>메인 사진</Text>
          <ImageContainer>
            <Image bgImage={NO_IMAGE}></Image>
            <ImageInput type="file" />
            <AddButton>추가</AddButton>
          </ImageContainer>
          <Text>추가 사진({lengthOfExtraImages()})</Text>
          {imageData.images
            .filter((image) => image.isMain === false)
            .map((file, idx) => {
              return (
                <ImageContainer key={`FILE${idx}`}>
                  <Image bgImage={file.url}></Image>
                  <ImageInput type="file" />
                  <AddButton>추가</AddButton>
                </ImageContainer>
              );
            })}
        </InformationContainer>
      </Wrapper>
    </Container>
  );
};

export default EditImage;
