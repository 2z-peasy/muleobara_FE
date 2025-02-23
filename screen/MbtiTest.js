import React from 'react'
import { Dimensions, SafeAreaView, View } from 'react-native'
import { styled } from 'styled-components'
import AntDesign from '@expo/vector-icons/AntDesign';
import MarginVertical from '../components/MarginVertical';
import SlideBar from '../components/SlideBar';
import { useNavigation } from '@react-navigation/native';

const MbtiTest = () => {
  const mbtiText = ["내향적(I)", "직관적(N)", "감정적(F)", "인식적(P)"]
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <MbtiTestBody>
        <Header>
        <AntDesign name="arrowleft" size={24} color="black" style={{position:'absolute', left:0}} />
        <HeaderText>선호 경향</HeaderText>
        </Header>
        <BorderLine/>
        <MarginVertical margin={34}/>
        <Title>당신은 ISFP 군요!</Title>
        <Text>본인의 선호 경향  퍼센트는 어느 정도 인가요?</Text>
        <MarginVertical margin={30}/>
        <TestArea>
          {mbtiText.map((el, index )=> {
            return(
              <TestEl key={index}>
                <SlideBar text={el}/>
              </TestEl>
            )
          })}
         
        </TestArea>
      </MbtiTestBody>
      <View style={{width:"100%", justifyContent:'center', alignItems:'center', position:'absolute', bottom:150}}>
      <SubmitButton onPress={() => navigation.navigate("Main")}>
        <ButtonText>제출하기</ButtonText>
      </SubmitButton>
      </View>
      
    </SafeAreaView>
  )
}

export default MbtiTest

const MbtiTestBody = styled.View`
  width:${Dimensions.get('screen').width}px;
  padding:0 20px;
  display:flex;
  height:${Dimensions.get("screen").height}px;
`

const Header = styled.View`
  width:100%;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const HeaderText = styled.Text`
color: #000;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 34px; /* 170% */
`

const BorderLine = styled.View`
width: 394px;
height: 4px;
background: #CED3DE;
position:absolute;
top:50px;
`

const Title = styled.Text`
color: #000;
font-family: Pretendard;
font-size: 27px;
font-style: normal;
font-weight: 700;
line-height: 34px; /* 125.926% */
`

const Text = styled.Text`
color: #000;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 34px; /* 212.5% */
`

const TestArea = styled.View`
  display:flex;
`

const TestEl = styled.View`

`

const SubmitButton = styled.TouchableOpacity`
display: flex;
width: 235px;
height: 49px;
padding: 16px;
justify-content: center;
align-items: center;
gap: 8px;
flex-shrink: 0;
border-radius: 8px;
background: #CCB39D;
`

const ButtonText = styled.Text`
  color:#fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 91.667% */
  letter-spacing: -0.408px;
`

