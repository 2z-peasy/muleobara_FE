import React, { useState, useRef } from "react";
import { View, Text, Dimensions, Animated, PanResponder } from "react-native";
import styled from "styled-components/native";
import MarginVertical from "./MarginVertical";

const screenWidth = Dimensions.get("window").width;
const SLIDER_WIDTH = screenWidth * 0.8; // 슬라이더 전체 길이
const KNOB_SIZE = 24;
const positions = {
  50: 0,
  75: SLIDER_WIDTH * 0.5 - KNOB_SIZE / 2,
  100: SLIDER_WIDTH - KNOB_SIZE,
};

// 자동 이동 기준 (%)
const THRESHOLDS = {
  75: 0.4 * SLIDER_WIDTH,  // 30% 지점 → 75로 이동
  100: 0.8 * SLIDER_WIDTH, // 80% 지점 → 100으로 이동
};
const SliderContainer = styled.View`
  width: 100%;
  align-items: center;
  margin: 20px 0;
`;

const Track = styled.View`
  width: ${SLIDER_WIDTH}px;
  height: 8px;
  background-color: #f0e0d0;
  border-radius: 4px;
  position: relative;
`;

const FilledTrack = styled(Animated.View)`
  position: absolute;
  height: 8px;
  background-color: #F7C7A7;
  border-radius: 4px;
  left: 0;
`;

const Knob = styled(Animated.View)`
  position: absolute;
  top: -8px;
  width: ${KNOB_SIZE}px;
  height: ${KNOB_SIZE}px;
  background-color: white;
  border: 3px solid #8E7C7C;
  border-radius: 12px;
`;

const LabelsContainer = styled.View`
  width: ${SLIDER_WIDTH}px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;
const TestText = styled.Text`
color: #000;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 700;
margin-left:20px;
line-height: 34px; /* 242.857% */
`

const DiscreteSlider = ({text}) => {
  const [value, setValue] = useState(50);
  const knobPosition = useRef(new Animated.Value(positions[50])).current;

  const snapToNearest = (gestureX) => {
    let closestValue = 50;

    if (gestureX >= THRESHOLDS[75] && gestureX < THRESHOLDS[100]) {
      closestValue = 75;
    } else if (gestureX >= THRESHOLDS[100]) {
      closestValue = 100;
    }

    // 애니메이션 적용하여 부드럽게 이동
    Animated.timing(knobPosition, {
      toValue: positions[closestValue],
      duration: 200,
      useNativeDriver: false,
    }).start();

    setValue(closestValue);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        let newPos = positions[value] + gesture.dx;

        // 이동 범위 제한 (0 ~ SLIDER_WIDTH)
        newPos = Math.max(0, Math.min(SLIDER_WIDTH - KNOB_SIZE, newPos));
        knobPosition.setValue(newPos);
      },
      onPanResponderRelease: (_, gesture) => {
        let finalPosition = positions[value] + gesture.dx;
        snapToNearest(finalPosition);
      },
    })
  ).current;

  return (
    <SliderContainer>
      <LabelsContainer>
        {[50, 75, 100].map((level) => (
          <Label key={level}>{level}</Label>
        ))}
      </LabelsContainer>
      <MarginVertical margin={10}/>
      <Track>
        <FilledTrack style={{ width: knobPosition }} />
        <Animated.View {...panResponder.panHandlers} style={{ left: knobPosition }}>
          <Knob />
        </Animated.View>
      </Track>
      <View style={{width:'100%'}}>
      <TestText>{text}</TestText>
      </View>
    </SliderContainer>
  );
};

export default DiscreteSlider;