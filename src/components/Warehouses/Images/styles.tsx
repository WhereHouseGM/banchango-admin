import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
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
`;

export const InformationContainer = styled.div`
  background-color: white;
  width: 375px;
  border-radius: 10px;
  border: 1px solid #d5d5d5;
`;

export const LogoImageContainer = styled.div`
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

export const LogoImage = styled.div<{ logoImage: string }>`
  width: 150px;
  height: 45px;
  background-image: url(${(props) => props.logoImage});
  background-size: contain;
  align-self: flex-start;
  margin-left: 10px;
  background-repeat: no-repeat;
`;

export const Text = styled.div`
  margin-left: 10px;
  font-weight: bold;
  border-bottom: 1px solid #a1a1a1;
  margin-bottom: 10px;
  line-height: 1.3;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Image = styled.div<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-repeat: no-repeat;
  background-size: contain;
  height: 400px;
  width: 100%;
  align-self: center;
  justify-self: center;
`;

export const ImageInput = styled.input``;

export const AddButton = styled.div``;

export const FileName = styled.div`
  font-size: 15px;
  color: ${(props) => props.theme.blueColor};
  border-radius: 5px;
  text-align: center;
`;
