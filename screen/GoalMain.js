import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import character from '../assets/character.png';
import { size } from '../util';

/**
 * ▶️ 커스텀 토글 스위치 컴포넌트
 *  - 토글 바 전체(배경)와, 내부 드래그되는 원(Thumb), 
 *    그리고 “ON” 텍스트를 포함해 좌우로 움직입니다.
 */
const ToggleSwitch = ({ isEnabled, onToggle }) => {
  return (
    <ToggleContainer onPress={onToggle} activeOpacity={0.8}>
      <ToggleBackground isEnabled={isEnabled}>
        {/* ON/OFF 라벨 (토글 오른쪽에 위치) */}
        {isEnabled && <ToggleLabel>ON</ToggleLabel>}
        <Thumb isEnabled={isEnabled} />
      </ToggleBackground>
    </ToggleContainer>
  );
};

export default function GoalMainScreen() {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(prev => !prev);

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
    <Root>
      {/* 1. 헤더 */}
      <Header>
        <BackTouchable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </BackTouchable>
        <HeaderTitle>물어바라</HeaderTitle>
      </Header>

      {/* 2. 말풍선 + 다람쥐 */}
      <SpeechArea>
        <Bubble>
          <BubbleText>
            내가 선택한 목표야{"\n"}
            버튼으로 한 번에 활성/비활성 할 수 있어!
          </BubbleText>
          <BubbleTail />
        </Bubble>
        <SquirrelImage source={character} />
      </SpeechArea>

      {/* 3. 카드 영역 */}
      <Card>
        {/* 3-1. 첫 번째 행: 타이틀 + 토글 */}
        <CardRow>
          <CardTitle>건강/식습관</CardTitle>
          <ToggleSwitch isEnabled={isEnabled} onToggle={toggleSwitch} />
        </CardRow>

        {/* 3-2. 비건 태그 (첫 번째 토픽 숏태그) */}
        <TagsRow>
          <TagText>비건</TagText>
        </TagsRow>

        {/* 3-3. 두 번째 섹션 제목 */}
        <SectionTitle>생활패턴/라이프 스타일</SectionTitle>

        {/* 3-4. 야행성 태그 */}
        <TagsRow>
          <TagText>야행성</TagText>
        </TagsRow>
      </Card>

      {/* 4. 수정하기 버튼 (그라데이션 배경) */}
      <View style={{width:size.width, display:'flex', justifyContent:'center', alignItems:'center', position:'absolute', bottom:200}}>
      <ButtonWrapper onPress={() => navigation.navigate('GoalSetting')}>
        
          <ButtonText>수정하기</ButtonText>
        
      </ButtonWrapper>
      </View>

      {/* 5. 하단 네비게이션 */}
      <BottomNav>
        <NavItem>
          {/* 체크박스 + 체크아이콘 오버레이 */}
          <View>
            <Ionicons name="square-outline" size={28} color="#222" />
            <CheckOverlay name="checkmark" size={18} color="#222" />
          </View>
        </NavItem>

        <NavItem>
          <Ionicons name="home-outline" size={28} color="#222" />
        </NavItem>

        <NavItem>
          <Ionicons name="person-outline" size={28} color="#222" />
        </NavItem>
      </BottomNav>
    </Root>
    </SafeAreaView>
  );
}

/* ────────────────────────────────────────────────────────────
   styled-components 정의
───────────────────────────────────────────────────────────── */

// 최상위 컨테이너
const Root = styled.View`
  background-color: #ffffff;
  width:${size.width}px;
  height:${size.height}px;
  display: flex;
  align-items: center;
`;

/* ─── 1. 헤더 ────────────────────────────────────────────── */
const Header = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;
const BackTouchable = styled.TouchableOpacity`
  width: 32px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 16px;
`;
const HeaderTitle = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #222222;
`;

/* ─── 2. 말풍선 + 다람쥐 ───────────────────────────────── */
const SpeechArea = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-horizontal: 16px;
  width:${size.width-60}px;
`;

/** 말풍선 박스 */
const Bubble = styled.View`
  max-width: 65%;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 12px 16px;
  position: relative; /* BubbleTail 절대 위치 계산용 */
`;

/** 말풍선 꼬리(삼각형) */
const BubbleTail = styled.View`
  position: absolute;
  right: -9px;
  top: 14px;
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  transform: rotate(45deg);
  border-top-width: 1px;
  border-right-width: 1px;
  border-color: #e0e0e0;
`;

/** 말풍선 텍스트 */
const BubbleText = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  font-weight: 500;
`;

/** 다람쥐 이미지 */
const SquirrelImage = styled.Image`
  width: 150px;
  height: 150px;
`;

/* ─── 3. 카드(Card) ───────────────────────────────────────── */
const Card = styled.View`
  border: 1px solid #7b3f3f; /* Figma에서 보이는 카드 테두리 색상과 동일 */
  border-radius: 16px;
  padding: 20px;
  elevation: 4; /* 안드로이드 쉐도우 */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  margin-top: -35px;
  width:${size.width-40}px;
`;

/** 카드 안 첫 번째 줄: 타이틀 + 스위치 */
const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

/** 카드 타이틀 텍스트 */
const CardTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #222222;
`;

/** 토글 스위치 래퍼(터치 가능 영역) */
const ToggleContainer = styled.TouchableOpacity`
  padding: 4px;
`;

/** 토글 배경 (ON/OFF 시 배경 색상 달라짐) */
const ToggleBackground = styled.View`
  width: 60px;
  height: 32px;
  border-radius: 20px;
  background-color: ${({ isEnabled }) => (isEnabled ? "#FFD0B0" : "#EEEEEE")};
  justify-content: center;
  /* ON 라벨이 있을 때 텍스트와 썸 위치를 고려해 padding-left 추가 */
  padding-left: ${({ isEnabled }) => (isEnabled ? "12px" : "4px")};
  position: relative;
`;

/** 토글 안의 원(Thumb) */
const Thumb = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: #ffffff;
  position: absolute;
  left: ${({ isEnabled }) => (isEnabled ? "32px" : "4px")};
  top: 4px;
`;

/** ON 라벨 텍스트 (토글 배경 안에) */
const ToggleLabel = styled.Text`
  position: absolute;
  right: 6px;
  top: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #555555;
`;

/** 카드 안 태그가 모여 있는 행 */
const TagsRow = styled.View`
  flex-direction: row;
  margin-top: 12px;
`;

/** 태그 텍스트 박스 */
const TagText = styled.Text`
  background-color: #ffd85c;
  padding-vertical: 4px;
  padding-horizontal: 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: #222222;
  margin-right: 8px;
`;

/** 두 번째 섹션 제목 (생활패턴/라이프 스타일) */
const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #222222;
  margin-top: 20px;
`;

/* ─── 4. 수정하기 버튼 ─────────────────────────────────────── */
const ButtonWrapper = styled.TouchableOpacity`
  border-radius: 24px;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  width:130px;
  height:50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F7E48F;
`;

/** 그라데이션 배경 */
const GradientBackground = styled(LinearGradient)`
  padding-vertical: 12px;
  align-items: center;
  border-radius: 24px;
`;

/** 버튼 텍스트 */
const ButtonText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: #25262B;
`;

/* ─── 5. 하단 네비게이션 ───────────────────────────────────── */
const BottomNav = styled.View`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-horizontal: 40px;
`;

/** 네비 아이템(터치 영역) */
const NavItem = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

/** 체크 아이콘을 사각형 중앙에 오버레이 할 때 위치 조정용 */
const CheckOverlay = styled(Ionicons)`
  position: absolute;
  top: 5px;
  left: 5px;
`;

