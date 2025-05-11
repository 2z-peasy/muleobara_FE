import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components/native'
import character from '../assets/character.png';
import SpeechBubble from './SpeechBubble';
import { Text, View, ViewBase } from 'react-native';

const ChatContents = ({myChat, setMyChat, aiResponse, setAiResponse, choices, setChoices, gptAnswer}) => {
  const [isHeart, setIsHeart] = useState(false);
  const [noHeart, setNoHeart] = useState(true);
  const [chatNum, setChatNum] = useState(0);
  // const aiChoice = JSON.stringify(aiResponse.data.choices);
  // const aiChoice = `${aiResponse.data.choice}`;
  // const choiceReason = `${aiResponse.data.reason}`;
  const totalResponse = ``;
  


  return (
    <ChatContentsBody>
      <BaraProfile>
        <BaraProfileContents>
          <BaraProfileImg source={require("../assets/character.png")}></BaraProfileImg>
        </BaraProfileContents>
        <Text style={{fontWeight:'700', fontSize:'16'}}>물어바라</Text>
      </BaraProfile>
      <View style={{position:'absolute', top:80, left:10}}>
      <SpeechBubble text={"안녕하세요 당신의 결정을 도울 물어바라입니다 만나서 반가워요!"} isHeart={isHeart} setIsHeart={setIsHeart} noHeart={noHeart} setNoHeart={setNoHeart} choices={choices} setChoices={setChoices}></SpeechBubble>
      <SpeechBubble text={"채팅창에는 현재 상황이나 상태와 관련된 변수를, 네모 빈칸에는 고민되는 항목을 입력해주세요!"} isHeart={isHeart} setIsHeart={setIsHeart} noHeart={noHeart} setNoHeart={setNoHeart} choices={choices} setChoices={setChoices}/>
      {totalResponse.length  === 0 ? 
      <></>:
      <>
        <SpeechBubble text={totalResponse} isHeart={isHeart} setIsHeart={setIsHeart} choices={choices} setChoices={setChoices} gptAnswer={gptAnswer}></SpeechBubble>
        <SpeechBubble text={"답변이 마음에 드시다면 하트를 눌러주세요"} isHeart={isHeart} setIsHeart={setIsHeart} noHeart={noHeart} setNoHeart={setNoHeart} choices={choices} setChoices={setChoices}></SpeechBubble>
        <View style={{marginBottom:"20"}}></View>
      </>
      
      }
      </View>
      
      
    </ChatContentsBody>
  )


}

export default ChatContents

const ChatContentsBody = styled.View`
  width:90%;
  
  height:600px;
  overflow:scroll;
  margin-bottom:-85px;
`

const BaraProfile = styled.View`
  display:flex;
  gap:10px;
  align-items:center;
  position:absolute;
  left:10;
  top:40;
  flex-direction:row;
  
`

const BaraProfileContents = styled.View`
  width:40px;
  height:40px;
  border-radius:50%;
  background-color:#F7C7A7;
  display:flex;
  justify-content:center;
  align-items:center;
  overflow:hidden;
`

const BaraProfileImg = styled.Image`
  position:relative;
  top:10px;
  width:90px;
  height:90px;
  right:2px;
`


const SpeechBubbleHeart = styled.View`

`

