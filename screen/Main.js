import React from 'react'

import styled from 'styled-components/native'
import banner_img from '../assets/banner_img.png'
import { useNavigation } from '@react-navigation/native'
import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Main = () => {
  const navigation = useNavigation();
  

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
      <MainBody>
        <BannerBody>
          <BannerImg source={require('../assets/banner_img.png')}/>
        </BannerBody>
        <MainContentsBody>
          <MainTitle>당신의 결정,{"\n"} 
          <Text style={{display:'flex', justifyContent:'center'}}><Text style={{color:"rgba(204, 179, 157, 1)"}}>물어바라</Text> 가 도와줄게요</Text>
          </MainTitle>
          <MainText>?_?</MainText>
          <GotoChat onPress={() => navigation.navigate('Chat')}>
            <GotoChatText>결정하러 가기</GotoChatText>
          </GotoChat>
        </MainContentsBody>
      </MainBody>
    </SafeAreaView>
  )
}

export default Main

const MainBody = styled.View`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  color:#4c4c4c;
  max-width:393px;
  overflow:hidden;
`

const BannerBody = styled.View`
  width:450px;
  height:230px;
  background:rgba(247, 228, 143, 1);
  margin-top:20px;
  border-radius:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  overflow:hidden;
  text-align:center;
  
`

const BannerImg = styled.Image`
  width:${width};
  height:${height/3};
  position:absolute;
  bottom:-70;
`

const MainContentsBody = styled.View`
  width:393px;
  height:750px;
  border-radius: 77px;
  border: 1px solid #745353;
  background: #FFF;
  margin-top:50px;
  display:flex;
  justify-content:center;
  align-items:center;
  text-align:center;
  gap:30px;

`

const MainTitle = styled.Text`
  margin-top:-350px;
  font-size:30px;
  font-weight:800;

`

const MainText = styled.Text`
  color:grey;
`

const GotoChat = styled.TouchableOpacity`
  border-radius:50px;
  width:300px;
  height: 60px;
  border:none;
  background:#CCB39D;
  display:flex;
  justify-content:center;
  align-items:center;
`

const GotoChatText = styled.Text`
font-size:20px;
color:#fff;
font-weight:700;
`

