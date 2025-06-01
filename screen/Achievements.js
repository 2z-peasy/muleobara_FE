import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import styled, { css } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { size } from "../util";
import MarginVertical from "../components/MarginVertical";

export default function AchievementsScreen() {
  const navigation = useNavigation();

  // “내가 클리어한 업적들”의 개수를 표시하기 위한 상태 (예시: 4개)
  const [achievedCount] = useState(4);

  // 3행 × 4열 그리드 배치. 각 칸이 업적(성공)인지 아닌지 여부를 저장
  // 키 형태: "row-col" (예: "0-3"은 1행 4번째 열)
  const ACHIEVED_POSITIONS = new Set(["0-3", "1-0", "1-3", "2-1"]);

  // 팝업(Modal) 제어 상태
  const [modalVisible, setModalVisible] = useState(false);

  // 클릭한 업적 위치를 저장 (예: "1-0" 식으로), 팝업 내용에 사용할 수 있음
  const [selectedPos, setSelectedPos] = useState(null);

  /**
   * @param {string} posKey  // "row-col" 형태
   * 노란색 업적 칸을 누르면 실행됩니다. 팝업을 열고 선택된 칸을 저장합니다.
   */
  const onAchievementPress = (posKey) => {
    setSelectedPos(posKey);
    setModalVisible(true);
  };

  /**
   * 팝업 닫기
   */
  const closeModal = () => {
    setModalVisible(false);
    setSelectedPos(null);
  };

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
    <Root>
      {/* ──────────────────────────────────────────────────────────────
         1. 헤더 (뒤로가기 아이콘 + 제목)
      ────────────────────────────────────────────────────────────── */}
      <Header>
        <BackTouchable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </BackTouchable>
        <HeaderTitle>업적</HeaderTitle>
      </Header>

      {/* ──────────────────────────────────────────────────────────────
         2. 내가 클리어한 업적들 박스
      ────────────────────────────────────────────────────────────── */}
      <CountBox>
        <CountText>내가 클리어한 업적들</CountText>
        <CountNumber>{achievedCount}개</CountNumber>
      </CountBox>

      <View style={{width:size.width, height:20, backgroundColor:'#F0F0F0',}}></View>
      <MarginVertical margin={60}/>

      {/* ──────────────────────────────────────────────────────────────
         3. 업적 그리드 (히든 포인트(업적))
      ────────────────────────────────────────────────────────────── */}
      <Card>
        <MarginVertical margin={10}/>
        <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
          <CardTitle>히든 포인트(업적)</CardTitle>
        </View>
        <MarginVertical margin={20}/>

        {/* 3×4 그리드 */}
        <Grid>
          {/*
            행(row)은 0~2, 열(col)은 0~3 순회
            posKey = `${row}-${col}`
          */}
          {Array.from({ length: 3 }).map((_, row) => (
            <Row key={`row-${row}`}>
              {Array.from({ length: 4 }).map((_, col) => {
                const posKey = `${row}-${col}`;
                const isAchieved = ACHIEVED_POSITIONS.has(posKey);

                return isAchieved ? (
                  // 노란색 업적 칸 (Touchable)
                  <YellowCell
                    key={posKey}
                    activeOpacity={0.7}
                    onPress={() => onAchievementPress(posKey)}
                  >
                    <YellowText>성공{">"}</YellowText>
                  </YellowCell>
                ) : (
                  // 파란색 히든 칸 (성공 여부 미확인)
                  <BlueCell key={posKey}>
                    <BlueText>?</BlueText>
                  </BlueCell>
                );
              })}
            </Row>
          ))}
        </Grid>
      </Card>

      {/* ──────────────────────────────────────────────────────────────
         4. 업적 클릭 시 뜨는 노란색 팝업 (Modal)
      ────────────────────────────────────────────────────────────── */}
      <Modal transparent visible={modalVisible} animationType="fade">
        {/* 바깥 영역을 터치하면 팝업 닫기 */}
        <TouchableWithoutFeedback onPress={closeModal}>
          <ModalOverlay />
        </TouchableWithoutFeedback>

        <ModalCentered>
          <ModalBox>
            {/* 팝업 내용 */}
            <ModalTitle>업적 달성!</ModalTitle>
            <ModalDesc>
              {selectedPos
                ? `위치 ${selectedPos} 업적을 확인하였습니다.`
                : "업적을 선택했습니다."}
            </ModalDesc>
            <CloseButton onPress={closeModal} activeOpacity={0.7}>
              <CloseButtonText>닫기</CloseButtonText>
            </CloseButton>
          </ModalBox>
        </ModalCentered>
      </Modal>
    </Root>
    </SafeAreaView>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   styled-components 정의
───────────────────────────────────────────────────────────────────────────── */

/** 최상위 컨테이너 */
const Root = styled.View`
  background-color: #ffffff;
  width:${size.width}px;
  height:${size.height}px;
  display: flex;
  flex-direction: column;
`;

/* ─── 1. 헤더 ───────────────────────────────────────────────────────────── */
const Header = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  width:${size.width}px;
  
`;
const BackTouchable = styled.TouchableOpacity`
  width: 32px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 20px;
  height:100%;
`;
const HeaderTitle = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #222222;
`;

/* ─── 2. 내가 클리어한 업적들 박스 ───────────────────────────────────────── */
const CountBox = styled.View`
  margin: 16px;
  background-color: #e0f4ff; /* 연한 파란 배경 */
  border-radius: 12px;
  padding-vertical: 12px;
  padding-horizontal: 25px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height:80px;
`;
const CountText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #222222;
`;
const CountNumber = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #222222;
`;

/* ─── 3. 업적 그리드 카드 ────────────────────────────────────────────────── */
const Card = styled.View`
  margin-horizontal: 16px;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #ddd;
  padding: 16px 20px;
  /* iOS 그림자 */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  /* Android 그림자 */
  elevation: 3;
`;

/** 카드 제목 텍스트 */
const CardTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #222222;
  margin-bottom: 12px;
`;

/** 그리드 전체를 싼 뷰 (세로로 행을 쌓음) */
const Grid = styled.View`
  /* 가로로 꽉 채우게 됩니다 */
`;

/** 한 행(Row)을 수평으로 배치 */
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

/** 파란색 히든 포인트 칸 */
const BlueCell = styled.View`
  flex: 1;
  aspect-ratio: 1; /* 정사각형 확보: 가로세로 비율 1:1 */
  margin: 8px;
  background-color: #cce9ff; /* 연한 파란 */
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

/** 파란 칸 안 텍스트 “?” */
const BlueText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #222222;
`;

/** 노란색 성공(업적) 칸 (눌렀을 때 팝업 열림) */
const YellowCell = styled.TouchableOpacity`
  flex: 1;
  aspect-ratio: 1;
  margin: 8px;
  background-color: #ffd85c; /* 노란 배경 */
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

/** 노란 칸 안 텍스트 “성공>” */
const YellowText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #222222;
`;

/* ─── 4. 모달 팝업 ─────────────────────────────────────────────────────── */

/** 배경 반투명 오버레이 */
const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
`;

/** 모달 콘텐츠를 화면에서 중앙에 위치시키기 위한 래퍼 */
const ModalCentered = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

/** 팝업 박스(노란색) */
const ModalBox = styled.View`
  width: 260px;
  background-color: #FFF0AC;
  min-height:250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 20px;
  align-items: center;
  /* iOS 그림자 */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  /* Android 그림자 */
  elevation: 3;
`;

/** 팝업 제목 */
const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #222222;
`;

/** 팝업 설명 텍스트 */
const ModalDesc = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  color: #222222;
  text-align: center;
`;

/** 팝업 닫기 버튼 */
const CloseButton = styled.TouchableOpacity`
  margin-top: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  padding-vertical: 8px;
  padding-horizontal: 16px;
`;
const CloseButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #222222;
`;
