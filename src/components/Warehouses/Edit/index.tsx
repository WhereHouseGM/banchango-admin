import React, { useState } from 'react';
import {
  Container,
  Wrapper,
  RegisterContainer,
  ImageContainer,
  RegisterImage,
  HeaderTitleBottom,
  HeaderTitleTop,
  TextContainer,
  TwoElementContainer,
  ItemContainer,
  InputTitle,
  Input,
  DescriptionInput,
  RadioButton,
  RadioButtonContainer,
  RadioButtonLabel,
  CheckboxContainer,
  CheckBoxLine,
  CheckBox,
  AddButton,
  ButtonAndInputContainer,
  RemoveButton,
  SubmitButton,
} from './styles';

import LogoImage from '../../../assets/LOGO.png';

import {
  warehouseTypes,
  mainItemTypes,
  facilityChecks,
  airConditioningTypes,
  availableWeekdays,
  warehouseConditions,
  InputType,
} from './static';

import { warehouseApi } from '../../../api';

import { message } from 'antd';
import { RefactorActionInfo } from 'typescript';

interface IEditDataProps {
  warehouseData: {
    name: string;
    space: number;
    address: string;
    addressDetail: string;
    description: string;
    availableWeekdays: number;
    openAt: string;
    closeAt: string;
    availableTimeDetail: string;
    cctvExist: boolean;
    doorLockExist: boolean;
    airConditioningType: string;
    workerExist: boolean;
    canPark: boolean;
    warehouseType: string;
    minReleasePerMonth: number;
    latitude: number;
    longitude: number;
    mainImageUrl: string;
    deliveryTypes: Array<string>;
    warehouseCondition: Array<string>;
    warehouseFacilityUsages: Array<string>;
    warehouseUsageCautions: Array<string>;
    images: Array<string>;
    status: string;
    insurances: Array<string>;
    securityCompanies: Array<string>;
    mainItemTypes: Array<string>;
    blogUrl?: string;
  };
}

const EditData: React.FC<IEditDataProps> = ({ warehouseData }) => {
  const [inputs, setInputs] = useState({
    name: warehouseData.name,
    space: warehouseData.space,
    address: warehouseData.address,
    addressDetail: warehouseData.addressDetail,
    description: warehouseData.description,
    availableWeekdays: warehouseData.availableWeekdays,
    openAt: warehouseData.openAt,
    closeAt: warehouseData.closeAt,
    availableTimeDetail: warehouseData.availableTimeDetail,
    insurances: warehouseData.insurances,
    securityCompanies: warehouseData.securityCompanies,
    airConditioningType: warehouseData.airConditioningType,
    mainItemTypes: warehouseData.mainItemTypes,
    warehouseType: warehouseData.warehouseType,
    minReleasePerMonth: warehouseData.minReleasePerMonth,
    deliveryTypes: warehouseData.deliveryTypes,
    warehouseFacilityUsages: warehouseData.warehouseFacilityUsages,
    warehouseUsageCautions: warehouseData.warehouseUsageCautions,
    warehouseCondition: warehouseData.warehouseCondition,
    latitude: warehouseData.latitude,
    longitude: warehouseData.longitude,
    status: warehouseData.status,
    cctvExist: warehouseData.cctvExist,
    workerExist: warehouseData.workerExist,
    canPark: warehouseData.canPark,
    doorLockExist: warehouseData.doorLockExist,
  });

  interface IFacilityChecks {
    [key: string]: boolean;
  }

  const FacilityChecksInterface: IFacilityChecks = {
    cctvExist: warehouseData.cctvExist,
    workerExist: warehouseData.workerExist,
    doorLockExist: warehouseData.doorLockExist,
    canPark: warehouseData.canPark,
  };

  //   const [facilityCheck, setFacilityCheck] = useState(FacilityChecksInterface);

  const addInsurances = () => {
    let temp = inputs.insurances;
    temp.push('');
    setInputs({ ...inputs, insurances: temp });
  };

  const removeInsurances = (idx: number) => {
    let temp = inputs.insurances;
    temp.splice(idx, 1);
    setInputs({ ...inputs, insurances: temp });
  };

  const addSecurityCompanies = () => {
    let temp = inputs.securityCompanies;
    temp.push('');
    setInputs({ ...inputs, securityCompanies: temp });
  };

  const removeSecurityCompanies = (idx: number) => {
    let temp = inputs.securityCompanies;
    temp.splice(idx, 1);
    setInputs({ ...inputs, securityCompanies: temp });
  };

  const addDeliveryTypes = () => {
    let temp = inputs.deliveryTypes;
    temp.push('');
    setInputs({ ...inputs, deliveryTypes: temp });
  };

  const removeDeliveryTypes = (idx: number) => {
    let temp = inputs.deliveryTypes;
    temp.splice(idx, 1);
    setInputs({ ...inputs, deliveryTypes: temp });
  };

  const addWarehouseFacilityUsages = () => {
    let temp = inputs.warehouseFacilityUsages;
    temp.push('');
    setInputs({ ...inputs });
  };

  const removeWarehouseFacilityUsages = (idx: number) => {
    let temp = inputs.warehouseFacilityUsages;
    temp.splice(idx, 1);
    setInputs({ ...inputs, warehouseFacilityUsages: temp });
  };

  const addWarehouseUsageCautions = () => {
    let temp = inputs.warehouseUsageCautions;
    temp.push('');
    setInputs({ ...inputs, warehouseUsageCautions: temp });
  };

  const removeWarehouseUsageCautions = (idx: number) => {
    let temp = inputs.warehouseUsageCautions;
    temp.splice(idx, 1);
    setInputs({ ...inputs, warehouseUsageCautions: temp });
  };

  const checkMatch = (T: string, S: Array<string>): boolean => {
    let result = false;
    for (let s of S) {
      if (T === s) {
        result = true;
      }
    }
    return result;
  };

  const register = () => {
    let requestBody = { ...inputs };
    // if (inputs.name === null || inputs.name.trim() === '') {
    //   message.warning('창고명을 입력해주세요.');
    //   return;
    // } else if (inputs.space === 0 || inputs.space === 0) {
    //   message.warning('창고 평수를 입력해주세요.');
    //   return;
    // } else if (inputs.address === null || inputs.address.trim() === '') {
    //   message.warning('주소를 입력해주세요.');
    //   return;
    // } else if (
    //   inputs.addressDetail === null ||
    //   inputs.addressDetail.trim() === ''
    // ) {
    //   message.warning('상세 주소를 입력해주세요.');
    //   return;
    // } else if (
    //   inputs.description === null ||
    //   inputs.description.trim() === ''
    // ) {
    //   message.warning('창고 소개를 입력해주세요.');
    //   return;
    // } else if (inputs.openAt === null || inputs.openAt.trim() === '') {
    //   message.warning('영업 시작 시간을 입력해주세요.');
    //   return;
    // } else if (inputs.closeAt === null || inputs.closeAt.trim() === '') {
    //   message.warning('영업 종료 시간을 입력해주세요.');
    //   return;
    // } else if (
    //   inputs.availableTimeDetail === null ||
    //   inputs.availableTimeDetail.trim() === ''
    // ) {
    //   message.warning('영업 시간 유의사항을 입력해주세요');
    //   return;
    // } else if (inputs.availableWeekdays === null) {
    //   message.warning('영업요일을 선택해주세요.');
    //   return;
    // } else if (inputs.minReleasePerMonth === null) {
    //   message.warning('월 최소 출고량을 입력해 주세요.');
    //   return;
    // } else if (inputs.insurances.length === 0) {
    //   message.warning('보험사를 1개 이상 입력해주세요.');
    //   return;
    // } else if (inputs.securityCompanies.length === 0) {
    //   message.warning('경비 업체를 1개 이상 입력해주세요.');
    //   return;
    // } else if (inputs.warehouseType === null) {
    //   message.warning('업종을 선택해주세요.');
    //   return;
    // } else if (inputs.airConditioningType === null) {
    //   message.warning('냉난방 지원 방식을 선택해주세요.');
    //   return;
    // } else if (inputs.mainItemTypes.length === 0) {
    //   message.warning('대표 품목을 1개 이상 선택해주세요.');
    //   return;
    // } else if (inputs.warehouseCondition.length === 0) {
    //   message.warning('창고 유형을 1개 이상 선택해주세요.');
    //   return;
    // } else if (inputs.deliveryTypes.length === 0) {
    //   message.warning('제휴 택배사를 1개 이상 입력해주세요.');
    //   return;
    // }
    console.log(requestBody);
    // message.loading('잠시만 기다려주세요.');
    // return warehouseApi
    //   .register(requestBody, localStorage.getItem('AccessToken'))
    //   .then(() => {
    //     message.destroy();
    //     alert('창고 등록 요청이 정상적으로 처리되었습니다.');
    //     return 'SUCCESS';
    //   })
    //   .catch(({ response: { status } }) => {
    //     message.destroy();
    //     if (status === 400) {
    //       alert('[400]요청 형식이 잘못되었습니다.');
    //     } else if (status === 401) {
    //       alert('[401] 로그인을 다시 해주세요.');
    //     } else if (status === 403) {
    //       alert('[403] 해당 요청을 수행할 수 있는 권한이 없습니다.');
    //     } else if (status === 500) {
    //       alert('[500]서버 오류가 발생했습니다.');
    //     }
    //   });
  };

  return (
    <Container>
      <Wrapper>
        <RegisterContainer>
          <ImageContainer>
            <RegisterImage bgImage={LogoImage}></RegisterImage>
          </ImageContainer>
          <TextContainer>
            <HeaderTitleTop>온라인 셀러를 위한</HeaderTitleTop>
            <HeaderTitleBottom>통합 물류 파트너</HeaderTitleBottom>
            <TwoElementContainer>
              <ItemContainer>
                <InputTitle>
                  창고명<span style={{ color: 'red' }}>*</span>
                </InputTitle>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="창고명"
                  width="256px"
                  value={inputs.name}
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                    setInputs({ ...inputs, name: event.currentTarget.value });
                  }}
                />
              </ItemContainer>
              <ItemContainer>
                <InputTitle>
                  창고 평수<span style={{ color: 'red' }}>*</span>
                </InputTitle>
                <Input
                  id="space"
                  type="number"
                  name="space"
                  placeholder="창고 평수(평 단위 숫자만 입력)"
                  width="256px"
                  value={inputs.space}
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                    setInputs({
                      ...inputs,
                      space: parseInt(event.currentTarget.value),
                    });
                  }}
                />
              </ItemContainer>
            </TwoElementContainer>
            <TwoElementContainer>
              <ItemContainer>
                <InputTitle>
                  주소(동 단위까지)<span style={{ color: 'red' }}>*</span>
                </InputTitle>
                <Input
                  id="address"
                  type="text"
                  name="address"
                  placeholder="인천광역시 서구"
                  width="256px"
                  value={inputs.address}
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                    setInputs({
                      ...inputs,
                      address: event.currentTarget.value,
                    });
                  }}
                />
              </ItemContainer>
              <ItemContainer>
                <InputTitle>
                  상세 주소<span style={{ color: 'red' }}>*</span>
                </InputTitle>
                <Input
                  id="addressDetail"
                  type="text"
                  name="addressDetail"
                  placeholder="상세 주소"
                  width="256px"
                  value={inputs.addressDetail}
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                    setInputs({
                      ...inputs,
                      addressDetail: event.currentTarget.value,
                    });
                  }}
                />
              </ItemContainer>
            </TwoElementContainer>
            <InputTitle>
              창고 소개(최대 400자)<span style={{ color: 'red' }}>*</span>
            </InputTitle>
            <DescriptionInput
              id="description"
              name="description"
              placeholder="창고"
              width="480px"
              height="240px"
              value={inputs.description}
              onChange={(event: React.SyntheticEvent<HTMLTextAreaElement>) => {
                if (event.currentTarget.value.length >= 399) {
                  message.warning(
                    '창고 소개는 최대 400자 까지 입력 가능합니다.',
                  );
                  event.currentTarget.value = event.currentTarget.value.slice(
                    0,
                    399,
                  );
                  return;
                }
                setInputs({
                  ...inputs,
                  description: event.currentTarget.value,
                });
              }}
            />
            <TwoElementContainer>
              <ItemContainer>
                <InputTitle>
                  영업 시작 시간<span style={{ color: 'red' }}>*</span>
                </InputTitle>
                <Input
                  id="openAt"
                  name="openAt"
                  type="text"
                  placeholder="09:00"
                  width="256px"
                  value={inputs.openAt}
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                    setInputs({ ...inputs, openAt: event.currentTarget.value });
                  }}
                />
              </ItemContainer>
              <ItemContainer>
                <InputTitle>
                  영업 종료 시간<span style={{ color: 'red' }}>*</span>
                </InputTitle>
                <Input
                  id="closeAt"
                  name="closeAt"
                  type="text"
                  placeholder="18:00"
                  width="256px"
                  value={inputs.closeAt}
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                    setInputs({
                      ...inputs,
                      closeAt: event.currentTarget.value,
                    });
                  }}
                />
              </ItemContainer>
            </TwoElementContainer>
            <ItemContainer>
              <InputTitle>
                영업 시간 유의사항<span style={{ color: 'red' }}>*</span>
              </InputTitle>
              <Input
                id="availableTimeDetail"
                name="availableTimeDetail"
                type="text"
                placeholder="물류 센터 사정에 따라 변경될 수 있습니다."
                width="316px"
                value={inputs.availableTimeDetail}
                onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                  setInputs({
                    ...inputs,
                    availableTimeDetail: event.currentTarget.value,
                  });
                }}
              />
            </ItemContainer>
            <InputTitle>
              영업요일 선택<span style={{ color: 'red' }}>*</span>
            </InputTitle>
            <RadioButtonContainer style={{ flexWrap: 'wrap' }}>
              {availableWeekdays.map((day, index) => (
                <div key={index + `AWD_TYPE`} style={{ lineHeight: '1.5' }}>
                  <React.Fragment>
                    <RadioButton
                      id={day.id}
                      type="radio"
                      value={day.value}
                      name="availableWeekdays"
                      checked={inputs.availableWeekdays === day.value}
                      onChange={(
                        event: React.SyntheticEvent<HTMLInputElement>,
                      ) => {
                        setInputs({
                          ...inputs,
                          availableWeekdays: parseInt(
                            event.currentTarget.value,
                          ),
                        });
                      }}
                    />
                    <RadioButtonLabel htmlFor={day.id}>
                      {day.children}
                    </RadioButtonLabel>
                  </React.Fragment>
                </div>
              ))}
            </RadioButtonContainer>
            <ItemContainer>
              <InputTitle>
                월 최소 출고량<span style={{ color: 'red' }}>*</span>
              </InputTitle>
              <Input
                id="minReleasePerMonth"
                name="minReleasePerMonth"
                type="number"
                placeholder="없으면 1 입력"
                width="316px"
                value={inputs.minReleasePerMonth}
                onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                  setInputs({
                    ...inputs,
                    minReleasePerMonth: parseInt(event.currentTarget.value),
                  });
                }}
              />
            </ItemContainer>
            <TwoElementContainer>
              <ItemContainer>
                <InputTitle>
                  보험사 / 보험명<span style={{ color: 'red' }}>*</span>
                </InputTitle>
                {inputs.insurances.map((insurance, idx) => {
                  return (
                    <ButtonAndInputContainer key={`INSURANCES${idx}`}>
                      <Input
                        type="text"
                        width="256px"
                        name="insurances"
                        value={insurance}
                        onChange={(
                          event: React.SyntheticEvent<HTMLInputElement>,
                        ) => {
                          let temp = inputs.insurances;
                          temp[idx] = event.currentTarget.value;
                          setInputs({ ...inputs, insurances: temp });
                        }}
                      />
                      &nbsp;
                      {idx === 0 ? (
                        <AddButton onClick={() => addInsurances()}>
                          추가
                        </AddButton>
                      ) : null}
                      {idx !== 0 ? (
                        <RemoveButton onClick={() => removeInsurances(idx)}>
                          삭제
                        </RemoveButton>
                      ) : null}
                    </ButtonAndInputContainer>
                  );
                })}
              </ItemContainer>
              <ItemContainer>
                <InputTitle>
                  경비 업체<span style={{ color: 'red' }}>*</span>
                </InputTitle>
                {inputs.securityCompanies.map((company, idx) => {
                  return (
                    <ButtonAndInputContainer key={`SEC_COMPS${idx}`}>
                      <Input
                        type="text"
                        width="256px"
                        name="securityCompanies"
                        value={company}
                        onChange={(
                          event: React.SyntheticEvent<HTMLInputElement>,
                        ) => {
                          let temp = inputs.securityCompanies;
                          temp[idx] = event.currentTarget.value;
                          setInputs({ ...inputs, securityCompanies: temp });
                        }}
                      />
                      &nbsp;
                      {idx === 0 ? (
                        <AddButton onClick={() => addSecurityCompanies()}>
                          추가
                        </AddButton>
                      ) : null}
                      {idx !== 0 ? (
                        <RemoveButton
                          onClick={() => removeSecurityCompanies(idx)}
                        >
                          삭제
                        </RemoveButton>
                      ) : null}
                    </ButtonAndInputContainer>
                  );
                })}
              </ItemContainer>
            </TwoElementContainer>
            <InputTitle>
              업종 선택<span style={{ color: 'red' }}>*</span>
            </InputTitle>
            <RadioButtonContainer>
              {warehouseTypes.map((type, index) => (
                <div key={index + `WH_TYPE`}>
                  <RadioButton
                    id={type.id}
                    type="radio"
                    value={type.value}
                    name="warehouseType"
                    checked={type.value === inputs.warehouseType}
                    onChange={(
                      event: React.SyntheticEvent<HTMLInputElement>,
                    ) => {
                      setInputs({
                        ...inputs,
                        warehouseType: event.currentTarget.value,
                      });
                    }}
                  />
                  <RadioButtonLabel htmlFor={type.id}>
                    {type.children}
                  </RadioButtonLabel>
                </div>
              ))}
            </RadioButtonContainer>
            <InputTitle>
              냉난방 지원 방식 선택<span style={{ color: 'red' }}>*</span>
            </InputTitle>
            <RadioButtonContainer>
              {airConditioningTypes.map((type, index) => (
                <div key={index + `AC_TYPE`}>
                  <RadioButton
                    id={type.id}
                    type="radio"
                    value={type.value}
                    name="airConditioningType"
                    checked={type.value === inputs.airConditioningType}
                    onChange={(
                      event: React.SyntheticEvent<HTMLInputElement>,
                    ) => {
                      setInputs({
                        ...inputs,
                        airConditioningType: event.currentTarget.value,
                      });
                    }}
                  />
                  <RadioButtonLabel htmlFor={type.id}>
                    {type.children}
                  </RadioButtonLabel>
                </div>
              ))}
            </RadioButtonContainer>
            <InputTitle>
              대표 품목 선택(최대 3개)<span style={{ color: 'red' }}>*</span>
            </InputTitle>
            <CheckboxContainer>
              {mainItemTypes.map((type, index) => (
                <React.Fragment key={index + 'MAIN_TYPE'}>
                  <CheckBoxLine>
                    <CheckBox
                      id={type.id}
                      type="checkbox"
                      value={type.value}
                      name="mainItemTypes"
                      checked={checkMatch(type.value, inputs.mainItemTypes)}
                      onChange={(
                        event: React.SyntheticEvent<HTMLInputElement>,
                      ) => {
                        let tempInputs = inputs.mainItemTypes;
                        if (event.currentTarget.checked) {
                          if (tempInputs.length >= 3) {
                            alert('대표 품목은 최대 3개까지 선택 가능합니다.');
                            let length = tempInputs.length;
                            tempInputs.splice(length - 1, 1);
                            setInputs({ ...inputs, mainItemTypes: tempInputs });
                          }
                          tempInputs.push(event.currentTarget.value);
                        } else {
                          let index = tempInputs.indexOf(
                            event.currentTarget.value,
                          );
                          tempInputs.splice(index, 1);
                        }
                        setInputs({ ...inputs, mainItemTypes: tempInputs });
                      }}
                    />
                    <RadioButtonLabel htmlFor={type.id}>
                      {type.children}
                    </RadioButtonLabel>
                  </CheckBoxLine>
                  {(index + 1) % 4 === 0 ? <br /> : null}
                </React.Fragment>
              ))}
            </CheckboxContainer>
            <InputTitle>창고 시설 해당사항 선택</InputTitle>
            <CheckboxContainer>
              <CheckBoxLine>
                <CheckBox
                  id="cctvExist"
                  type="checkbox"
                  value="cctvExist"
                  checked={inputs.cctvExist}
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                    setInputs({
                      ...inputs,
                      cctvExist: event.currentTarget.checked,
                    });
                  }}
                />
                <RadioButtonLabel htmlFor="cctvExist">CCTV</RadioButtonLabel>
              </CheckBoxLine>
              <CheckBoxLine>
                <CheckBox
                  id="doorLockExist"
                  type="checkbox"
                  value="doorLockExist"
                  checked={inputs.doorLockExist}
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                    setInputs({
                      ...inputs,
                      doorLockExist: event.currentTarget.checked,
                    });
                  }}
                />
                <RadioButtonLabel htmlFor="doorLockExist">
                  잠금 장치
                </RadioButtonLabel>
              </CheckBoxLine>
              <CheckBoxLine>
                <CheckBox
                  id="workerExist"
                  type="checkbox"
                  value="workerExist"
                  checked={inputs.workerExist}
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                    setInputs({
                      ...inputs,
                      workerExist: event.currentTarget.checked,
                    });
                  }}
                />
                <RadioButtonLabel htmlFor="workerExist">
                  현장 인력
                </RadioButtonLabel>
              </CheckBoxLine>
              <CheckBoxLine>
                <CheckBox
                  id="canPark"
                  type="checkbox"
                  value="canPark"
                  checked={inputs.canPark}
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                    setInputs({
                      ...inputs,
                      canPark: event.currentTarget.checked,
                    });
                  }}
                />
                <RadioButtonLabel htmlFor="canPark">주차</RadioButtonLabel>
              </CheckBoxLine>
            </CheckboxContainer>
            <InputTitle>
              창고 유형 선택(다중 선택 가능)
              <span style={{ color: 'red' }}>*</span>
            </InputTitle>
            <CheckboxContainer>
              {warehouseConditions.map((condition, index) => (
                <React.Fragment key={index + `COND`}>
                  <CheckBoxLine>
                    <CheckBox
                      id={condition.id}
                      type="checkbox"
                      value={condition.value}
                      name="warehouseCondition"
                      checked={checkMatch(
                        condition.value,
                        inputs.warehouseCondition,
                      )}
                      onChange={(
                        event: React.SyntheticEvent<HTMLInputElement>,
                      ) => {
                        let tempInputs = inputs;
                        if (event.currentTarget.checked) {
                          tempInputs.warehouseCondition.push(
                            event.currentTarget.value,
                          );
                        } else {
                          let index = tempInputs.warehouseCondition.indexOf(
                            event.currentTarget.value,
                          );
                          tempInputs.warehouseCondition.splice(index, 1);
                        }
                        setInputs(tempInputs);
                      }}
                    />
                    <RadioButtonLabel htmlFor={condition.id}>
                      {condition.children}
                    </RadioButtonLabel>
                  </CheckBoxLine>
                </React.Fragment>
              ))}
            </CheckboxContainer>
            <TwoElementContainer>
              <ItemContainer>
                <InputTitle>
                  창고 위도 값<span style={{ color: 'red' }}>*</span>
                </InputTitle>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  placeholder="34.128392"
                  width="256px"
                  value={inputs.latitude}
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                    setInputs({
                      ...inputs,
                      latitude: parseFloat(event.currentTarget.value),
                    });
                  }}
                />
              </ItemContainer>
              <ItemContainer>
                <InputTitle>
                  창고 경도 값<span style={{ color: 'red' }}>*</span>
                </InputTitle>
                <Input
                  id="longitude"
                  name="longitude"
                  type="text"
                  placeholder="128.123123"
                  width="256px"
                  value={inputs.longitude}
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) => {
                    setInputs({
                      ...inputs,
                      longitude: parseFloat(event.currentTarget.value),
                    });
                  }}
                />
              </ItemContainer>
            </TwoElementContainer>
            <ItemContainer>
              <InputTitle>
                제휴 택배사<span style={{ color: 'red' }}>*</span>
              </InputTitle>
              {inputs.deliveryTypes.map((type, idx) => {
                return (
                  <ButtonAndInputContainer key={`DELIVERY_TYPES${idx}`}>
                    <Input
                      type="text"
                      width="256px"
                      name="deliveryTypes"
                      value={type}
                      onChange={(
                        event: React.SyntheticEvent<HTMLInputElement>,
                      ) => {
                        let temp = inputs.deliveryTypes;
                        temp[idx] = event.currentTarget.value;
                        setInputs({ ...inputs, deliveryTypes: temp });
                      }}
                    />
                    &nbsp;
                    {idx === 0 ? (
                      <AddButton onClick={() => addDeliveryTypes()}>
                        추가
                      </AddButton>
                    ) : null}
                    {idx !== 0 ? (
                      <RemoveButton onClick={() => removeDeliveryTypes(idx)}>
                        삭제
                      </RemoveButton>
                    ) : null}
                  </ButtonAndInputContainer>
                );
              })}
            </ItemContainer>
            <ItemContainer>
              <InputTitle>창고 시설 안내사항</InputTitle>
              {inputs.warehouseFacilityUsages.map((usage, idx) => {
                return (
                  <ButtonAndInputContainer key={`WH_FACILITY_USAGES${idx}`}>
                    <Input
                      type="text"
                      width="316px"
                      name="warehouseFacilityUsages"
                      value={usage}
                      onChange={(
                        event: React.SyntheticEvent<HTMLInputElement>,
                      ) => {
                        let temp = inputs.warehouseFacilityUsages;
                        temp[idx] = event.currentTarget.value;
                        setInputs({ ...inputs, warehouseFacilityUsages: temp });
                      }}
                    />
                    &nbsp;
                    {idx === 0 ? (
                      <AddButton onClick={() => addWarehouseFacilityUsages()}>
                        추가
                      </AddButton>
                    ) : null}
                    {idx !== 0 ? (
                      <RemoveButton
                        onClick={() => removeWarehouseFacilityUsages(idx)}
                      >
                        삭제
                      </RemoveButton>
                    ) : null}
                  </ButtonAndInputContainer>
                );
              })}
            </ItemContainer>
            <ItemContainer>
              <InputTitle>창고 이용 주의사항</InputTitle>
              {inputs.warehouseUsageCautions.map((caution, idx) => {
                return (
                  <ButtonAndInputContainer key={`WH_USAGE_CAUTIONS${idx}`}>
                    <Input
                      type="text"
                      width="316px"
                      name="warehouseUsageCautions"
                      value={caution}
                      onChange={(
                        event: React.SyntheticEvent<HTMLInputElement>,
                      ) => {
                        let temp = inputs.warehouseUsageCautions;
                        temp[idx] = event.currentTarget.value;
                        setInputs({ ...inputs, warehouseUsageCautions: temp });
                      }}
                    />
                    &nbsp;
                    {idx === 0 ? (
                      <AddButton onClick={() => addWarehouseUsageCautions()}>
                        추가
                      </AddButton>
                    ) : null}
                    {idx !== 0 ? (
                      <RemoveButton
                        onClick={() => removeWarehouseUsageCautions(idx)}
                      >
                        삭제
                      </RemoveButton>
                    ) : null}
                  </ButtonAndInputContainer>
                );
              })}
            </ItemContainer>
            <SubmitButton onClick={() => register()}>
              창고 정보 변경하기
            </SubmitButton>
          </TextContainer>
        </RegisterContainer>
      </Wrapper>
    </Container>
  );
};

export default EditData;
