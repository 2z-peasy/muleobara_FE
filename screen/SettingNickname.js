import React, { useState } from 'react'
import { Dimensions, SafeAreaView, View } from 'react-native'
import { styled } from 'styled-components';
import MarginVertical from '../components/MarginVertical';
import { useNavigation } from '@react-navigation/native';
import { useSignup } from '../hooks/useSignup';

const SettingNickname = () => {
  const [nickname, setNickname] = useState("");
  const navigation = useNavigation();
  const {handleNickname} = useSignup();
  const isValid = nickname.length > 0

  return (
    <SafeAreaView style={{backgroundColor:"#fff", width:Dimensions.get('screen').height}}>
      <Body>
        <Header>

        </Header>
        <View style={{width:324}}>
          <QuestionTitle>안녕하세요 방갑습니다!{"\n"}제가 어떻게 불러드릴까요?</QuestionTitle>
        </View>
        <MarginVertical margin={50}/>
        <Input placeholder={"닉네임을 입력해주세요"} value={nickname} onChange={(e) => setNickname(e.nativeEvent.text)}/>
        <BorderLine/>
        <MarginVertical margin={350}/>
        <Img/>
        <NextButton style={{backgroundColor:isValid? "#F7C7A7" : "#E8EAEA"}} onPress={() => {if(isValid){handleNickname(nickname)}}}>
          <NextButtonText>다음</NextButtonText>
        </NextButton>
      </Body>
    </SafeAreaView>
  )
}

export default SettingNickname

const Body = styled.View`
  width:${Dimensions.get('screen').width}px;
  height:${Dimensions.get("screen").height}px;
  display:flex;
  align-items:center;
`

const QuestionTitle = styled.Text`
  color: #000;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 34px; /* 141.667% */
`

const Header = styled.View`
  width:90%;
  height:40px;

`

const Input = styled.TextInput`
  width:324px;
  height:34px;
  color: #000;
  font-size: 18px;
  font-weight: 600;
  line-height: 34px;
  paddign:10px;
`

const BorderLine = styled.View`
  width:324px;
  height:2px;
  background: #686C80;
  margin-top:10px;
`

const Img = styled.Image`
  
`

const NextButton = styled.TouchableOpacity`
  width: 323px;
  height: 60px;
  border-radius:52px;
  background-color:#E8EAEA;
  display:flex;
  justify-content:center;
  align-items:center;
`

const NextButtonText = styled.Text`
  color: #FFF;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 34px; /* 170% */
`