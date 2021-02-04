import styled from 'styled-components';
import React, { useState, useRef, Dispatch, SetStateAction, useEffect } from 'react';

import LogoImage from '../../../assets/LOGO.png';

/////////////////////

const ImageViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 1em;
`;
const SubTitle = styled.h1`
    color: #1e56a0;
`;

const Image = styled.img`
    width: 100%;
`;
const BottomWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const FilenameInput = styled.input`
    width: 70%;

    &:focus {
        outline: none;
    }
`;
const DeleteButton = styled.button`
    width: 25%;
`;
const InsertButton = styled.button`
    width: 25%;
`;
const FileInput = styled.input`
    display: none;
`;

interface ImageData {
    url: string,
    isMain: boolean
}

interface IImageViewComponentProps {
    image: ImageData | null,
    updateImage: (image: ImageData | null, newImage: ImageData) => void
}

const DEFAULT_URL = "https://warehouse-image-bucket.s3.ap-northeast-2.amazonaws.com/warehouse_noimage.png";

const ImageView: React.FC<IImageViewComponentProps> = ({ image, updateImage }) => {
    const parseFilename = function(rawUrl: string) {
        const splitBySlash = rawUrl.split("/");
        const filename = splitBySlash[splitBySlash.length-1];
        return filename;
    }
    const imageRef = useRef<HTMLImageElement>() as React.MutableRefObject<HTMLImageElement>;
    const filenameInputRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
    const fileInputRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

    const handleUploadImage = function(event: React.SyntheticEvent) {
        const files = (event.target as HTMLInputElement).files
        let file;
        if(files && files.length > 0) {
            file = files[0];

            if(event.nativeEvent.target) console.log(files)
            if(file && filenameInputRef.current) filenameInputRef.current.value = file.name
         
            const reader = new FileReader();
            reader.onload = function(event) {
                if(imageRef.current && event.target) imageRef.current.src = event.target.result as string;
                updateImage(null, { url: 'new image', isMain: false });
            }
            reader.readAsDataURL(file)
        }
    }

    console.log('imageRef')
    console.log(imageRef)
    console.log('filenameInputRef')
    console.log(filenameInputRef)
    console.log('fileInputRef')
    console.log(fileInputRef)
    
    return (
        <ImageViewWrapper>
            <Image ref={imageRef} src={image !== null ? image.url : DEFAULT_URL } onClick={() => { 
                console.log('click')
                console.log(fileInputRef);
                if(fileInputRef.current) fileInputRef.current.click(); 
            }}/>
            <BottomWrapper>
                <FilenameInput readOnly={true} ref={filenameInputRef} type="text" value={image !== null ? parseFilename(image.url) : ""}/>
                { image === null ? 
                    <>
                        <InsertButton>추가</InsertButton>
                        <FileInput ref={fileInputRef} type="file" onChange={handleUploadImage}/>
                    </> : <DeleteButton>삭제</DeleteButton>
                }
            </BottomWrapper>
        </ImageViewWrapper>
    )
}

/////////////////////

const EditImageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1em;
`;

const LeftLogoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;
const RightImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 2em;
`;

const HeaderWrapper = styled.div``;
const MainImageWrapper = styled.div``;
const ExtraImageWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

interface IEditImageComponentProps {}

const EditImage: React.FC<IEditImageComponentProps> = () => {
    const [images, setImages] = useState([
        {
            url: 'https://media.wired.com/photos/5b8999943667562d3024c321/master/w_2560%2Cc_limit/trash2-01.jpg',
            isMain: true
        },
        {
            url: 'https://www.at-languagesolutions.com/wp-content/uploads/2016/06/http-1.jpg',
            isMain: false
        },
        null
    ])

    const updateImage = (image: ImageData | null, newImage: ImageData) => {
        if(image !== null) images.push(newImage);
        else image = newImage;

        setImages([...images]);
        console.log(images);
    }

    return (
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
                    <ImageView image={images[0]} updateImage={updateImage}/>
                </MainImageWrapper>
                <SubTitle>엑스트라 사진</SubTitle>
                <ExtraImageWrapper>
                    {images.filter(each => each === null || each.isMain === false).map(image => {
                        console.log(image)
                        return <ImageView image={image} updateImage={updateImage}/>
                    })}
                </ExtraImageWrapper>
            </RightImageWrapper>
        </EditImageWrapper>
    )
}

export default EditImage;