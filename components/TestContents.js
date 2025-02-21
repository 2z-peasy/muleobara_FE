import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';

const TestContents = ({
  title,
  testValue,
  setTestValue,
  index,
  setTestResult,
  testResult,
  next,
}) => {
  const [selectedButton, setSelectedButton] = useState(0);

  const handleClick = (index, value) => {
    const title_list = ['extroversion', 'decision', 'risk', 'comfort', 'time', 'social', 'budget'];
    const title = title_list[index];
    console.log(value);

    setTestResult((prevResult) => ({
      ...prevResult,
      [title]: value, // 선택된 항목 업데이트
    }));

    setSelectedButton(value);
  };

  useEffect(() => {
    setSelectedButton(0);
  }, [next]);

  return (
    <TestContentsBody>
      <ContentsTitle>{title}</ContentsTitle>
      <ButtonContainer>
        <Yes>그렇다</Yes>

        <BigButton
          onPress={() => handleClick(index, 100)}
          style={{ backgroundColor: selectedButton === 100 ? '#f7c7a7' : '#efefef' }}
        />
        <SmallButton
          onPress={() => handleClick(index, 75)}
          style={{ backgroundColor: selectedButton === 75 ? '#f7c7a7' : '#efefef' }}
        />
        <SmallButton
          onPress={() => handleClick(index, 50)}
          style={{ backgroundColor: selectedButton === 50 ? '#f7c7a7' : '#efefef' }}
        />
        <BigButton
          onPress={() => handleClick(index, 25)}
          style={{ backgroundColor: selectedButton === 25 ? '#f7c7a7' : '#efefef' }}
        />
        <No>아니다</No>
      </ButtonContainer>
      <DottedLine>- - - - - - - - - - - - - - - - - - -</DottedLine>
    </TestContentsBody>
  );
};

export default TestContents;

const TestContentsBody = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: keep-all;
`;

const ContentsTitle = styled.Text`
  font-weight: 600;
  font-size: 17px;
  padding: 20px 0;
  width: 300px;
  text-align: center;
`;

const Yes = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

const No = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-left: 26px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BigButton = styled.TouchableOpacity`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  margin-left: 26px;
  background-color: #efefef;
  &:hover {
    background-color: #f7c7a7;
  }
  &:focus {
    background-color: #f7c7a7;
  }
`;

const SmallButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  margin-left: 26px;
  background-color: #efefef;
  &:hover {
    background-color: #f7c7a7;
  }
`;

const DottedLine = styled.Text`
  margin-top: 15px;
  font-weight: 800;
  font-size: 30px;
  color: #ced3de;
`;
