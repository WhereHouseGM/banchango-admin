import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  overflow: auto;
`;

export const ImageContainer = styled.div`
  background-color: inherit;
  height: 70px;
  display: flex;
  box-pack: center;
  justify-content: center;
  box-align: center;
  box-orient: vertical;
  box-direction: normal;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  box-align: center;
  align-items: center;
  box-pack: center;
  justify-content: center;
  width: 100%;
  display: flex;
  align-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Image = styled.div<{ logoImage: string }>`
  width: 150px;
  height: 45px;
  background-image: url(${(props) => props.logoImage});
  background-size: contain;
  align-self: flex-start;
  margin-left: 10px;
  background-repeat: no-repeat;
`;

export const InformationContainer = styled.div`
  background-color: white;
  width: 750px;
  min-height: 500px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #d5d5d5;
`;

export const HeaderText = styled.div`
  margin-left: 10px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const SearchContainer = styled.form`
  display: flex;
  margin-bottom: 15px;
`;

export const SearchInput = styled.input`
  flex: 3;
  line-height: 3;
  border: 1px solid gray;
  border-radius: 20px;
  padding-left: 15px;
  margin-right: 10px;
`;

export const SearchButton = styled.button`
  background-color: #1583d6;
  flex: 1;
  color: white;
  border-radius: 10px;
  text-align: center;
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.blueColor};
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
`;

export const TextContainer = styled.div`
  display: flex;
`;

export const Text = styled.div<{ width: string }>`
  font-weight: bold;
  font-size: 12px;
  border: 1px solid lightgray;
  text-align: center;
  width: ${(props) => props.width};
  padding: 4px;
`;

export const ShowMoreButton = styled.div`
  align-self: center;
  justify-self: center;
  padding: 5px;
  margin: 20px auto 5px auto;
  text-align: center;
  width: 120px;
  font-size: 14px;
  border-radius: 5px;
  color: white;
  background-color: #1583d6;
  font-weight: bold;
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.blueColor};
  }
`;
