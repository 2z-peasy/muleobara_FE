import React, { useState } from 'react';
import styled from 'styled-components/native';
import TestContents from '../components/TestContents';
import { useNavigation } from '@react-navigation/native';
import back_arrow from '../assets/arrow_back.png';
import axios from 'axios';
import { Dimensions, SafeAreaView, Text } from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Test = () => {
  const [next, setNext] = useState(false);
  const [testResult, setTestResult] = useState({
    extroversion: null,
    decision: null,
    risk: null,
    comfort: null,
    time: null,
    social: null,
    budget: null,
  });
  const [testValue, setTestValue] = useState('');
  const title_1 = [
    '새로운 사람을 만나는 것이 좋다',
    '결정을 내릴 때 빠르게 판단하는 편이다',
    '새로운 경험을 시도하는 것을 좋아한다',
    '편안함이 보장된 선택을 선호한다',
  ];
  const title_2 = [
    '여유로운 계획보다는 빠르게 움직이는 것을 선호한다',
    '다른 사람들과 함께하는 활동이 좋다',
    '어떠한 결정을 할 때 가격이 합리적인지 먼저 고려하는 편이다',
  ];

  const navigation = useNavigation();

  async function handleSubmit() {
    try {
      const response = await axios.post(
        'http://49.50.163.226:8080/tests/initial',
        {
          userId: userId,
          testResults: testResult,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(testResult);
      console.log(userId);
    }
  }

  return (
    <SafeAreaView style={{backgroundColor:"white"}}>
    <TestBody>
      <TestHeader>
        {next ? (
          <TestBackButton onPress={() => setNext(false)}>
            <BackArrow source={back_arrow} />
          </TestBackButton>
        ) : null}
        <TestTitle>성향 테스트</TestTitle>
      </TestHeader>

      {next ? (
        <>
          {title_2.map((el, index) => {
            return (
              <TestContents
                key={index}
                title={el}
                testValue={testValue}
                setTestValue={setTestValue}
                index={index + 4}
                setTestResult={setTestResult}
                testResult={testResult}
                next={next}
              />
            );
          })}
          <SubmitButton onPress={handleSubmit}>
            <SubmitText>제출하기</SubmitText>
          </SubmitButton>
        </>
      ) : (
        <>
          {title_1.map((el, index) => {
            return (
              <TestContents
                key={index}
                title={el}
                testValue={testValue}
                setTestValue={setTestValue}
                index={index}
                setTestResult={setTestResult}
                testResult={testResult}
                next={next}
              />
            );
          })}
          <NextButton onPress={() => setNext(true)}>
            <NextButtonText>다음</NextButtonText>
          </NextButton>
        </>
      )}
    </TestBody>
    </SafeAreaView>
  );
};

export default Test;

const TestBody = styled.View`
  background-color: #fff;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height:${height}
`;

const TestHeader = styled.View`
  display: flex;
  justify-content: center;
  aling-itmes:center;
  flex-direction:row;
  position:absolute;
  top:5px;
  width: ${width};
  
`;

const TestTitle = styled.Text`
  font-weight: 800;
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const TestBackButton = styled.TouchableOpacity`
  border: none;
  
  position: absolute;
  left: 20px;
  top: 23px;
`;

const BackArrow = styled.Image`
  width: 25px;
  height: 25px;
`;

const NextButton = styled.TouchableOpacity`
  
  border: none;
  width: 40px;
  margin: 20px;
  position: relative;
  right: -150px;
  
`;

const NextButtonText = styled.Text`
  font-size: 24px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 235px;
  height: 49px;
  padding: 16px;
  border-radius: 20px;
  background: #f7c7a7;
  border: none;
  
  
  margin-top: 70px;
  &:hover {
    background: rgba(247, 199, 167, 0.7);
  }
`;

const SubmitText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
`

