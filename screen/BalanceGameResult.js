import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Dimensions, Modal, TextInput, Alert } from 'react-native';
import styled from 'styled-components/native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #3f51b5;
  align-items: center;
  padding-top: 40px;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Oval = styled(View)`
  width: ${SCREEN_WIDTH * 0.9}px;
  height: ${SCREEN_WIDTH * 1.5}px;
  background-color: #fff9c4;
  border-radius: ${SCREEN_WIDTH * 0.9 / 2}px;
  align-items: center;
  justify-content: center;
`;

const Card = styled(View)`
  width: ${SCREEN_WIDTH * 0.5}px;
  height: ${SCREEN_WIDTH * 0.7}px;
  background-color: #fff;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ChoiceBadge = styled(View)`
  position: absolute;
  top: -16px;
  background-color: #ffecb3;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: #3f51b5;
`;

const CardText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 0 16px;
`;

const ResultText = styled(Text)`
  margin-top: 24px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const Subtitle = styled(Text)`
  margin-top: 8px;
  font-size: 14px;
  color: #000;
  text-align: center;
  padding: 0 24px;
`;

const ShareButton = styled(TouchableOpacity)`
  margin-top: 32px;
  background-color: #fff;
  padding: 12px 32px;
  border-radius: 24px;
`;

const ShareButtonText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #3f51b5;
`;

const Overlay = styled(View)`
  flex: 1;
  background-color: rgba(0,0,0,0.5);
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled(View)`
  width: 300px;
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  align-items: center;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const ModalTitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

const LinkInput = styled(TextInput)`
  width: 100%;
  background-color: #eee;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const CopyButton = styled(TouchableOpacity)`
  background-color: #ffecb3;
  padding: 8px 16px;
  border-radius: 8px;
`;

const CopyButtonText = styled(Text)`
  font-size: 14px;
  font-weight: bold;
`;

export default function BalanceGameResult() {
  const [modalVisible, setModalVisible] = useState(false);

  // 예시 데이터
  const selected = 'B';
  const percent = 78.7; // 실제값으로 변경
  const shareLink = 'https://example.com/balance-game?id=12345';

  const handleCopy = async () => {
    await Clipboard.setStringAsync(shareLink);
    setModalVisible(false);
    Alert.alert('링크가 복사 되었습니다');
  };

  return (
    <Container>
      <Oval>
        <Card>
          <ChoiceBadge>
            <BadgeText>{selected}</BadgeText>
          </ChoiceBadge>
          <CardText>평생 소고기 먹기</CardText>
        </Card>
        <ResultText>{percent.toFixed(1)}% 로 {selected}가 선택 되었습니다!</ResultText>
        <Subtitle>여러분은 어떤 선택을 하셨나요?{"\n"}친구들과 공유해보세요</Subtitle>
      </Oval>

      <ShareButton onPress={() => setModalVisible(true)}>
        <ShareButtonText>공유하기</ShareButtonText>
      </ShareButton>

      {modalVisible && (
        <Modal transparent visible={modalVisible} animationType="fade">
          <Overlay>
            <ModalContainer>
              <CloseButton onPress={() => setModalVisible(false)}>
                <Text style={{fontSize:18}}>✕</Text>
              </CloseButton>
              <ModalTitle>친구들은 어떤 선택을 할지 물어보세요!{"\n"}링크를 복사해주세요</ModalTitle>
              <LinkInput value={shareLink} editable={false} />
              <CopyButton onPress={handleCopy}>
                <CopyButtonText>복사</CopyButtonText>
              </CopyButton>
            </ModalContainer>
          </Overlay>
        </Modal>
      )}
    </Container>
  );
}
