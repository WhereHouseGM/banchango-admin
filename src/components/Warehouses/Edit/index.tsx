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
  ArrayInput,
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
    warehouseFacilityUsages: Array<string> | null;
    warehouseUsageCautions: Array<string> | null;
    images: Array<string> | null;
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

  const [facilityCheck, setFacilityCheck] = useState(FacilityChecksInterface);

  const [deliveryTypes, setDeliveryTypes] = useState([
    <ButtonAndInputContainer key="DELIVERYTYPES0">
      <Input
        className="deliveryTypes"
        name="deliveryTypes"
        type="text"
        width="256px"
      />
      &nbsp;
      <AddButton onClick={() => addDeliveryTypes()}>추가</AddButton>
    </ButtonAndInputContainer>,
  ]);

  const [warehouseFacilityUsages, setWarehouseFaciltiyUsages] = useState([
    <ButtonAndInputContainer key="WHFACILITYUSAGES0">
      <ArrayInput
        id="warehouseFacilityUsages0"
        className="warehouseFacilityUsages"
        name="warehouseFacilityUsages"
        type="text"
        width="316px"
      />
      &nbsp;
      <AddButton onClick={() => addWarehouseFacilityUsages()}>추가</AddButton>
    </ButtonAndInputContainer>,
  ]);

  const [warehouseUsageCautions, setWarehouseUsageCautions] = useState([
    <ButtonAndInputContainer key="WHUSAGECAUTIONS0">
      <ArrayInput
        id="warehouseUsageCautions0"
        className="warehouseUsageCautions"
        name="warehouseUsageCautions"
        type="text"
        width="316px"
      />
      &nbsp;
      <AddButton onClick={() => addWarehouseUsageCautions()}>추가</AddButton>
    </ButtonAndInputContainer>,
  ]);

  const [insurances, setInsurances] = useState([
    inputs.insurances.map((insurance, idx) => {
      return (
        <ButtonAndInputContainer key={`INSURANCES${idx}`}>
          <Input
            type="text"
            width="256px"
            name="insurances"
            value={insurance}
          />
          &nbsp;
          <AddButton onClick={() => addInsurances()}>추가</AddButton>
        </ButtonAndInputContainer>
      );
    }),
  ]);

  const [securityCompanies, setSecurityCompanies] = useState([
    <ButtonAndInputContainer key="SECCOMPS0">
      <Input type="text" width="256px" name="securityCompanies" />
      &nbsp;
      <AddButton onClick={() => addSecurityCompanies()}>추가</AddButton>
    </ButtonAndInputContainer>,
  ]);

  const addInsurances = () => {
    let arrOfInsurances = insurances;
    let key = arrOfInsurances.length;
    arrOfInsurances.push(
      <ButtonAndInputContainer key={`INSURANCES${key}`}>
        <Input type="text" width="256px" name="insurances" />
        &nbsp;
        {key === 1 ? (
          <RemoveButton onClick={() => removeInsurances()}>삭제</RemoveButton>
        ) : null}
      </ButtonAndInputContainer>,
    );
    setInsurances([...arrOfInsurances]);
  };

  const addSecurityCompanies = () => {
    let arrOfSecurityCompanies = securityCompanies;
    let key = arrOfSecurityCompanies.length;
    arrOfSecurityCompanies.push(
      <ButtonAndInputContainer key={`SECCOMPS${key}`}>
        <Input type="text" width="256px" name="securityCompanies" />
        &nbsp;
        {key === 1 ? (
          <RemoveButton onClick={() => removeSecurityCompanies()}>
            삭제
          </RemoveButton>
        ) : null}
      </ButtonAndInputContainer>,
    );
    setSecurityCompanies([...arrOfSecurityCompanies]);
  };

  const addDeliveryTypes = () => {
    let tempDeliveryTypes = deliveryTypes;
    let key = tempDeliveryTypes.length;
    tempDeliveryTypes.push(
      <ButtonAndInputContainer key={`DELIVERYTYPES${key}`}>
        <Input
          className="deliveryTypes"
          name="deliveryTypes"
          type="text"
          width="256px"
        />
        &nbsp;
        {key === 1 ? (
          <RemoveButton onClick={removeDeliveryTypes}>삭제</RemoveButton>
        ) : null}
      </ButtonAndInputContainer>,
    );
    setDeliveryTypes([...tempDeliveryTypes]);
  };

  const addWarehouseFacilityUsages = () => {
    let arrOfWarehouseFacilityUsages = warehouseFacilityUsages;
    let key = arrOfWarehouseFacilityUsages.length;
    arrOfWarehouseFacilityUsages.push(
      <ButtonAndInputContainer key={`WHFACILITYUSAGES${key}`}>
        <ArrayInput
          id={`warehouseFacilityUsages${key}`}
          className="warehouseFacilityUsages"
          name="warehouseFacilityUsages"
          type="text"
          width="316px"
        />
        &nbsp;
        {key === 1 ? (
          <RemoveButton onClick={removeWarehouseFacilityUsages}>
            삭제
          </RemoveButton>
        ) : null}
      </ButtonAndInputContainer>,
    );
    setWarehouseFaciltiyUsages([...arrOfWarehouseFacilityUsages]);
  };

  const addWarehouseUsageCautions = () => {
    let arrOfWarehouseUsageCautions = warehouseUsageCautions;
    let key = arrOfWarehouseUsageCautions.length;
    arrOfWarehouseUsageCautions.push(
      <ButtonAndInputContainer key={`WHUSAGECAUTIONS${key}`}>
        <ArrayInput
          id={`warehouseUsageCautions${key}`}
          className="warehouseUsageCautions"
          name="warehouseUsageCautions"
          type="text"
          width="316px"
        />
        &nbsp;
        {key === 1 ? (
          <RemoveButton onClick={removeWarehouseUsageCautions}>
            삭제
          </RemoveButton>
        ) : null}
      </ButtonAndInputContainer>,
    );
    setWarehouseUsageCautions([...arrOfWarehouseUsageCautions]);
  };

  const removeDeliveryTypes = () => {
    let beforeDeliveryTypes = deliveryTypes;
    beforeDeliveryTypes.pop();
    setDeliveryTypes([...beforeDeliveryTypes]);
  };

  const removeWarehouseFacilityUsages = () => {
    let arrOfWarehouseFacilityUsages = warehouseFacilityUsages;
    arrOfWarehouseFacilityUsages.pop();
    setWarehouseFaciltiyUsages([...arrOfWarehouseFacilityUsages]);
  };

  const removeWarehouseUsageCautions = () => {
    let arrOfWarehouseUsageCautions = warehouseUsageCautions;
    arrOfWarehouseUsageCautions.pop();
    setWarehouseUsageCautions([...arrOfWarehouseUsageCautions]);
  };

  const removeInsurances = () => {
    let arrOfInsurances = insurances;
    arrOfInsurances.pop();
    setInsurances([...arrOfInsurances]);
  };

  const removeSecurityCompanies = () => {
    let arrOfSecurityCompanies = securityCompanies;
    arrOfSecurityCompanies.pop();
    setSecurityCompanies([...arrOfSecurityCompanies]);
  };

  const setDeliveryTypesToState = () => {
    let list = document.getElementsByName(
      InputType.DELIVERY_TYPES,
    ) as NodeListOf<HTMLInputElement>;
    let _deliveryTypes = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].value.trim() !== '') {
        _deliveryTypes.push(list[i].value);
      }
    }
    let tempInputs = inputs;
    tempInputs.deliveryTypes = _deliveryTypes;
    setInputs(tempInputs);
  };

  const setWarehouseFacilityUsagesToState = () => {
    let list = document.getElementsByName(
      InputType.WAREHOUSE_FACILITY_USAGES,
    ) as NodeListOf<HTMLInputElement>;
    let _warehouseFacilityUsages = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].value.trim() !== '') {
        _warehouseFacilityUsages.push(list[i].value);
      }
    }
    let tempInputs = inputs;
    tempInputs.warehouseFacilityUsages = _warehouseFacilityUsages;
    setInputs(tempInputs);
  };

  const setWarehouseUsageCautionsToState = () => {
    let list = document.getElementsByName(
      InputType.WAREHOUSE_USAGE_CAUTIONS,
    ) as NodeListOf<HTMLInputElement>;
    let _warehouseUsageCautions = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].value.trim() !== '') {
        _warehouseUsageCautions.push(list[i].value);
      }
    }
    let tempInputs = inputs;
    tempInputs.warehouseUsageCautions = _warehouseUsageCautions;
    setInputs(tempInputs);
  };

  const setInsurancesToState = () => {
    let list = document.getElementsByName(
      InputType.INSURANCES,
    ) as NodeListOf<HTMLInputElement>;
    let _insurances = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].value.trim() !== '') {
        _insurances.push(list[i].value);
      }
    }
    let tempInputs = inputs;
    tempInputs.insurances = _insurances;
    setInputs(tempInputs);
  };

  const setSecurityCompaniesToState = () => {
    let list = document.getElementsByName(
      InputType.SECURITY_COMPANIES,
    ) as NodeListOf<HTMLInputElement>;
    let _securityCompanies = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].value.trim() !== '') {
        _securityCompanies.push(list[i].value);
      }
    }
    let tempInputs = inputs;
    tempInputs.securityCompanies = _securityCompanies;
    setInputs(tempInputs);
  };

  const register = () => {
    setDeliveryTypesToState();
    setWarehouseFacilityUsagesToState();
    setWarehouseUsageCautionsToState();
    setInsurancesToState();
    setSecurityCompaniesToState();
    let requestBody = { ...inputs, ...facilityCheck };
    if (inputs.name === null || inputs.name.trim() === '') {
      message.warning('창고명을 입력해주세요.');
      return;
    } else if (inputs.space === 0 || inputs.space === 0) {
      message.warning('창고 평수를 입력해주세요.');
      return;
    } else if (inputs.address === null || inputs.address.trim() === '') {
      message.warning('주소를 입력해주세요.');
      return;
    } else if (
      inputs.addressDetail === null ||
      inputs.addressDetail.trim() === ''
    ) {
      message.warning('상세 주소를 입력해주세요.');
      return;
    } else if (
      inputs.description === null ||
      inputs.description.trim() === ''
    ) {
      message.warning('창고 소개를 입력해주세요.');
      return;
    } else if (inputs.openAt === null || inputs.openAt.trim() === '') {
      message.warning('영업 시작 시간을 입력해주세요.');
      return;
    } else if (inputs.closeAt === null || inputs.closeAt.trim() === '') {
      message.warning('영업 종료 시간을 입력해주세요.');
      return;
    } else if (
      inputs.availableTimeDetail === null ||
      inputs.availableTimeDetail.trim() === ''
    ) {
      message.warning('영업 시간 유의사항을 입력해주세요');
      return;
    } else if (inputs.availableWeekdays === null) {
      message.warning('영업요일을 선택해주세요.');
      return;
    } else if (inputs.minReleasePerMonth === null) {
      message.warning('월 최소 출고량을 입력해 주세요.');
      return;
    } else if (inputs.insurances.length === 0) {
      message.warning('보험사를 1개 이상 입력해주세요.');
      return;
    } else if (inputs.securityCompanies.length === 0) {
      message.warning('경비 업체를 1개 이상 입력해주세요.');
      return;
    } else if (inputs.warehouseType === null) {
      message.warning('업종을 선택해주세요.');
      return;
    } else if (inputs.airConditioningType === null) {
      message.warning('냉난방 지원 방식을 선택해주세요.');
      return;
    } else if (inputs.mainItemTypes.length === 0) {
      message.warning('대표 품목을 1개 이상 선택해주세요.');
      return;
    } else if (inputs.warehouseCondition.length === 0) {
      message.warning('창고 유형을 1개 이상 선택해주세요.');
      return;
    } else if (inputs.deliveryTypes.length === 0) {
      message.warning('제휴 택배사를 1개 이상 입력해주세요.');
      return;
    }
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
                {insurances}
              </ItemContainer>
              <ItemContainer>
                <InputTitle>
                  경비 업체<span style={{ color: 'red' }}>*</span>
                </InputTitle>
                {securityCompanies}
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
                      onChange={(
                        event: React.SyntheticEvent<HTMLInputElement>,
                      ) => {
                        let tempInputs = inputs;
                        if (event.currentTarget.checked) {
                          if (tempInputs.mainItemTypes.length >= 3) {
                            alert('대표 품목은 최대 3개까지 선택 가능합니다.');
                          }
                          tempInputs.mainItemTypes.push(
                            event.currentTarget.value,
                          );
                        } else {
                          let index = tempInputs.mainItemTypes.indexOf(
                            event.currentTarget.value,
                          );
                          tempInputs.mainItemTypes.splice(index, 1);
                        }
                        setInputs(tempInputs);
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
              {facilityChecks.map((check, index) => (
                <React.Fragment key={index + `CHECK`}>
                  <CheckBoxLine>
                    <CheckBox
                      id={check.id}
                      type="checkbox"
                      value={check.value}
                      name="facilityChecks"
                      onChange={(
                        event: React.SyntheticEvent<HTMLInputElement>,
                      ) => {
                        interface IFacilityChecks {
                          [key: string]: boolean;
                        }
                        let tempFacilityCheck: IFacilityChecks = facilityCheck;
                        tempFacilityCheck[event.currentTarget.value] =
                          event.currentTarget.checked;
                        setFacilityCheck(tempFacilityCheck);
                      }}
                    />
                    <RadioButtonLabel htmlFor={check.id}>
                      {check.children}
                    </RadioButtonLabel>
                  </CheckBoxLine>
                </React.Fragment>
              ))}
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
            <ItemContainer>
              <InputTitle>
                제휴 택배사<span style={{ color: 'red' }}>*</span>
              </InputTitle>
              {deliveryTypes}
            </ItemContainer>
            <ItemContainer>
              <InputTitle>창고 시설 안내사항</InputTitle>
              {warehouseFacilityUsages}
            </ItemContainer>
            <ItemContainer>
              <InputTitle>창고 이용 주의사항</InputTitle>
              {warehouseUsageCautions}
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
