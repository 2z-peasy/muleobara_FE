import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import axios from "axios";
import { Dimensions, SafeAreaView } from "react-native";
import MarginVertical from "../components/MarginVertical";

const height = Dimensions.get('screen').height;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  

  useEffect(() => {
    console.log(height)
  },[])

  return (
    <SafeAreaView style={{backgroundColor:"white"}}>
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <BackArrow source={require("../assets/backarrow.png")} />
        </BackButton>
        
      </Header>

      <Form>
        <HeaderTitle>회원가입</HeaderTitle>
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
        <Input
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        </Form>
        <MarginVertical margin={40}/>
        <SubmitButton onPress={() => navigation.navigate("SettingNickname")}>
          <SubmitButtonText>다음</SubmitButtonText>
        </SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      
    </Container>
    </SafeAreaView>
  );
};

export default SignUp;

// Styled Components
const Container = styled.View`
  
  align-items: center;
  justify-content: center;
  background-color: #fff;
  height:${height};

  
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  position:absolute;
  top:10;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 30;
  top:10;
`;

const BackArrow = styled.Image`
  width: 24px;
  height: 24px;
`;

const HeaderTitle = styled.Text`
  text-align: center;
  font-size: 22px;
  font-weight: 900;
  color: #333;
  margin-bottom:40px;
`;

const Form = styled.View`
  margin-top: -120px;
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
`;

const SubmitButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const ErrorMessage = styled.Text`
  margin-top: 10px;
  color: red;
  text-align: center;
  font-size: 14px;
`;
