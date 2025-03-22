import React, { useState } from 'react'
import styled from 'styled-components/native';
import ChatContents from '../components/ChatContents';
import Choice from '../components/Choice';
import Header from '../components/Header';
import { Dimensions, SafeAreaView } from 'react-native';

const height = Dimensions.get('screen').height;

const Chat = () => {
  const [myChat, setMyChat] = useState("");
  const [isResponse, setIsResponse] = useState(false)
  const [choices, setChoices] = useState([]);
  const [setting, setSetting] = useState("");
  const [gptAnswer, setGptAnswer] = useState("");

  const [aiResponse, setAiResponse] = useState({});

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
    <ChatBody>
      <Header/>
      <ChatContents myChat={myChat} setMyChat={setMyChat} aiResponse={aiResponse} setAiResponse={setAiResponse} choices={choices} setChoices={setChoices} setting={setting} setSetting={setSetting} gptAnswer={gptAnswer}></ChatContents>
      <Choice myChat={myChat} setMyChat={setMyChat} aiResponse={aiResponse} setAiResponse={setAiResponse} isResponse={isResponse} setIsResponse={setIsResponse} choices={choices} setChoices={setChoices} setting={setting} setSetting={setSetting} setGptAnswer={setGptAnswer}/>
    </ChatBody>
    </SafeAreaView>
  )
}

export default Chat;

const ChatBody = styled.View`
  max-width:393px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  height:${height}
`






const ChatTitle = styled.Text`
  flex-grow:1;
  font-weight:800;
  font-size:20px;
`



