import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { Text } from 'react-native';

const Choice = ({ myChat, setMyChat, aiResponse, setAiResponse, isResponse, setIsResponse, choices, setChoices, setting, setSetting, setGptAnswer }) => {
  const [itemNum, setItemNum] = useState([]);
  const [choice1, setChoice1] = useState('');
  const [choice2, setChoice2] = useState('');
  const [choice3, setChoice3] = useState('');

  const itemAdd = () => {
    const newItem = `Item ${itemNum.length + 1}`;
    setItemNum([...itemNum, newItem]);
  };

  async function handleChatSubmit() {
    try {
      const response = await axios.post(
        `http://49.50.163.226:8080/recommends/request`,
        {
          userId: 2,
          setting: setting,
          choices: choices,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data;
      setAiResponse(data);
      setIsResponse(true);
    } catch (error) {
      console.log(error);
    }
  }

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
            <ItemContents
              value={choice1}
              onChangeText={(value) => handleChoiceChange(value, setChoice1)}
              onBlur={() => handleBlur(choice1)}
            />
            <VsText>VS</VsText>
            <ItemContents
              value={choice2}
              onChangeText={(value) => handleChoiceChange(value, setChoice2)}
              onBlur={() => handleBlur(choice2)}
            />
            {itemNum.map((item, index) => (
              <React.Fragment key={index}>
                <VsText>VS</VsText>
                <ItemContents
                  value={choice3}
                  onChangeText={(value) => handleChoiceChange(value, setChoice3)}
                  onBlur={() => handleBlur(choice3)}
                />
              </React.Fragment>
            ))}
            <ItemPlusButton onPress={itemAdd}>
              <VsText>+</VsText>
            </ItemPlusButton>
          </ItemChoiceBody>
          <OptionBody>
            <OptionInput
              placeholder="변수를 입력해주세요"
              value={setting}
              onChangeText={handleSettingChange}
            />
            <OptionButton onPress={handleChatSubmit}>
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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
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
  color: #fff;
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
