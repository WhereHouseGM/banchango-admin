import React, { useState } from 'react';
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
  //   const [mainImage, setMainImage] = useState(
  //     (): IImage => {
  //       return imageData.images.filter((img) => img.isMain === true).length > 1
  //         ? imageData.images.filter((img) => img.isMain === true)[0]
  //         : { isMain: true, url: NO_IMAGE };
  //     },
  //   );
  //   const [extraImages, setExtraImages] = useState(
  //     imageData.images.filter((img) => img.isMain === false),
  //   );

  console.log(imageData);

  const lengthOfExtraImages = (): number =>
    imageData.images.filter((image) => image.isMain === false).length;

  const parseFileName = (rawUrl: string): string => {
    const splitted = rawUrl.split('/');
    return splitted[splitted.length - 1];
  };

  const convertMainImage = (): IImage[] => {
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

  const handleMainImageChange = (
    event: React.SyntheticEvent<HTMLInputElement>,
  ): void => {};

  return (
    <Container>
      <Wrapper>
        <InformationContainer>
          <LogoImageContainer>
            <LogoImage logoImage={LOGO_IMAGE}></LogoImage>
          </LogoImageContainer>
          <Text>창고 사진 수정 - {imageData.warehouseName}</Text>
          <Text>메인 사진</Text>
          {convertMainImage().map((file, idx) => {
            return (
              <ImageContainer key={`MAIN${idx}`}>
                <Image src={file.url}></Image>
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
                <Image src={file.url}></Image>
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
