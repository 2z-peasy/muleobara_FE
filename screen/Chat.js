import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, SafeAreaView, ScrollView, Text, View, Image } from 'react-native';
import Header from '../components/Header';
import { useChat } from '../hooks/useChat';
import character from '../assets/character.png';
import { useFocusEffect } from '@react-navigation/native';
import MarginVertical from '../components/MarginVertical';

const height = Dimensions.get('screen').height;

const Chat = () => {
  const [myChat, setMyChat] = useState("");
  const [isResponse, setIsResponse] = useState(false);
  const [setting, setSetting] = useState("");
  const [gptAnswer, setGptAnswer] = useState({});
  const [itemNum, setItemNum] = useState([]);
  const [choices, setChoices] = useState(["", ""]);
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const {handleChatSubmit} = useChat();
  const [step, setStep] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [showChoice, setShowChoice] = useState(true);
  
  const aiChatArr = ["안녕하세요 저는 물어바라 입니다.\n결정중인 항목을 빈칸에 써주시면 제가 결정해 드릴게요!",
    "채팅창에는 현재 상황이나 상태를 간단하게 적어주시고\n네모 빈칸에 고민되는 항목을 넣어주세요",
    "ex) 지금 비와 => 비 오는 상황에 맞춰서 추천\n나는 더워=> 더운 사용자에 맞춰서 추천", gptAnswer?.reason,"답변이 마음에 드신다면 좋아요를 눌러주세요",
    "감사합니다! 더 좋은 선택을위해 힘내겠습니다.\n다른 선택사항이 있다면 질문을  계속 입력해주세요! "]

  const itemAdd = () => {
    setChoices(prev => [...prev, ""]);
  };

  const handleSettingChange = (value) => {
    setSetting(value);
  };

  const handleChoiceChange = (index, value) => {
    setChoices(prev => {
      const newChoices = [...prev];
      newChoices[index] = value;
      return newChoices;
    });
  };

  const handleSubmitButton = () => {
    setShowChoice(false);
    handleChatSubmit(setting, choices.filter(choice => choice !== ""), setGptAnswer, setStep);
  }

  useEffect(() => {
    console.log("reason",gptAnswer.reason)
  }, [gptAnswer])

  const handleStep = () => {
    const interval = setInterval(() => {
      setStep((prevStep) => {
        if (prevStep < 2 || prevStep >= 3) {
          return prevStep + 1;
        }

        clearInterval(interval);
        return prevStep;
      });
    },  800);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    
    if (isNew) {
      
      handleStep();
    }
  }, [isNew])

  useFocusEffect(
    useCallback(() => {
      setStep(0);
      handleStep();
    }, [])
  );

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ChatBody>
        <Header/>
        
        {/* ChatContents 부분 */}
        <ChatContentsBody>
          <ScrollView 
            showsVerticalScrollIndicator={false}
          >
            <BaraProfile>
              <BaraProfileContents>
                <BaraProfileImg source={require("../assets/character.png")}></BaraProfileImg>
              </BaraProfileContents>
              <Text style={{fontWeight: '700', fontSize: '16'}}>물어바라</Text>
            </BaraProfile>
            
            <View style={{marginTop: 80, marginLeft: 10}}>
              {aiChatArr.map((el, index) => {
                if (index <= step) {
                  return (
                    <View key={index}>
                      {index === 3 ?
                    <View style={{width: '100%', alignItems: 'flex-end'}}>
                      <BaraProfile style={{position: 'static'}}>
                        <BaraProfileContents>
                          <BaraProfileImg source={require("../assets/character.png")}></BaraProfileImg>
                        </BaraProfileContents>
                      </BaraProfile>
                      <MarginVertical margin={10}/>
                    <SpeechBubbleContents style={{}}>
                      <SpeechBubbleText>{`${setting}\n${choices.map((choice, index) => `${choice} `).join("")}`}</SpeechBubbleText>
                    </SpeechBubbleContents>
                    </View>:<></>}
                    <SpeechBubbleContents >
                      <SpeechBubbleText>{el}</SpeechBubbleText>
                    </SpeechBubbleContents>
                    </View>

                  )
                }
                return null;
              })}
            </View> 
            <MarginVertical margin={30}/>
          </ScrollView>
        </ChatContentsBody>

        {/* Choice 부분 */}
        <Container>
          {gptAnswer.reason && !showChoice ? (
            <ButtonContainer>
              <RetryButton onPress={() => {
                setShowChoice(true);
                setStep(2);
              }}>
                <RetryButtonText>다른 답변보기</RetryButtonText>
              </RetryButton>
              <NewChoiceButton onPress={() => {
                setStep(0);
                setGptAnswer({}); 
                setSetting(""); 
                setChoices(["", ""]);
                setIsNew(true);
                setShowChoice(true);
              }}>
                <RetryButtonText>새로운 선택</RetryButtonText>
              </NewChoiceButton>
            </ButtonContainer>
          ) : (
            <ChoiceBody>
              <ItemChoiceBody>
                <ScrollView horizontal={true} style={{display: 'flex'}} showsHorizontalScrollIndicator={false}>
                  {choices.map((choice, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <VsText>VS</VsText>}
                      <ItemContents
                        value={choice}
                        onChangeText={(value) => handleChoiceChange(index, value)}
                        onBlur={() => {}}
                        horizontal={true}
                      />
                    </React.Fragment>
                  ))}
                  <ItemPlusButton onPress={itemAdd}>
                    <VsText>+</VsText>
                  </ItemPlusButton>
                </ScrollView>
              </ItemChoiceBody>
              <OptionBody>
                <OptionInput
                  placeholder="변수를 입력해주세요"
                  value={setting}
                  onChangeText={handleSettingChange}
                />
                <OptionButton onPress={handleSubmitButton}>
                  <OptionButtonText>→</OptionButtonText>
                </OptionButton>
              </OptionBody>
            </ChoiceBody>
          )}
        </Container>
      </ChatBody>
    </SafeAreaView>
  );
};

export default Chat;

const ChatBody = styled.View`
  max-width: 393px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${height}px;
`;

const ChatContentsBody = styled.View`
  width: 90%;
  height: 75%;
  position: relative;
  margin-bottom: -80px;

`;

const BaraProfile = styled.View`
  display: flex;
  gap: 10px;
  align-items: center;
  position: absolute;
  left: 10px;
  top: 40px;
  flex-direction: row;
`;

const BaraProfileContents = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #F7C7A7;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const BaraProfileImg = styled.Image`
  position: relative;
  top: 10px;
  width: 90px;
  height: 90px;
  right: 2px;
`;

const SpeechBubbleContents = styled.View`
  width: 240px;
  background-color: rgba(247, 228, 143, 0.7);
  border-radius: 15px;
  margin-left: 40px;
  padding: 10px 20px;
  margin-bottom: 15px;
  box-sizing: border-box;
  position: relative;
`;

const SpeechBubbleText = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: 600;
  text-align: left;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const ChoiceBody = styled.View`
  width: 100%;
  align-items: center;
  margin-top:-20px;
`;

const ItemChoiceBody = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  justify-content: center;
  padding-left:30px; 
  align-items: center;
`;

const ItemContents = styled.TextInput`
  border-radius: 15px;
  width: 110px;
  height: 50px;
  padding: 15px;
  background-color: #fbe1cf;
  font-weight: 800;
  font-size: 16px;
  color: #5a5a5a;
  margin: 5px;
`;

const VsText = styled.Text`
  font-weight: 800;
  color: grey;
  margin: 0 10px;
`;

const ItemPlusButton = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: #ccb39d;
  margin: 5px;
`;

const OptionBody = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px;
`;

const OptionInput = styled.TextInput`
  border-radius: 15px;
  width: 280px;
  height: 50px;
  padding: 10px;
  background-color: #f4f4f4;
  font-weight: 700;
  margin-right: 10px;
`;

const OptionButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background-color: #ccb39d;
`;

const OptionButtonText = styled.Text`
  color: white;
  font-size: 24px;
`;

const ButtonContainer = styled.View`
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 90px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: #fbe1cf;
  border-radius: 15px;
  padding: 10px;
  width: 150px;
  align-items: center;
  margin-bottom: 15px;
`;

const RetryButtonText = styled.Text`
  color: #5a5a5a;
  font-weight: 700;
  font-size:16px;
`;

const NewChoiceButton = styled.TouchableOpacity`
  background-color: #fbe1cf;
  border-radius: 15px;
  padding: 10px;
  width: 150px;
  align-items: center;
`;



