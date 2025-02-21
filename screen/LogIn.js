import React, { useState } from "react";
import { Alert, Dimensions, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  

  const handleLogin = async () => {
    setError(null); // 에러 초기화

    try {
      const response = await axios.post(
        `http://49.50.163.226:8080/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { message, nickname, userId, testYN } = response.data;
      Alert.alert(`안녕하세요, ${nickname}님!`);
      setUserId(userId);
      testYN === "Y" ? navigation.navigate("Main") : navigation.navigate("Test");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "로그인 실패";
      setError(errorMessage);

    }
  };

  return (
    <SafeAreaView style={{backgroundColor:"#fff"}}>
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <BackArrow source={require("../assets/backarrow.png")} />
        </BackButton>
        
      </Header>

      <Form>
        <HeaderTitle>로그인</HeaderTitle>
        <Input
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <SubmitButton onPress={() => navigation.navigate("StartMbti")}>
          <SubmitButtonText>로그인하기</SubmitButtonText>
        </SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
    </SafeAreaView>
  );
};

export default LogIn;

// Styled Components
const Container = styled.View`
 
  align-items: center;
  background-color: #fff;
  height:${Dimensions.get('screen').height}px;
`;

const Header = styled.View`
  position: absolute;
  top: 40px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
`;

const BackArrow = styled.Image`
  width: 24px;
  height: 24px;
`;

const HeaderTitle = styled.Text`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom:40px;
`;

const Form = styled.View`
  width: 100%;
  margin-top:200px;
  padding: 20px;
  align-items: center;
`;

const Input = styled.TextInput`
  width: 300px;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 14px;
  color: #555;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 300px;
  padding: 15px;
  border-radius: 25px;
  background-color: #f7c7a7;
  align-items: center;
  margin-top:50px;
`;

const SubmitButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const ErrorMessage = styled.Text`
  margin-top: 10px;
  color: red;
  font-size: 14px;
  text-align: center;
`;
