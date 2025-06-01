import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import character from '../assets/character.png';
import { size } from "../util";


/**
 * ▶️ 태그 컴포넌트
 *    - selected: 태그가 선택되었는지 여부
 *    - onPress: 태그를 눌렀을 때 토글하는 함수
 */
const Tag = ({ label, selected, onPress }) => {
  return (
    <TagContainer onPress={onPress} activeOpacity={0.7} selected={selected}>
      <TagText selected={selected}>{label}</TagText>
    </TagContainer>
  );
};

export default function GoalSettingScreen() {
  const navigation = useNavigation();

  // 3개 카테고리별 태그 데이터
  const categories = [
    {
      title: "건강/식습관",
      tags: [
        "비건",
        "페스코",
        "저당식이",
        "고단백식이",
        "다이어트",
        "체중유지",
      ],
    },
    {
      title: "생활패턴/라이프 스타일",
      tags: ["야행성", "아침형인간", "여행 지향", "주말 활동형"],
    },
    {
      title: "환경 보호",
      tags: ["지속 가능성", "저탄소 생활", "제로 웨이스트", "친환경 제품"],
    },
  ];

  // 선택된 태그를 저장하는 상태 (Set을 이용해서 중복 방지)
  const [selectedTags, setSelectedTags] = useState(new Set(["비건", "야행성"]));
  // 초기값으로 “비건”과 “야행성”을 선택해두었습니다. 필요 없으면 빈 Set([])으로 설정하세요.

  /**
   * @param {string} tagName
   * 태그를 눌렀을 때 selectedTags Set에 있으면 제거, 없으면 추가합니다.
   */
  const toggleTag = (tagName) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tagName)) {
        next.delete(tagName);
      } else {
        next.add(tagName);
      }
      return next;
    });
  };

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
    <Container>
      {/* 1. 헤더 */}
      <Header>
        <BackTouch onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </BackTouch>
        <HeaderTitle>물어바라</HeaderTitle>
      </Header>

      {/* 2. 말풍선 + 다람쥐 이미지 */}
      <SpeechArea>
        <BubbleWrapper>
          <Bubble>
            <BubbleText>
              나만의 목표를 선택해봐!{"\n"}
              여러 개를 선택할 수 있어 마음껏 골라봐
            </BubbleText>
            <BubbleTail />
          </Bubble>
        </BubbleWrapper>
        <Squirrel source={character} />
      </SpeechArea>

      {/* 3. 스크롤 가능 영역 */}
      <ScrollArea contentContainerStyle={{ paddingBottom: 120 }}>
        {/* 3-1. 각 카테고리별 카드 */}
        {categories.map((cat, idx) => (
          <Card key={idx}>
            <CategoryTitle>{cat.title}</CategoryTitle>
            <TagsRow>
              {cat.tags.map((tagLabel) => (
                <Tag
                  key={tagLabel}
                  label={tagLabel}
                  selected={selectedTags.has(tagLabel)}
                  onPress={() => toggleTag(tagLabel)}
                />
              ))}
            </TagsRow>
          </Card>
        ))}

        {/* 4. 저장하기 버튼 */}
        <View style={{width:size.width, display:'flex', justifyContent:'center', alignItems:'center', position:'absolute', bottom:50}}>
        <ButtonWrapper activeOpacity={0.8}>
          
            <ButtonText>저장하기</ButtonText>
        </ButtonWrapper>
        </View>
      </ScrollArea>

      {/* 5. 하단 네비게이션 */}
      <BottomNav>
        <NavItem>
          <View>
            <Ionicons name="square-outline" size={28} color="#222" />
            <CheckIcon name="checkmark" size={18} color="#222" />
          </View>
        </NavItem>
        <NavItem>
          <Ionicons name="home-outline" size={28} color="#222" />
        </NavItem>
        <NavItem>
          <Ionicons name="person-outline" size={28} color="#222" />
        </NavItem>
      </BottomNav>
    </Container>
    </SafeAreaView>
  );
}

/* ───────────────────────────────────────────────────────────
   styled-components 정의
───────────────────────────────────────────────────────────── */

/** 최상위 컨테이너 */
const Container = styled.View`
  background-color: #ffffff;
  width:${size.width}px;
  height:${size.height}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/* ─── 1. 헤더 ───────────────────────────────────────────── */
const Header = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;
const BackTouch = styled.TouchableOpacity`
  width: 32px;
  justify-content: center;
  align-items: center;
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
  justify-content: flex-start;
  align-items: center;
  width:${size.width-80}px;
  align-items: center;
  margin-bottom: -20px;
`;

/** 말풍선을 감싸는 래퍼 (절대 위치 등 보정) */
const BubbleWrapper = styled.View`
  max-width: 75%;
`;

/** 말풍선 박스(흰 배경, 테두리) */
const Bubble = styled.View`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 12px 16px;
  position: relative; /* BubbleTail 절대 위치 계산용 */
`;

/** 말풍선 꼬리(삼각형) */
const BubbleTail = styled.View`
  position: absolute;
  right: -8px;
  top: 14px;
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  transform: rotate(45deg);
  border-left-width: 1px;
  border-bottom-width: 1px;
  border-color: #ddd;
`;

/** 말풍선 내부 텍스트 */
const BubbleText = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  font-weight: 500;
`;

/** 다람쥐 이미지 */
const Squirrel = styled.Image`
  width: 150px;
  height: 150px;
  margin-left: -20px;
`;

/* ─── 3. 스크롤 영역 ──────────────────────────────────── */
/** ScrollView뿐 아니라 contentContainerStyle로 패딩 줘서 하단 네비 가리지 않게 함 */
const ScrollArea = styled.ScrollView`
  flex: 1;
`;

/** 각 카테고리별 카드 */
const Card = styled.View`
  background-color: #ffffff;
  border: 1px solid #7b3f3f;   /* 진한 갈색 테두리 */
  border-radius: 16px;
  margin-top: 24px;
  margin-horizontal: 16px;
  padding: 16px;
  /* 그림자 (iOS) */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  /* 그림자 (Android) */
  elevation: 3;
`;

/** 카드 안의 카테고리 제목 */
const CategoryTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #222222;
  margin-bottom: 12px;
`;

/** 태그들을 가로/세로로 래핑 가능하도록Flex 설정 */
const TagsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px; /* React Native 0.71+ 에서 지원됨 */
`;

/**
 * TagContainer: 실제 태그를 눌렀을 때 토글 이벤트가 발생하도록 TouchableOpacity로 감쌈
 * selected prop에 따라 배경색/테두리색을 다르게 설정
 */
const TagContainer = styled.TouchableOpacity`
  padding-vertical: 6px;
  padding-horizontal: 12px;
  border-radius: 20px;

  ${({ selected }) =>
    selected
      ? `
          background-color: #ffd85c;      /* 선택된 경우 옐로우 배경 */
          border: 1px solid #7b3f3f;       /* 태그 외곽 진한 갈색 */
        `
      : `
          background-color: #ffffff;      /* 선택되지 않음: 흰 배경 */
          border: 1px solid #7b3f3f;       /* 진한 갈색 테두리 */
        `}
`;

/** Tag 텍스트 스타일 */
const TagText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${({ selected }) => (selected ? "#222222" : "#222222")};
  text-align: center;
`;

/* ─── 4. 저장하기 버튼 ───────────────────────────────────── */
/** 버튼 래퍼: 터치 시 그림자 효과, 모서리 둥글게 */
const ButtonWrapper = styled.TouchableOpacity`
  margin-top: 32px;
  margin-horizontal: 60px;
  border-radius: 24px;
  overflow: hidden;
  width:130px;
  height:50px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 안드로이드 그림자 */
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  background-color: #FBE1CF;
`;

/** 그라데이션 배경: 위에서 아래로 부드럽게 색상 전환 */


/** 버튼 텍스트 */
const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #222222;
`;

/* ─── 5. 하단 네비게이션 ───────────────────────────────── */
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

/** 네비 아이템(터치 가능) */
const NavItem = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

/** 체크 아이콘을 사각형 중앙에 오버레이 */
const CheckIcon = styled(Ionicons)`
  position: absolute;
  top: 5px;
  left: 5px;
`;

