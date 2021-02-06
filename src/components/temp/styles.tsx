import styled from 'styled-components';

export const ImageViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 1em;
`;
export const SubTitle = styled.h1`
    color: #1e56a0;
`;

export const Image = styled.img`
    width: 100%;
`;
export const BottomWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
export const FilenameInput = styled.input`
    width: 70%;

    &:focus {
        outline: none;
    }
`;
export const DeleteButton = styled.button`
    width: 25%;
`;
export const InsertButton = styled.button`
    width: 25%;
`;
export const FileInput = styled.input`
    display: none;
`;

export const EditImageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1em;
`;

export const LeftLogoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;
export const RightImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 2em;
`;

export const HeaderWrapper = styled.div``;
export const MainImageWrapper = styled.div``;
export const ExtraImageWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;