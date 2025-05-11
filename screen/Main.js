import React from 'react'

import styled from 'styled-components/native'
import banner_img from '../assets/banner_img.png'
import { useNavigation } from '@react-navigation/native'
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MarginVertical from '../components/MarginVertical'
import main_icon_1 from '../assets/main_icon_1.png';
import character3 from '../assets/character4.png';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;


const Main = () => {
  const navigation = useNavigation();
  

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
     
      <MainBody>
        <ScrollView showsVerticalScrollIndicator={false}>
        <MainHeader>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>
        </MainHeader>
        <MainTitle>질문할수록 성장하는 카피바라</MainTitle>
        <MarginVertical margin={10}/>
        <MainContentsBody style={{height:280}}>
          <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
          <Image source={character3} style={{width:180, height:180, resizeMode:'contain'}}/>
          </View>
          {/* 이미지 */}
          <TouchableOpacity
            style={{flexDirection:'row',gap:3, justifyContent:'flex-end',alignItems:'center', position:'absolute',bottom:20,right:15}}
            onPress={() => navigation.navigate("Chat")}>
            <MainTitle>키우러 가기</MainTitle>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>
        </MainContentsBody>
        <MarginVertical margin={30}/>
        <MainTitle>오늘의 미션!</MainTitle>
        <MarginVertical margin={10}/>
        <MainContentsBody>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <CurrentQuest>
              <MainText>2/10</MainText>
            </CurrentQuest>
            <TouchableOpacity onPress={() => navigation.navigate("Mission")}>
              <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <MarginVertical margin={20}/>
         <MainText>
          {"하루 세번의 미션을 끝내고\n질문권을 추가로 획득하세요"}
         </MainText>
         <MarginVertical margin={30}/>
         <ProgressBarArea>
            <ProgressBarIcon/>
            <ProgressBarLine/>
            <ProgressBarIcon/>
            <ProgressBarLine/>
            <ProgressBarIcon/>
         </ProgressBarArea>
        </MainContentsBody>
        <MarginVertical margin={40}/>
        <MainTitle>연진님의 질문 횟수는?</MainTitle>
        <MarginVertical margin={10}/>
        <MainContentsBody>
          <View style={{flexDirection:'row', gap:20}}>
            <Image source={main_icon_1}/>
            <View style={{width:170, justifyContent:'center',alignItems:'center'}}>
              <MainText>이번달 질문 횟수 9번</MainText>
              <GotoChat onPress={() => navigation.navigate('Chat')}>
                <GotoChatText>결정하러 가기</GotoChatText>
                <AntDesign name="arrowright" size={24} color="black" />
              </GotoChat>
            </View>
          </View>
        </MainContentsBody>
        <MarginVertical margin={40}/>
        <MainTitle>다른 사람들과 더 고민해보기</MainTitle>
        <MarginVertical margin={10}/>
        <TouchableOpacity onPress={() => navigation.navigate("Comunity")}>
        <MainContentsBody>
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', gap:20}}>
          <View style={{borderRadius:'50%', backgroundColor:'#D9D9D9', width:50, height:50, justifyContent:'center',alignItems:'center'}}>
            <MainText>땡님</MainText>
          </View>
          <View style={{width:'60%', alignItems:'center'}}>
            <MainText>이번 여름휴가로</MainText>
            <MainTitle>바다 vs 계곡</MainTitle>
          </View>
          </View>
        </MainContentsBody>
        </TouchableOpacity>
        <MarginVertical margin={180}/>
        </ScrollView>
      </MainBody>
      
    </SafeAreaView>
  )
}

export default Main

const MainBody = styled.View`
  display:flex;
  width:${width}px;
  padding:0 25px;
  height:${height}px;
`

const MainHeader = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  width:100%;
  height:50px;
  align-items:center;
`

const MainTitle = styled.Text`
  color: #000;
  font-size: 24px;
  font-weight: 600;
`




const MainContentsBody = styled.View`
  width:100%;
  border-radius: 20px;
  background: #FFF;
  display:flex;
  justify-content:center;
  align-items:flex;
  text-align:center;
  border:2px solid rgba(0, 0, 0, 0.25);
  padding:20px 25px;
`


const MainText = styled.Text`
  color: #000;
  font-size: 20px;
  font-weight: 600;
`

const GotoChat = styled.TouchableOpacity`
  border-radius:45px;
  width:100%;
  height: 50px;
  border:none;
  background:#F7E48F;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:row;
`

const GotoChatText = styled.Text`
font-size:20px;
color:#000;
font-weight:700;
`

const CurrentQuest = styled.View`
  width:60px;
  height:30px;
  background-color:#77CBFF;
  border-radius:50px;
  justify-content:center;
  align-items:center;
  
`

const ProgressBarArea = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  width:100%;
`

const ProgressBarIcon = styled.View`
  border-radius:50%;
  width:18px;
  height:18px;
  background-color:#CED3DE;
  
`

const ProgressBarLine = styled.View`
  width:40%;
  height:3px;
  background-color:#CED3DE;
`



