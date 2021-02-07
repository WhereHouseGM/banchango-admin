import React, { createRef, useState, useRef, MutableRefObject } from 'react';
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
  Button,
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
  const token = localStorage.getItem('AccessToken') || 'abc';

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

  const mainImageRef = useRef<HTMLImageElement>() as MutableRefObject<HTMLImageElement>;

  const [uploadFile, setUploadFile] = useState<File | null>();

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
                <Image
                  src={file.url}
                  id="MAIN_IMAGE"
                  ref={mainImageRef}
                ></Image>
                {file.url === NO_IMAGE ? null : (
                  <FileName>
                    파일명&nbsp;:&nbsp;{parseFileName(file.url)}
                  </FileName>
                )}
                {file.url === NO_IMAGE ? (
                  <ImageInput
                    type="file"
                    onChange={(
                      event: React.SyntheticEvent<HTMLInputElement>,
                    ) => {
                      if (event.currentTarget.files !== null) {
                        let file = event.currentTarget.files[0];
                        setUploadFile(file);
                        let reader = new FileReader();
                        reader.onload = (event) => {
                          if (mainImageRef.current && event.target) {
                            mainImageRef.current.src = event.target
                              .result as string;
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                ) : null}
                {file.url === NO_IMAGE ? (
                  <Button isRemove={false}>추가</Button>
                ) : (
                  <Button isRemove={true}>삭제</Button>
                )}
              </ImageContainer>
            );
          })}
          <Text>추가 사진({lengthOfExtraImages()})</Text>
          {convertExtraImage().map((file, idx) => {
            return (
              <ImageContainer key={`FILE${idx}`}>
                <Image src={file.url} id={`EXTRA_IMAGE_${idx}`}></Image>
                {file.url === NO_IMAGE ? null : (
                  <FileName>
                    파일명&nbsp;:&nbsp;{parseFileName(file.url)}
                  </FileName>
                )}
                {file.url === NO_IMAGE ? (
                  <ImageInput
                    type="file"
                    onChange={(
                      event: React.SyntheticEvent<HTMLInputElement>,
                    ) => {
                      if (event.currentTarget.files !== null) {
                        let file = event.currentTarget.files[0];
                        setUploadFile(file);
                        let reader = new FileReader();
                        reader.onload = (event) => {
                          let extraImageRef = document.querySelector(
                            `#EXTRA_IMAGE_${idx}`,
                          ) as HTMLImageElement;
                          if (extraImageRef && event.target) {
                            extraImageRef.src = event.target.result as string;
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                ) : null}
                {file.url === NO_IMAGE ? (
                  <Button isRemove={false}>추가</Button>
                ) : (
                  <Button isRemove={true}>삭제</Button>
                )}
              </ImageContainer>
            );
          })}
        </InformationContainer>
      </Wrapper>
    </Container>
  );
};

export default EditImage;
