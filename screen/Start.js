import React from "react";
import styled from "styled-components";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MarginVertical from "../components/MarginVertical";



const StartScreenContainer = styled.View`
  width: 375px; /* 일반 모바일 화면 크기 */
  height: 852px; /* 모바일 높이 */
  margin: 0 auto; /* 중앙 정렬 */
  display:flex;
  justify-content:center;
  align-items:center;
  background-color: #fff;
`;

const WelcomeContainer = styled.View`
  margin-top:-150;
  margin-bottom:50;
  
`;

const Images = styled.Image`
  width: 150px;
  height: auto;
`;

const ButtonContainer = styled.View`
  margin-top: 0px;
  display: flex;
  flex-direction: column; /* 버튼을 세로 정렬 */
  gap: 10px; /* 버튼 간 간격 */
`;

const Button = styled.TouchableOpacity`
  display: flex;
  width: 320px;
  height: 57px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 52px;
  shadowColor:gray;
  shadowOffset:{
    width:10px;
    height:10px;
  };
  shadowRadius:10px;
  border:1px solid rgba(0, 0, 0, 0.17);
`;

const ButtonText = styled.Text`
  color: #000;
  font-size:18px;
`

function Start() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor:"white"}}>
    
      <StartScreenContainer>
        <WelcomeContainer>
          <Image source={require('../assets/logo.png')} style={{marginLeft:'10'}}></Image>
          <StartTitle>물어바라에 오신것을{"\n"}환영합니다</StartTitle>
          <MarginVertical margin={20}/>
          <Text style={{color:"#858585", fontWeight:700, fontSize:15}}>결정을 대신 해드릴게요! 무엇이든 물어보세요!</Text>
        </WelcomeContainer>
        <ButtonContainer>
          <Button style={{backgroundColor:"#FEE500"}}>
            <ButtonText>카카오 로그인</ButtonText>
          </Button>
          <Button>
            <ButtonText>구글 로그인</ButtonText>
          </Button>
          <Button onPress={() => navigation.navigate("LogIn")}>
            <ButtonText>일반 로그인</ButtonText>
          </Button>
        </ButtonContainer>
        <MarginVertical margin={68}/>
        <View style={{display:'flex', flexDirection:'row', gap:10, justifyContent:'center', alignItems:'center'}}>
          <BorderLine/>
          <Text style={{color:"#686C80", fontWeight:700, fontSize:14}}>또는</Text>
          <BorderLine/>
        </View>
        <MarginVertical margin={15}/>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={{fontSize:15, fontWeight:700, color:"#858585"}}>회원가입하러 가기</Text>
        </TouchableOpacity>
      </StartScreenContainer>
    
    </SafeAreaView>
  );
}

export default Start;

const StartTitle = styled.Text`
color: #000;
text-align: center;
font-family: Pretendard;
font-size: 32px;
font-style: normal;
font-weight: 800;
line-height: 34px;
`

const BorderLine = styled.View`
  background: #CED3DE;
  width: 140px;
  height: 2px;
`
