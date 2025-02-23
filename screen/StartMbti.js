import React, { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, View } from 'react-native'
import { styled } from 'styled-components'
import MarginVertical from '../components/MarginVertical'

const StartMbti = () => {
  const inputArray = [0,0,0,0]
  const [mbti,setMbti] = useState({first:"", second:"", third:"", fourth:""});
  const stepText = ["first", "second", "third", "fourth"]
  const mbtiText = [["E", "I"],["S","N"],["F","T"],["P","J"]]

  useEffect(() => {
    console.log(mbti)
  }, [mbti])
  
  return (
    <SafeAreaView style={{backgroundColor:"#fff"}}>
      <Body>
      <MarginVertical margin={200}/>
        <Title>당신의 mbti는 무엇인가요?</Title>
        <MarginVertical margin={10}/>
        <Text>보다 나은 서비스 이용을 위해 작성해주세요</Text>
        <MarginVertical margin={100}/>

        <InputBox>
        {inputArray.map((el,index) => {
          return(
          <View key={index}>
          <InputEl>
            <InputText>{mbti[stepText[index]]?.length <= 0 ? "-":mbti[stepText[index]]}</InputText>
          </InputEl>
          <MarginVertical margin={10}/>
          <DropDownBody>
            <DropDownEl onPress={() => setMbti({...mbtiText, [index]:mbtiText[index][0]})}>
              <InputText>{mbtiText[index][0]}</InputText>
            </DropDownEl>
            <DropDownEl onPress={() => setMbti({...mbtiText, [index]:mbtiText[index][1]})}>
              <InputText>{mbtiText[index][1]}</InputText>
            </DropDownEl>
          </DropDownBody>
          </View>
          )
        })}
          
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
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:row;
  gap:13px;
`

const InputEl = styled.TouchableOpacity`
  width:66px;
  height:80px;
  border-radius:8px;
  border:1px solid #000;
  display:flex;
  justify-content:center;
  align-items:center;
`

const InputText = styled.Text`
  color: #000;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 34px;
`

const BorderLine = styled.View`
width: 46px;
height: 3px;
background: #FBE1CF;
`

const DropDownBody = styled.View`
  width:66px;
  height:106px;
  border-radius: 8px;
  border: 1px solid #000;
  display:flex;
  justify-content:center;
  align-itmes:center;
`

const DropDownEl = styled.TouchableOpacity`
  width:66px;
  height:53px;
  display:flex;
  justify-content:center;
  align-itmes:center;
`
