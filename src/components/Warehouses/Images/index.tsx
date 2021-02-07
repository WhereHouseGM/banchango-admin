import React, { useState, useRef, MutableRefObject } from 'react';
import { useParams } from 'react-router-dom';
import { warehouseApi } from '../../../api';
import LOGO_IMAGE from '../../../assets/LOGO.png';
import NO_IMAGE from '../../../assets/NO_IMAGE.png';
import { message } from 'antd';
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
  const token = localStorage.getItem('AccessToken') || 'abc';
  const params = useParams<{ warehouseId: string }>();

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

  const uploadMainImage = () => {
    if (uploadFile === null || uploadFile === undefined) {
      alert('사진을 먼저 선택해주세요.');
      return;
    } else {
      message.loading('잠시만 기다려 주세요..');
      let formData = new FormData();
      formData.append('file', uploadFile as Blob);
      warehouseApi
        .uploadMainImage(token, parseInt(params.warehouseId), formData)
        .then(() => {
          message.destroy();
          alert('메인 사진을 등록했습니다.');
          window.location.reload();
        })
        .catch(({ response: { status } }) => {
          message.destroy();
          if (status === 400) {
            alert('[400] : 요청 형식이 잘못되었습니다.');
            return;
          } else if (status === 401) {
            alert('[401] : 토큰값이 잘못되었습니다. 다시 로그인 해주세요.');
            return;
          } else if (status === 403) {
            alert(
              '[403] : 로그인한 사용자가 관리자가 아닙니다. 다시 로그인 해주세요.',
            );
            return;
          } else if (status === 406) {
            alert(
              '[406] : 해당 창고는 이미 메인 사진이 있습니다.\n기존 사진을 먼저 삭제하고 등록해주세요.',
            );
            return;
          } else {
            alert('알 수 없는 오류가 발생했습니다.\n관리자에게 문의해 주세요.');
            return;
          }
        });
    }
  };

  const uploadExtraImage = () => {
    if (uploadFile === null || uploadFile === undefined) {
      alert('사진을 먼저 선택해주세요.');
      return;
    } else {
      message.loading('잠시만 기다려 주세요..');
      let formData = new FormData();
      formData.append('file', uploadFile as Blob);
      warehouseApi
        .uploadExtraImage(token, parseInt(params.warehouseId), formData)
        .then(() => {
          message.destroy();
          alert('추가 사진을 등록했습니다.');
          window.location.reload();
        })
        .catch(({ response: { status } }) => {
          message.destroy();
          if (status === 400) {
            alert('[400] : 요청 형식이 잘못되었습니다.');
            return;
          } else if (status === 401) {
            alert('[401] : 토큰값이 잘못되었습니다. 다시 로그인 해주세요.');
            return;
          } else if (status === 403) {
            alert(
              '[403] : 로그인한 사용자가 관리자가 아닙니다. 다시 로그인 해주세요.',
            );
            return;
          } else if (status === 406) {
            alert(
              '[406] : 해당 창고는 이미 추가 사진이 5장 있습니다.\n추가 사진의 최대 개수는 5장입니다.',
            );
            return;
          } else {
            alert('알 수 없는 오류가 발생했습니다.\n관리자에게 문의해 주세요.');
            return;
          }
        });
    }
  };

  const removeMainImage = () => {
    message.loading('잠시만 기다려 주세요..');
    warehouseApi
      .deleteMainImage(token, parseInt(params.warehouseId))
      .then(() => {
        message.destroy();
        alert('메인 사진이 정상적으로 삭제되었습니다.');
        window.location.reload();
      })
      .catch(({ response: { status } }) => {
        message.destroy();
        if (status === 400) {
          alert('[400] : 요청 형식이 잘못되었습니다.');
          return;
        } else if (status === 401) {
          alert('[401] : 토큰값이 잘못되었습니다. 다시 로그인 해주세요.');
          return;
        } else if (status === 403) {
          alert(
            '[403] : 로그인한 사용자가 관리자가 아닙니다. 다시 로그인 해주세요.',
          );
          return;
        } else if (status === 404) {
          alert(
            '[404] : 기존에 있던 메인 사진이 없거나 존재하지 않는 창고입니다.',
          );
          return;
        } else {
          alert('알 수 없는 오류가 발생했습니다.\n관리자에게 문의해 주세요.');
          return;
        }
      });
  };

  const removeExtraImage = (fileName: string) => {
    message.loading('잠시만 기다려 주세요..');
    warehouseApi
      .deleteExtraImage(token, parseInt(params.warehouseId), fileName)
      .then(() => {
        message.destroy();
        alert('추가 사진이 정상적으로 삭제되었습니다.');
        window.location.reload();
      })
      .catch(({ response: { status } }) => {
        message.destroy();
        if (status === 400) {
          alert('[400] : 요청 형식이 잘못되었습니다.');
          return;
        } else if (status === 401) {
          alert('[401] : 토큰값이 잘못되었습니다. 다시 로그인 해주세요.');
          return;
        } else if (status === 403) {
          alert(
            '[403] : 로그인한 사용자가 관리자가 아닙니다. 다시 로그인 해주세요.',
          );
          return;
        } else if (status === 404) {
          alert(
            '[404] : 기존에 없던 추가 사진이거나 존재하지 않는 창고입니다.',
          );
          return;
        } else {
          alert('알 수 없는 오류가 발생했습니다.\n관리자에게 문의해 주세요.');
          return;
        }
      });
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
                  <Button isRemove={false} onClick={uploadMainImage}>
                    추가
                  </Button>
                ) : (
                  <Button isRemove={true} onClick={removeMainImage}>
                    삭제
                  </Button>
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
                  <Button isRemove={false} onClick={uploadExtraImage}>
                    추가
                  </Button>
                ) : (
                  <Button
                    isRemove={true}
                    onClick={() => removeExtraImage(parseFileName(file.url))}
                  >
                    삭제
                  </Button>
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
