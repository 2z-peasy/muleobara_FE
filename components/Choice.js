import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { ScrollView, Text } from 'react-native';
import { useChat } from '../hooks/useChat';

const Choice = ({ myChat, setMyChat, aiResponse, setAiResponse, isResponse, setIsResponse, choices, setChoices, setting, setSetting, setGptAnswer }) => {
  const [itemNum, setItemNum] = useState([]);
  const [choiceList, setChoiceList] = useState([])
  const {handleChatSubmit} = useChat();
  const [choice1, setChoice1] = useState("")
  const [choice2, setChoice2] = useState("")
  const [choice3, setChoice3] = useState("")
  const [choice4, setChoice4] = useState("")

  const itemAdd = () => {
    const newItem = `Item ${itemNum.length + 1}`;
    setItemNum([...itemNum, newItem]);
  };

  

  const handleChoiceChange = (value, setChoice) => {
    setChoice(value);
  };

  const handleBlur = (choice) => {
    setChoices((prev) => [...prev, choice]);
  };

  const handleSettingChange = (value) => {
    setSetting(value);
  };

  return (
    <Container>
      {isResponse ? (
        <ButtonContainer>
          <RetryButton onPress={() => console.log('Retry')}>다른 답변보기</RetryButton>
          <NewChoiceButton onPress={() => console.log('New Choice')}>새로운 선택</NewChoiceButton>
        </ButtonContainer>
      ) : (
        <ChoiceBody>
          <ItemChoiceBody>
            <ScrollView horizontal={true} style={{display:'flex'}} showsHorizontalScrollIndicator={false}>
            <ItemContents
              value={choice1}
              onChangeText={(value) => setChoice1(value)}
              onBlur={() => {}}
              horizontal={true}
            />
            <VsText>VS</VsText>
            <ItemContents
              value={choice2}
              onChangeText={(value) => setChoice2(value)}
              onBlur={() => {}}
            />
            {itemNum.map((item, index) => (
              <React.Fragment key={index}>
                <VsText>VS</VsText>
                <ItemContents
                  value={choice3}
                  onChangeText={(value) => setChoice3(value)}
                  onBlur={() =>{}}
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
            <OptionButton onPress={() => {handleChatSubmit(setting,[choice1, choice2, choice3 ? choice3 : null] )}}>
              <OptionButtonText>→</OptionButtonText>
            </OptionButton>
          </OptionBody>
        </ChoiceBody>
      )}
    </Container>
  );
};

export default Choice;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const ChoiceBody = styled.View`
  width: 100%;
  align-items: center;
`;

const ItemChoiceBody = styled.View`
  flex-direction:row;
  margin-bottom: 20px;
  display:flex;
  width:100%;
  justif-content:center;
  align-items:center;
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

const NewChoiceButton = styled.TouchableOpacity`
  background-color: #fbe1cf;
  border-radius: 15px;
  padding: 10px;
  width: 150px;
  align-items: center;
`;
