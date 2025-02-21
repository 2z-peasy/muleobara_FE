import React from 'react';
import styled from 'styled-components/native';
import heart_icon from '../assets/heart_icon.png';
import empty_heart from '../assets/empty_heart.png';


const SpeechBubble = ({ text, isHeart, setIsHeart, noHeart, choices, setting, gptAnswer }) => {
  

  async function handleHeartClick() {
    try {
      await axios.post(
        "/hearts",
        {
          nickname: userId,
          setting: setting,
          choice: choices,
          gptAnswer: [gptAnswer],
        },
        {
          headers: {},
        }
      );
      setIsHeart((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SpeechBubbleContents>
      <SpeechBubbleText>
        {text}
      </SpeechBubbleText>
      
    </SpeechBubbleContents>
  );
};

export default SpeechBubble;

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
`

const HeartTouchable = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 15px;
`;

const HeartImage = styled.Image`
 
`;
