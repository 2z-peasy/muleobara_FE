import React from 'react'
import { Dimensions, SafeAreaView, View } from 'react-native'
import { styled } from 'styled-components'
import MarginVertical from '../components/MarginVertical'

const StartMbti = () => {
  return (
    <SafeAreaView style={{backgroundColor:"#fff"}}>
      <Body>
        
        <Title>당신의 mbti를 적어주세요</Title>
        <MarginVertical margin={10}/>
        <Text>서비스 이용을 위해 회원가입 해주세요</Text>
        <MarginVertical margin={40}/>

        <InputBox>
          <MbtiInput/>
          <View style={{flexDirection:'row', gap:20}}>
            <BorderLine/>
            <BorderLine/>
            <BorderLine/>
            <BorderLine/>
          </View>
        </InputBox>

        
      </Body>
    </SafeAreaView>
  )
}

export default StartMbti

const Body = styled.View`
  height:${Dimensions.get('screen').height}px;
  background-color:#fff;
  display:flex;
  justify-content:center;
  align-items:center;
`

const Title = styled.Text`
  color: #000;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  line-height: 34px;
`

const Text = styled.Text`
color: #000;
text-align: center;
font-size: 20px;
font-weight: 700;
line-height: 34px;
`

const InputBox = styled.View`
width:320px;
  height:90px;
  border-radius: 8px;
  background: #F7C7A7;  
  display:flex;
  justify-content:center;
  align-items:center;
`

const MbtiInput = styled.TextInput`
  height:50px;
  color: #000;
  font-size: 40px;
  font-weight: 700;
  width:230px;

`

const BorderLine = styled.View`
width: 46px;
height: 3px;
background: #FBE1CF;
`

