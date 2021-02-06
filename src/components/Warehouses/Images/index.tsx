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
  FileName,
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

  const parseFileName = (rawUrl: string): string => {
    const splitted = rawUrl.split('/');
    return splitted[splitted.length - 1];
  };

  const convertedMainImage = (): IImage[] => {
    let temp = imageData.images.filter((image) => image.isMain === true);
    if (temp.length === 0) {
      temp.push({ url: NO_IMAGE, isMain: true });
    }
    return temp;
  };

  const convertExtraImage = (): IImage[] => {
    let temp = imageData.images.filter((image) => image.isMain === false);
    if (temp.length === 5) {
      return temp;
    } else {
      for (let i = temp.length; i < 5; i++) {
        temp.push({ url: NO_IMAGE, isMain: false });
      }
      return temp;
    }
  };

  return (
    <Container>
      <Wrapper>
        <InformationContainer>
          <LogoImageContainer>
            <LogoImage logoImage={LOGO_IMAGE}></LogoImage>
          </LogoImageContainer>
          <Text>창고 사진 수정 - {imageData.warehouseName}</Text>
          <Text>메인 사진</Text>
          {convertedMainImage().map((file, idx) => {
            return (
              <ImageContainer key={`MAIN${idx}`}>
                <Image bgImage={file.url}></Image>
                <FileName>
                  파일명&nbsp;:&nbsp;
                  {file.url === NO_IMAGE ? '없음' : parseFileName(file.url)}
                </FileName>
                <ImageInput type="file" />
                <AddButton>추가</AddButton>
              </ImageContainer>
            );
          })}
          <Text>추가 사진({lengthOfExtraImages()})</Text>
          {convertExtraImage().map((file, idx) => {
            return (
              <ImageContainer key={`FILE${idx}`}>
                <Image bgImage={file.url}></Image>
                <FileName>
                  파일명&nbsp;:&nbsp;
                  {file.url === NO_IMAGE ? '없음' : parseFileName(file.url)}
                </FileName>
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
