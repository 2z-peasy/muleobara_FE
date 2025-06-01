import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import styled, { css } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { size } from "../util";

/**
 * ▶️ 라디오 버튼 컴포넌트
 *    - selected: 이 버튼이 현재 선택된 상태인지 여부
 *    - onPress: 눌렀을 때 호출될 함수
 *    - label: 버튼 오른쪽에 표시될 텍스트
 */
const RadioButton = ({ selected, onPress, label }) => (
  <RadioContainer onPress={onPress} activeOpacity={0.7}>
    <OuterCircle>
      {selected && <InnerCircle />}
    </OuterCircle>
    <RadioLabel>{label}</RadioLabel>
  </RadioContainer>
);

/**
 * ▶️ 금액 옵션 카드 컴포넌트
 *    - title: “10코인” 또는 “20코인 + 3코인 보너스” 등
 *    - price: 오른쪽에 표시될 “₩ 1000”
 *    - selected: 현재 선택된 상태인지 여부
 *    - onPress: 눌렀을 때 선택 토글 함수
 */
const AmountCard = ({ title, price, selected, onPress }) => (
  <AmountTouchable onPress={onPress} activeOpacity={0.8}>
    <CardContainer selected={selected}>
      <CardLeftText>{title}</CardLeftText>
      <CardRightText>{price}</CardRightText>
    </CardContainer>
  </AmountTouchable>
);

export default function StoreScreen() {
  const navigation = useNavigation();

  // 1) 금액 옵션들 (초기값: 두 번째 “20코인 + 3코인 보너스” 선택)
  const amountOptions = [
    { key: "10", label: "10코인", price: "₩ 1000" },
    { key: "20", label: "20코인 + 3코인 보너스", price: "₩ 1000" },
    { key: "30", label: "30코인 + 6코인 보너스", price: "₩ 1000" },
    { key: "40", label: "40코인 + 9코인 보너스", price: "₩ 1000" },
  ];
  const [selectedAmountKey, setSelectedAmountKey] = useState("20");

  // 2) 결제 수단(라디오 버튼): "kakao" 또는 "other"
  const [paymentMethod, setPaymentMethod] = useState("kakao");

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
    <Root>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </BackButton>
        <HeaderTitle>상점</HeaderTitle>
      </Header>

      <ScrollContainer
        contentContainerStyle={{ paddingBottom: 120 /* 하단 버튼 spacer */ }}
      >
        {/* ─────────────────────────────────────────────────────────────────
           1. 현재 보유 티켓 표시 영역
        ───────────────────────────────────────────────────────────────── */}
        <TicketBox>
          <TicketText>
            현재 보유중인 추가 티켓
          </TicketText>
          <HeartIcon name="heart" size={18} color="#4EA1F3" />
          <TicketCount> 0</TicketCount>
        </TicketBox>

        {/* 구분선 */}
        <Divider />

        {/* ─────────────────────────────────────────────────────────────────
           2. 충전 금액 선택 섹션
        ───────────────────────────────────────────────────────────────── */}
        <SectionTitle>충전하실 금액을 선택하세요.</SectionTitle>
        <AmountList>
          {amountOptions.map((opt) => (
            <AmountCard
              key={opt.key}
              title={opt.label}
              price={opt.price}
              selected={selectedAmountKey === opt.key}
              onPress={() => setSelectedAmountKey(opt.key)}
            />
          ))}
        </AmountList>

        {/* 구분선 */}
        <Divider />

        {/* ─────────────────────────────────────────────────────────────────
           3. 결제방법 선택 섹션
        ───────────────────────────────────────────────────────────────── */}
        <SectionTitle>결제방법을 선택해 주세요.</SectionTitle>
        <PaymentOptions>
          <RadioButton
            label="카카오 페이"
            selected={paymentMethod === "kakao"}
            onPress={() => setPaymentMethod("kakao")}
          />
          <RadioButton
            label="다른 결제 수단"
            selected={paymentMethod === "other"}
            onPress={() => setPaymentMethod("other")}
          />
        </PaymentOptions>

        {/* 선택된 결제 수단 상세 정보 박스 */}
        <PaymentInfoBox>
          <PaymentInfoTopRow>
            <PaymentInfoText>신용카드</PaymentInfoText>
            <ChangeMethodText>수단변경</ChangeMethodText>
          </PaymentInfoTopRow>
          <PaymentInfoDetail>
            신용카드, 토스, 페이코, 휴대폰
          </PaymentInfoDetail>
        </PaymentInfoBox>
      </ScrollContainer>

      {/* ─────────────────────────────────────────────────────────────────
         4. 하단 결제 버튼
      ───────────────────────────────────────────────────────────────── */}
      <BottomButtonWrapper activeOpacity={0.8}>
        <BottomButtonText>23코인 결제하기</BottomButtonText>
      </BottomButtonWrapper>
    </Root>
    </SafeAreaView>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   styled-components 정의
─────────────────────────────────────────────────────────────────────────── */

/** 최상위 컨테이너 */
const Root = styled.View`
  background-color: #ffffff;
  width:${size.width}px;
  height:${size.height}px;
  padding: 0 20px;
`;

/* ─── 헤더 ─────────────────────────────────────────────────────────────── */
const Header = styled.View`
  height: 56px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;
const BackButton = styled.TouchableOpacity`
  width: 32px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
`;
const HeaderTitle = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #222222;
`;

/* ─── 스크롤 가능한 컨테이너 ───────────────────────────────────────────── */
const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

/* ─── 1. 현재 보유 티켓 표시 영역 ────────────────────────────────────────── */
const TicketBox = styled.View`
  margin: 16px;
  background-color: #E0F4FF; /* 연한 파란 배경 */
  border-radius: 12px;
  padding-vertical: 12px;
  padding-horizontal: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const TicketText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #222222;
`;
const HeartIcon = styled(Ionicons)`
  margin-left: 8px;
`;
const TicketCount = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #222222;
`;

/* ─── 구분선 ───────────────────────────────────────────────────────────── */
const Divider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  margin-vertical: 12px;
`;

/* ─── 2. 충전 금액 선택 섹션 ────────────────────────────────────────────── */
/** 섹션 제목 텍스트 */
const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #222222;
  margin-horizontal: 16px;
  margin-bottom: 12px;
`;

/** 옵션 카드들을 감싸는 뷰 */
const AmountList = styled.View`
  margin-horizontal: 16px;
`;

/** 카드 터치 가능한 래퍼 */
const AmountTouchable = styled.TouchableOpacity`
  margin-bottom: 12px;
`;

/**
 * 카드 컨테이너
 *  - selected: true면 파란색 테두리(#4EA1F3), false면 연한 회색 테두리(#E0E0E0)
 */
const CardContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  padding-vertical: 14px;
  padding-horizontal: 16px;

  ${({ selected }) =>
    selected
      ? css`
          border: 2px solid #4EA1F3;  /* 선택된 카드 */
        `
      : css`
          border: 1px solid #E0E0E0;  /* 기본 상태 카드 */
        `}
`;

/** 카드 왼쪽 텍스트(금액 이름) */
const CardLeftText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #222222;
`;

/** 카드 오른쪽 텍스트(₩ 가격) */
const CardRightText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #555555;
`;

/* ─── 3. 결제 방법 선택 섹션 ───────────────────────────────────────────── */
const PaymentOptions = styled.View`
  margin-horizontal: 16px;
`;

/** 라디오 버튼 컨테이너 (아이템 전체를 눌러서 선택 가능) */
const RadioContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

/** 라디오 버튼 바깥 원 */
const OuterCircle = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  border: 2px solid #4EA1F3; /* 파란 테두리 */
  justify-content: center;
  align-items: center;
`;

/** 라디오 버튼 내부 채워진 원 (선택된 경우만 표시) */
const InnerCircle = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #4EA1F3; /* 파란 채우기 */
`;

/** 라디오 버튼 옆 레이블 텍스트 */
const RadioLabel = styled.Text`
  font-size: 14px;
  color: #222222;
  margin-left: 8px;
`;

/** 결제 수단 정보 박스 */
const PaymentInfoBox = styled.View`
  margin-horizontal: 16px;
  margin-top: 12px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #E0E0E0;
  padding: 12px;
`;

/** PaymentInfo 박스 상단 Row: “신용카드” + “수단변경” */
const PaymentInfoTopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

/** “신용카드” 텍스트 */
const PaymentInfoText = styled.Text`
  font-size: 14px;
  color: #222222;
`;

/** “수단변경” 텍스트 (터치 가능) */
const ChangeMethodText = styled.Text`
  font-size: 13px;
  color: #4EA1F3;
`;

/** PaymentInfo 박스 하단 상세 리스트 텍스트 */
const PaymentInfoDetail = styled.Text`
  margin-top: 6px;
  font-size: 13px;
  color: #555555;
`;

/* ─── 4. 하단 결제 버튼 ───────────────────────────────────────────────── */
const BottomButtonWrapper = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #4EA1F3;  /* 파란색 배경 */
  padding-vertical: 16px;
  align-items: center;
`;

/** 버튼 텍스트 */
const BottomButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;
