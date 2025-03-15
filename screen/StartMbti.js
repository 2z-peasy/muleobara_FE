import React, { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, View } from 'react-native'
import { styled } from 'styled-components'
import MarginVertical from '../components/MarginVertical'
import { useMbti } from '../hooks/useMbti'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'

const StartMbti = () => {
  const inputArray = [0, 0, 0, 0]
  const [mbti, setMbti] = useState({ first: "", second: "", third: "", fourth: "" });
  const [focusIndex, setFocusIndex] = useState(0); // 현재 포커스된 인덱스를 추적
  const stepText = ["first", "second", "third", "fourth"]
  const mbtiText = [["E", "I"], ["S", "N"], ["F", "T"], ["P", "J"]]
  const navigation = useNavigation();

  useEffect(() => {
    console.log(mbti)
  }, [mbti])

  const handleSelect = (index, value) => {
    setMbti(prevMbti => ({
      ...prevMbti,
      [stepText[index]]: value,
    }));

    // 값이 선택되면 다음 드롭다운으로 포커스를 이동
    if (index < 3) {
      setFocusIndex(index + 1);
    }
  }

  const handleFocus = (index) => {
    setFocusIndex(index); // 사용자가 클릭한 입력 필드에 포커스
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <Body>
        <MarginVertical margin={200} />
        <Title>당신의 mbti는 무엇인가요?</Title>
        <MarginVertical margin={10} />
        <Text>보다 나은 서비스 이용을 위해 작성해주세요</Text>
        <MarginVertical margin={100} />

        <InputBox>
          {inputArray.map((el, index) => (
            <View key={index}>
              <InputEl
                style={{ borderColor: focusIndex === index ? "#d4a373" : "#000" }} // 포커스 색상 변경
                onPress={() => handleFocus(index)} // 클릭 시 해당 필드로 포커스 이동
              >
                <InputText>
                  {mbti[stepText[index]]?.length <= 0 ? "-" : mbti[stepText[index]]}
                </InputText>
              </InputEl>
              <MarginVertical margin={10} />
              {/* 드롭다운은 포커스된 항목만 보이게 함 */}
              {focusIndex === index && (
                <DropDownBody>
                  {mbtiText[index].map((option, i) => (
                    <DropDownEl key={i} onPress={() => handleSelect(index, option)}>
                      <InputText>{option}</InputText>
                    </DropDownEl>
                  ))}
                </DropDownBody>
              )}
            </View>
          ))}
        </InputBox>
        
        <NextButton onPress={() => navigation.navigate('MbtiTest', {first:mbti.first, second:mbti.second, third:mbti.third, fourth:mbti.fourth})}>
          <AntDesign name="arrowright" size={24} color="black" />
        </NextButton>
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
  position: relative;  /* 추가: 드롭다운을 여기에 위치시킬 수 있도록 */
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
  position: absolute;  /* 추가: 드롭다운을 입력 필드 바로 아래에 위치시킴 */
  top: 100%;  /* InputEl 바로 아래에 위치하도록 설정 */
  width: 66px;
  height: 106px;
  border-radius: 8px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;  /* 드롭다운이 다른 요소 위에 나타나도록 설정 */
`

const DropDownEl = styled.TouchableOpacity`
  width:66px;
  height:53px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const NextButton = styled.TouchableOpacity`
  position:absolute;
  bottom:100px;
  right:40;
`