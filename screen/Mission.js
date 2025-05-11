import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { size } from '../util';

// Screen width for grid calculations
const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_GAP = 16;
const GRID_COLUMNS = 4;
const ITEM_SIZE = (SCREEN_WIDTH - GRID_GAP * 2 - (GRID_COLUMNS - 1) * 8) / GRID_COLUMNS;



const Mission = () => {
  // Sample mission data
  const missions = [
    { id: 1, label: '질문 3번 하기', status: 'done' },
    { id: 2, label: '커뮤니티에 댓글 1개 남기기', status: 'todo' },
    { id: 3, label: '투표 3개 하기', status: 'todo' },
    { id: 4, label: '밸런스 게임 참여하기', status: 'todo' },
    { id: 5, label: '투표올리기', status: 'todo' },
  ];

  // Sample hidden grid statuses
  const grid = [
    'todo','todo','todo','done',
    'done','todo','todo','done',
    'todo','todo','todo','todo',
  ];

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card>
          <MissionHeader>
            <ProgressPill>
              <ProgressText>1/3</ProgressText>
            </ProgressPill>
            <TitleText>{"오늘의 미션을 성공하고\n질문권을 획득하세요!"}</TitleText>
          </MissionHeader>
          {missions.map(item => (
            <MissionItem key={item.id}>
              <MissionLabel>{item.label}</MissionLabel>
              {item.status === 'done' ? (
                <ActionButton bgColor="#ffe599">
                  <ButtonText>획득</ButtonText>
                </ActionButton>
              ) : (
                <ActionButton bgColor="#c5e9ff">
                  <ButtonText>{'>>'}</ButtonText>
                </ActionButton>
              )}
            </MissionItem>
          ))}
        </Card>

        <Card>
          <TitleText>히든 포인트</TitleText>
          <GridContainer>
            {grid.map((status, idx) => (
              <GridItem key={idx} bgColor={status === 'done' ? '#ffe599' : '#c5e9ff'}>
                <HiddenText>{status === 'done' ? '성공>' : '?'}</HiddenText>
              </GridItem>
            ))}
          </GridContainer>
        </Card>
      </ScrollView>
    </Container>
  );
};

export default Mission;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  padding: 0 30px;
  display:flex;
  align-items:center;
`;

const Card = styled(View)`
  background-color: #ffffff;
  margin: 16px;
  border-radius: 12px;
  padding: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  display:flex;
  align-items:center;
  width:${size.width-60}px;
`;

const MissionHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const ProgressPill = styled(View)`
  background-color: #c5e9ff;
  padding: 4px 12px;
  border-radius: 12px;
  margin-right: 8px;
`;

const ProgressText = styled(Text)`
  font-size: 14px;
  font-weight: bold;
`;

const TitleText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  text-align:end;
  flex:1;
`;

const MissionItem = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  border:1px solid #47B2FF;
  border-radius:12px;
  padding:14px 21px;
`;

const MissionLabel = styled(Text)`
  font-size: 20px;
  flex: 1;
  font-weight:600;
`;

const ActionButton = styled(TouchableOpacity)`
  background-color: ${props => props.bgColor || '#c5e9ff'};
  padding: 6px 12px;
  border-radius: 12px;
`;

const ButtonText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

const GridContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 16px;
`;

const GridItem = styled(View)`
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
  background-color: ${props => props.bgColor || '#c5e9ff'};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const HiddenText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;
