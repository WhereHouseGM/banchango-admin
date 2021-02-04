import React, { useState, useRef, Dispatch, SetStateAction, useEffect } from 'react';
import { message } from 'antd';

import LogoImage from '../../../assets/LOGO.png';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import { warehouseApi } from '../../../api';
import Loading from '../../Loading';
import { BottomWrapper, DeleteButton, EditImageWrapper, ExtraImageWrapper, FileInput, FilenameInput, HeaderWrapper, Image, ImageViewWrapper, InsertButton, LeftLogoWrapper, MainImageWrapper, RightImageWrapper, SubTitle } from './styles';

interface ImageData {
    url: string,
    isMain: boolean
}

interface IImageViewComponentProps {
    idx: number,
    isMain: boolean,
    image: ImageData | null,
    token: string,
    warehouseId: number,
    updateImage: (index: number, newImage: ImageData | null) => void
}

const DEFAULT_URL = "https://warehouse-image-bucket.s3.ap-northeast-2.amazonaws.com/warehouse_noimage.png";

const ImageView: React.FC<IImageViewComponentProps> = ({ idx, isMain, image, token, warehouseId, updateImage }) => {
    const [uploadFile, setUploadFile] = useState<File | null>()
    const [hasImage, setHasImage] = useState(image !== null)
    const imageType = isMain ? 'main' : 'extra';

    const parseFilename = function(rawUrl: string) {
        const splitBySlash = rawUrl.split("/");
        const filename = splitBySlash[splitBySlash.length-1];
        return filename;
    }

    const handleUpdateImage = function(event: React.SyntheticEvent) {
        const files = (event.target as HTMLInputElement).files
        let file: File;
        if(files && files.length > 0) {
            file = files[0];

            const filenameInputRef = document.querySelector(`#${imageType}-filename${idx}`) as HTMLInputElement
            if(file && filenameInputRef) filenameInputRef.value = file.name
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageRef = document.querySelector(`#${imageType}-image${idx}`) as HTMLImageElement
                if(imageRef && event.target) imageRef.src = event.target.result as string;
                setUploadFile(file)
                updateImage(idx, { url: imageRef.src, isMain });
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUploadImage = async function(event: React.SyntheticEvent) {
        let formData = new FormData()
        formData.append('file', uploadFile as Blob);

        if(isMain) {
            try {
                if(window.confirm('사진을 업로드할까요')) {
                    await warehouseApi.uploadMainImage(token, warehouseId, formData)
                    alert('메인 사진이 모두 등록되었습니다.');
                    setHasImage(true)
                    setUploadFile(null)
                }
            } 
            catch (error) {
                if (error.toString().includes('400')) {
                  alert('뭔가 잘못됨. 창고주 로그인을 안했다던가 등등..');
                } else if (error.toString().includes('401')) {
                  alert('창고주 로그인 다시 해주세용');
                } else if (error.toString().includes('403')) {
                  alert('창고주 로그인한 계정이 잘못됨.');
                } else if (error.toString().includes('406')) {
                  alert(
                    '이미 메인 사진 이미 1개 등록되어 있음... 나한테 지워달라고 하세요,,',
                  );
                }
            }
        }
        else {
            try {
                if(window.confirm('사진을 업로드할까요')) {
                    await warehouseApi.uploadExtraImage(token, warehouseId, formData)
                    alert('추가 사진이 모두 등록되었습니다.');
                    setHasImage(true)
                    setUploadFile(null)
                }
            } 
            catch (error) {
                if (error.toString().includes('400')) {
                  alert('뭔가 잘못됨. 창고주 로그인을 안했다던가 등등..');
                } else if (error.toString().includes('401')) {
                  alert('창고주 로그인 다시 해주세용');
                } else if (error.toString().includes('403')) {
                  alert('창고주 로그인한 계정이 잘못됨.');
                } else if (error.toString().includes('406')) {
                  alert(
                    '이미 추가 사진 이미 5개 등록되어 있음... 나한테 지워달라고 하세요,,',
                  );
                }
            }
        }
    }

    const handleDeleteImage = async function(event: React.SyntheticEvent) {
        if(isMain) {
            try {
                if(window.confirm('사진을 삭제할까요')) {
                    await warehouseApi.deleteMainImage(token, warehouseId)
                    alert('메인 사진이 모두 삭제되었습니다.');
                
                    const filenameInputRef = document.querySelector(`#${imageType}-filename${idx}`) as HTMLInputElement;
                    filenameInputRef.value = "";
                    updateImage(idx, null);
                    setHasImage(false)
                }
            } 
            catch (error) {
                if (error.toString().includes('400')) {
                  alert('뭔가 잘못됨. 창고주 로그인을 안했다던가 등등..');
                } else if (error.toString().includes('401')) {
                  alert('창고주 로그인 다시 해주세용');
                } else if (error.toString().includes('403')) {
                  alert('창고주 로그인한 계정이 잘못됨.');
                } else if (error.toString().includes('404')) {
                  alert(
                    '없는 이미지입니다',
                  );
                }
            }
        }
        else {
            const filenameInputRef = document.querySelector(`#${imageType}-filename${idx}`) as HTMLInputElement
            const file = filenameInputRef.value
            try {
                if(window.confirm('사진을 삭제할까요')) {
                    await warehouseApi.deleteExtraImage(token, warehouseId, file)
                    alert('추가 사진이 모두 삭제되었습니다.');
            
                    const filenameInputRef = document.querySelector(`#${imageType}-filename${idx}`) as HTMLInputElement;
                    filenameInputRef.value = "";
                    updateImage(idx, null);
                    setHasImage(false)
                }
            } 
            catch (error) {
                if (error.toString().includes('400')) {
                  alert('뭔가 잘못됨. 창고주 로그인을 안했다던가 등등..');
                } else if (error.toString().includes('401')) {
                  alert('창고주 로그인 다시 해주세용');
                } else if (error.toString().includes('403')) {
                  alert('창고주 로그인한 계정이 잘못됨.');
                } else if (error.toString().includes('404')) {
                  alert(
                    '없는 이미지입니다',
                  );
                }
            }
        }
    }

    return (
        <ImageViewWrapper>
            <Image id={`${imageType}-image${idx}`} src={image !== null ? image.url : DEFAULT_URL } onClick={() => {
                const fileInputRef = document.querySelector(`#${imageType}-file${idx}`) as HTMLInputElement
                if(fileInputRef) fileInputRef.click(); 
            }}/>
            <BottomWrapper>
                <FilenameInput readOnly={true} id={`${imageType}-filename${idx}`} type="text" defaultValue={image !== null ? parseFilename(image.url) : ""}/>
                { !hasImage ? 
                    <>
                        <InsertButton onClick={handleUploadImage}>추가</InsertButton>
                        <FileInput type="file" id={`${imageType}-file${idx}`} onChange={handleUpdateImage}/>
                    </> : <DeleteButton onClick={handleDeleteImage}>삭제</DeleteButton>
                }
            </BottomWrapper>
        </ImageViewWrapper>
    )
}

interface IEditImageComponentProps {}

const EditImage: React.FC<IEditImageComponentProps> = () => {
  const params = useParams<{ warehouseId: string }>();
  const token = localStorage.getItem('AccessToken') || 'abc';
  const [loading, setLoading] = useState(true);
  const [mainImages, setMainImages] = useState<Array<ImageData | null>>([])
  const [extraImages, setExtraImages] = useState<Array<ImageData | null>>([])
  let images = [];

  const getApi = useCallback(() => {
        warehouseApi
        .getWarehouseImages(token, parseInt(params.warehouseId))
        .then(({ data: { images } }) => {
            console.log('images')
            console.log(images)
            const _mainImages = images.filter((each: ImageData) => each.isMain === true);
            const _extraImages = images.filter((each: ImageData) => each.isMain === false);

            while(_mainImages.length < 1) _mainImages.push(null);
            while(_extraImages.length < 5) _extraImages.push(null);
            console.log(_mainImages)
            console.log(_extraImages)
            setMainImages(_mainImages)
            setExtraImages(_extraImages)
            setLoading(false);
        })
        .catch(({response: { status }}) => {
            message.destroy();
            if (status === 400) {
            message.warning('[400] : 요청 형식이 잘못되었습니다.');
            return;
            } else if (status === 401) {
            message.warning(
                '[401] : 토큰값이 잘못되었습니다. 다시 로그인 해주세요.',
            );
            } else if (status === 403) {
                message.warning('[403] : 로그인한 사용자가 관리자가 아닙니다.');
            } else if (status === 404) {
                message.warning('[404] : 조회 결과가 없습니다.');
                const _mainImages = [];
                const _extraImages = [];

                while(_mainImages.length < 1) _mainImages.push(null);
                while(_extraImages.length < 5) _extraImages.push(null);
                setMainImages(_mainImages)
                setExtraImages(_extraImages)
            } else {
                message.warning(
                    '알 수 없는 오류가 발생했습니다. 관리자에게 문의해 주세요.',
                );
            }
            setLoading(false);
        })
    }, [params, token]);

    useEffect(() => {
        getApi()
    }, [getApi]);

    const updateMainImage = (index: number, newImage: ImageData | null) => {
        mainImages[index] = newImage;
        console.log('mainImages')
        console.log(mainImages)
        setMainImages([...mainImages]);
    }
    
    const updateExtraImage = (index: number, newImage: ImageData | null) => {
        extraImages[index] = newImage;
        console.log('extraImages')
        console.log(extraImages)
        setExtraImages([...extraImages]);
    }

    return (
        <> {loading ? <Loading/> : 
        <EditImageWrapper>
            <LeftLogoWrapper>
                <img width="150" src={LogoImage} alt="이미지"/>
            </LeftLogoWrapper>
            <RightImageWrapper>
                <HeaderWrapper>
                    <h1 style={{"fontWeight": "bold"}}>창고이름 이미지 수정</h1>
                </HeaderWrapper>
                <SubTitle>메인 사진</SubTitle>
                <MainImageWrapper>
                    {mainImages.map((image, idx) => {
                        return <ImageView idx={idx} isMain={true} image={image} token={token} warehouseId={parseInt(params.warehouseId)} updateImage={updateMainImage}/>
                    })}
                </MainImageWrapper>
                <SubTitle>엑스트라 사진</SubTitle>
                <ExtraImageWrapper>
                    {extraImages.map((image, idx) => {
                        return <ImageView idx={idx} isMain={false} image={image} token={token} warehouseId={parseInt(params.warehouseId)} updateImage={updateExtraImage}/>
                    })}
                </ExtraImageWrapper>
            </RightImageWrapper>
        </EditImageWrapper>}
        </>
    )
}

export default EditImage;