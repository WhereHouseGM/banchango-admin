import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
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

export const InformationContainer = styled.div`
  background-color: white;
  width: 750px;
  min-height: 500px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #d5d5d5;
`;

export const Title = styled.div`
  font-weight: bold;
  margin-top: 10px;
  padding: 15px;
  font-size: 25px;
`;

export const BlueText = styled.div<{ fontSize?: string; padding?: string }>`
  color: ${(props) => props.theme.blueColor};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '17px')};
  padding: ${(props) => (props.padding ? props.padding : '15px')};
  font-weight: bold;
`;

export const ItemContainer = styled.div`
  display: flex;
  padding: 15px 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top: 1px solid black;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  text-align: center;
`;

export const ItemInformationText = styled.div`
  font-weight: bold;
  font-size: 12px;
  width: 12%;
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  width: 100%;
  justify-content: center;
  text-align: center;
`;

export const ItemText = styled.div`
  width: 12%;
  font-size: 11px;
`;

export const URLText = styled.div<{ isUrlNull: boolean }>`
  width: 12%;
  font-size: 11px;
  color: ${(props) => (props.isUrlNull ? '#a1a1a1' : props.theme.blueColor)};
  &:hover {
    cursor: ${(props) => (props.isUrlNull ? 'default' : 'pointer')};
  }
`;

export const ReleaseNumberContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

export const Text = styled.div<{ marginLeft?: string }>`
  font-size: 15px;
  font-weight: bold;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : 0)};
  :last-child {
    padding-right: 10px;
  }
`;

export const Content = styled.textarea`
  font-size: 12px;
  font-weight: 1.6;
  width: 100%;
  height: 250px;
  resize: none;
`;

export const UserInfoContainer = styled.div`
  width: 100%;
`;

export const UserLineWrapper = styled.div`
  display: flex;
  padding: 15px;
  justify-content: start;
`;

export const StatusButtonWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const StatusButton = styled.div<{ isMatch: boolean }>`
  border: 1px solid #d5d5d5;
  text-align: center;
  font-weight: bold;
  width: calc(100% / 3);
  padding: 10px 0;
  color: ${(props) => (props.isMatch ? 'white' : 'black')};
  background-color: ${(props) =>
    props.isMatch ? props.theme.blueColor : 'white'};
  transition: ${(props) => (props.isMatch ? 'none' : 'all .2s ease')};
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.isMatch ? props.theme.blueColor : '#d5d5d5'};
  }
`;

export const UpdateStatusButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const UpdateStatusButton = styled.div`
  border: 1px solid ${(props) => props.theme.blueColor};
  border-radius: 25px;
  font-size: 20px;
  color: ${(props) => props.theme.blueColor};
  text-align: center;
  padding: 10px 40px;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    background-color: #d5d5d5;
  }
`;
