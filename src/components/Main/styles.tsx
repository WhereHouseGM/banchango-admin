import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    overflow: auto;
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

export const LoginContainer = styled.div`
  background-color: white;
  width: 375px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #d5d5d5;
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

export const Image = styled.div<{logoImage: string}>`
  width: 150px;
  height: 45px;
  background-image: url(${props => props.logoImage});
  background-size: contain;
  align-self: center;
  background-repeat: no-repeat;
`;

export const TextContainer = styled.form`
  display: flex;
  box-pack: center;
  justify-content: center;
  box-align: center;
  align-items: center;
  box-orient: vertical;
  box-direction: normal;
  flex-direction: column;
`;

export const MainText = styled.div`
  color: black;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.45;
  margin-bottom: 8px;
`;

export const SubText = styled.div`
  color: black;
  font-family: sans-serif;
  font-size: 15px;
  line-height: 1.4;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  width: 300px;
  margin-top: 10px;
  transition: all .2s ease;
  font-size: 15px;
  line-height: 3.0;
  text-align: left;
  &:focus {
    background-color: lightgray;
    border-bottom: 2px solid ${props => props.theme.blueColor};
  }
`;

export const SignInButton = styled.button`
  width: 300px;
  border: 2px solid ${props => props.theme.blueColor};
  color: ${props => props.theme.blueColor};
  text-align: center;
  margin: 34px 0 15px 0;
  border-radius: 15px;
  line-height: 1.7;
  font-weight: bold;
  background-color: white;
  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;