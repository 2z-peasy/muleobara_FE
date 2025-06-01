import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Switch, SafeAreaView } from "react-native";
import styled, { css } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { size } from "../util";

export default function MyPage() {
  const navigation = useNavigation();

  // “알림설정” 토글 상태 관리
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const toggleAlarm = () => setIsAlarmEnabled((prev) => !prev);

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
    <Root>
      {/* 1. 헤더 (뒤로가기 + 타이틀 없이 화살표만) */}
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </BackButton>
      </Header>

      {/* 2. 상단 버튼들: MBTI 수정 / 상점 / 히든 포인트 */}
      <TopButtonsContainer>
        <TopButton>
          <TopButtonBox>
            {/* 사각형 빈 박스 */}
          </TopButtonBox>
          <TopLabel>MBTI 수정</TopLabel>
        </TopButton>
        <TopButton onPress={() => navigation.navigate('Store')}>
          <TopButtonBox>
            {/* 사각형 빈 박스 */}
          </TopButtonBox>
          <TopLabel>상점</TopLabel>
        </TopButton>
        <TopButton onPress={() => navigation.navigate('Achievements')}>
          <TopButtonBox>
            {/* 사각형 빈 박스 */}
          </TopButtonBox>
          <TopLabel>히든 포인트</TopLabel>
        </TopButton>
      </TopButtonsContainer>

      {/* 3. 구분선 */}
      <Divider />

      {/* 4. 어플 설정 영역 */}
      <View style={{width:'100%'}}>
      <Section>
        <SectionTitle>어플 설정</SectionTitle>

        <SettingRow>
          <LeftSide>
            <SettingLabel>알림설정</SettingLabel>
            <Switch
              value={isAlarmEnabled}
              onValueChange={toggleAlarm}
              trackColor={{ false: "#ccc", true: "#81b0ff" }}
              thumbColor={isAlarmEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </LeftSide>
          <ShareTextContainer onPress={() => { /* 공유 로직 */ }}>
            <ShareText>어플 공유하기</ShareText>
          </ShareTextContainer>
        </SettingRow>
      </Section>

      {/* 5. 계정 설정 영역 */}
      <Section>
        <SectionTitle>계정 설정</SectionTitle>

        <AccountRow onPress={() => { /* 로그아웃/탈퇴 처리 */ }}>
          <AccountText>로그아웃/탈퇴</AccountText>
        </AccountRow>

        <VersionRow>
          <AccountText>버전정보</AccountText>
          <VersionNumber>5.5.2</VersionNumber>
        </VersionRow>
      </Section>
      </View>

      {/* 6. 하단 파란 배경 프로필 영역 */}
      <BottomProfile>
        {/* 6-1. 하트 + 카운트 */}
        <HeartRow>
          <Ionicons name="heart" size={20} color="#4EA1F3" />
          <HeartCount> 0</HeartCount>
          <Ionicons name="heart" size={20} color="#CCCCCC" style={{ marginLeft: 20 }} />
          <HeartCount> 3</HeartCount>
        </HeartRow>

        {/* 6-2. 고양이 아바타 */}
        <AvatarContainer>
          <AvatarImage source={""} />
        </AvatarContainer>

        {/* 6-3. 닉네임 */}
        <NickName>고양이</NickName>

        {/* 6-4. 질문 색싹   |   MBTI */}
        <InfoRow>
          <InfoText>질문 색싹</InfoText>
          <InfoText>ENFP</InfoText>
        </InfoRow>
      </BottomProfile>
    </Root>
    </SafeAreaView>
  );
}

/* ───────────────────────────────────────────────────────────────────────────────────── 
   styled-components 정의 
───────────────────────────────────────────────────────────────────────────────────── */

// 최상위 컨테이너
const Root = styled.View`
  background-color: #ffffff;
  width:${size.width}px;
  height:${size.height}px;
  padding: 0 10px;
`;

/* ─── 1. 헤더 ───────────────────────────────────────────────────────────────────── */
const Header = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
`;
const BackButton = styled.TouchableOpacity`
  width: 32px;
  justify-content: center;
  align-items: center;
`;

/* ─── 2. 상단 버튼들: MBTI 수정 / 상점 / 히든 포인트 ───────────────────────────────── */
// 버튼들을 가로로 세 개, 동일한 너비로 배치
const TopButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 16px;
  margin-horizontal: 24px;
`;

// 개별 버튼: 세로 방향으로 아이콘 박스 + 레이블
const TopButton = styled.TouchableOpacity`
  width: 80px;
  align-items: center;
`;

/** 사각형 빈 박스 (반지름 8px, 테두리 #4EA1F3) */
const TopButtonBox = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  border: 1px solid #4ea1f3;
  background-color: #ffffff;
`;

/** 박스 아래 레이블 텍스트 */
const TopLabel = styled.Text`
  margin-top: 8px;
  font-size: 13px;
  color: #222222;
`;

/* ─── 3. 구분선(Divider) ─────────────────────────────────────────────────────────── */
const Divider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  margin-top: 24px;
  width:${size.width}px;
  
`;

/* ─── 4. 어플 설정 영역 ──────────────────────────────────────────────────────────── */
const Section = styled.View`
  margin-top: 24px;
  margin-horizontal: 16px;
`;

/** 섹션 제목 (예: “어플 설정”, “계정 설정”) */
const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #222222;
  margin-bottom: 12px;
`;

/** 설정 항목이 가로로 나란히 있는 Row */
const SettingRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

/** Row의 왼쪽 부분: “알림설정” + Switch */
const LeftSide = styled.View`
  flex-direction: row;
  align-items: center;
`;

/** 설정 레이블 텍스트 */
const SettingLabel = styled.Text`
  font-size: 14px;
  color: #222222;
  margin-right: 12px;
`;

/** 오른쪽 끝의 “어플 공유하기” 텍스트 (터치 가능) */
const ShareTextContainer = styled.TouchableOpacity``;
const ShareText = styled.Text`
  font-size: 14px;
  color: #4ea1f3;
`;

/* ─── 5. 계정 설정 영역 ─────────────────────────────────────────────────────────── */
const AccountRow = styled.TouchableOpacity`
  padding-vertical: 12px;
`;
const AccountText = styled.Text`
  font-size: 14px;
  color: #222222;
`;

/** 버전정보 Row: “버전정보” + “5.5.2” */
const VersionRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;
const VersionNumber = styled.Text`
  font-size: 14px;
  color: #999999;
  margin-left: 8px;
`;

/* ─── 6. 하단 파란 배경 프로필 영역 ─────────────────────────────────────────────── */
const BottomProfile = styled.View`
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  background-color: #C2EDFF;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 40px;
  height:300px;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
`;

/** 6-1. 하트 + 숫자 Row */
const HeartRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

/** 하트 옆 숫자 텍스트 */
const HeartCount = styled.Text`
  font-size: 14px;
  color: #222222;
`;

/** 6-2. 아바타 둥근 컨테이너(흰색) */
const AvatarContainer = styled.View`
  margin-top: 12px;
  width: 96px;
  height: 96px;
  border-radius: 48px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  /* 그림자 (iOS) */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  /* 그림자 (Android) */
  elevation: 3;
`;

/** 아바타 이미지(고양이) */
const AvatarImage = styled.Image`
  width: 84px;
  height: 84px;
  border-radius: 42px;
  resize-mode: cover;
`;

/** 6-3. 닉네임 텍스트 */
const NickName = styled.Text`
  margin-top: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #222222;
`;

/** 6-4. “질문 색싹”  |  “ENFP” Row */
const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;
const InfoText = styled.Text`
  font-size: 14px;
  color: #222222;
  margin-horizontal: 16px;
`;
