import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;



const Notification = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </BackButton>
        <HeaderTitle>알림</HeaderTitle>
        {/* 빈 공간이나 오른쪽 버튼 */}
        <View style={{ width: 24 }} />
      </Header>
      <Separator />
      <List>
        {notifications.map(item => (
          <NotificationItem key={item.id}>
            <NotificationHeaderRow>
              <CategoryText>{item.category}</CategoryText>
              <DateText>{item.date}</DateText>
            </NotificationHeaderRow>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemDescription>{item.description}</ItemDescription>
          </NotificationItem>
        ))}
      </List>
      <BottomNav>
        <NavButton onPress={() => {/* ... */}}>
          <Ionicons name="checkbox-outline" size={28} color="#333" />
        </NavButton>
        <NavButton onPress={() => {/* ... */}}>
          <Ionicons name="home-outline" size={28} color="#333" />
        </NavButton>
        <NavButton onPress={() => {/* ... */}}>
          <Ionicons name="person-outline" size={28} color="#333" />
        </NavButton>
      </BottomNav>
    </Container>
  );
};

export default Notification;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  justify-content: flex-start;
`;

const BackButton = styled(TouchableOpacity)`
  padding: 4px;
`;

const HeaderTitle = styled(Text)`
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const Separator = styled(View)`
  height: 4px;
  background-color: #CED3DE;
`;

const List = styled(ScrollView)`
  flex: 1;
`;

const NotificationItem = styled(View)`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const NotificationHeaderRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const CategoryText = styled(Text)`
  font-size: 12px;
  color: #777;
`;

const DateText = styled(Text)`
  font-size: 12px;
  color: #777;
`;

const ItemTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const ItemDescription = styled(Text)`
  font-size: 16px;
  font-weight:500;
  line-height:34px;
`;

const BottomNav = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
  border-top-width: 1px;
  border-top-color: #eee;
`;

const NavButton = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
`;

const notifications = [
  {
    id: 1,
    category: '커뮤니티',
    date: '2월 26일',
    title: '부장님과의 식사메뉴 당신의 픽은?',
    description: '짜장면 vs 국밥',
  },
  {
    id: 2,
    category: '질문권',
    date: '2월 25일',
    title: '질문권을 추가 획득하세요!',
    description: '벌써 질문권을 전부 소진 했어요 추가로 획득하세요',
  },
  {
    id: 3,
    category: '오늘의 미션',
    date: '2월 25일',
    title: '오늘의 하루미션을 성공하세요',
    description: '벌써 질문권을 전부 소진 했어요 추가로 획득하세요',
  },
];
