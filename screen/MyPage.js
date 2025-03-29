import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

function MyPage() {
  const nickname = "닉네임"; // 사용자 닉네임 예시
  const chatId = 12345; // 예시 채팅 ID
  const answer = "추천 음식은 초코라떼입니다."; // 예시 AI 답변
  const choices = ["딸기라떼", "초코라떼"]; // 예시 선택지
  const [slides, setSlides] = useState([{title:"딸기라떼vs초코라떼", description:"초코라떼를 추천드려요!"}]); // 슬라이드 데이터 상태
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const navigation = useNavigation();
  

  useEffect(() => {
    // 데이터 가져오기
    const fetchSlides = async () => {
      try {
        const response = await axios.get(`https://your-api-url.com/slides`);
        setSlides(response.data); // 받아온 데이터를 슬라이드 상태로 설정
        setLoading(false); // 로딩 완료
      } catch (err) {
        setError("데이터를 가져오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  if (loading) {
    return <LoadingText>로딩 중...</LoadingText>; // 로딩 중 메시지
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>; // 에러 메시지
  }

  // 하트 보관함에 저장하는 함수
  const saveToHeart = async () => {
    const token = "your_jwt_token"; // JWT 토큰 설정

    const data = {
      nickname: nickname,
      chat_id: chatId,
      answer: answer,
      choices: choices,
    };

    try {
      const response = await axios.post(
        "https://your-api-url.com/hearts/save",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("저장 성공:", response.data);
      alert("하트 보관함에 저장되었습니다!");
    } catch (error) {
      console.error("저장 실패:", error.response?.data || error.message);
      alert("저장 중 문제가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
    <Container>
      {/* 상단 네비게이션 바 */}
      <Navbar>
        <StatusIcons>
          <Signal />
          <Wifi />
          <Battery />
        </StatusIcons>
      </Navbar>

      {/* 사용자 정보 */}
      <ProfileSection>
        <ProfileImage>
          <Image source={require('../assets/mypage.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
        </ProfileImage>
        <WelcomeMessage>{nickname}님 안녕하세요!</WelcomeMessage>
      </ProfileSection>

      {/* 보관함 섹션 */}
      <FavoritesSection>
        <FavoritesTitle>❤️ 보관함</FavoritesTitle>
        <Slider>
          <SliderButton onPress={handlePrevSlide}>{"<"}</SliderButton>
          <SliderContent>
            <ItemTitle>{slides[currentIndex].title}</ItemTitle>
            <ItemDescription>{slides[currentIndex].description}</ItemDescription>
          </SliderContent>
          <SliderButton onPress={handleNextSlide}>{">"}</SliderButton>
        </Slider>

        {/* 페이지 표시용 점 */}
        <PaginationDots>
          {/* {slides.map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex}
              onPress={() => setCurrentIndex(index)}
            />
          ))} */}
        </PaginationDots>
      </FavoritesSection>

      {/* 성향 테스트 다시 해보기 버튼 */}
      <RestartSection>
        <RestartButton onPress={() => navigation.navigate('StartScreen')}>
          <RestartButtonText>성향테스트 다시 해보기</RestartButtonText>
        </RestartButton>
      </RestartSection>
    </Container>
    </SafeAreaView>
  );
}

export default MyPage;

// 스타일드 컴포넌트
const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  align-items: center;
`;

const Navbar = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const StatusIcons = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const Signal = styled.View`
  width: 15px;
  height: 15px;
  background-color: gray;
  border-radius: 50%;
`;

const Wifi = styled.View`
  width: 15px;
  height: 15px;
  background-color: gray;
  border-radius: 50%;
`;

const Battery = styled.View`
  width: 15px;
  height: 15px;
  background-color: gray;
  border-radius: 50%;
`;

const ProfileSection = styled.View`
  align-items: center;
  margin-top: 30px;
`;

const ProfileImage = styled.View`
  margin-bottom: 10px;
`;

const WelcomeMessage = styled.Text`
  font-size: 18px;
  color: #333;
  font-weight:700
`;

const FavoritesSection = styled.View`
  margin-top: 30px;
  width: 100%;
`;

const FavoritesTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #d32f2f;
`;

const Slider = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SliderButton = styled.TouchableOpacity`
  font-size: 24px;
  padding: 10px;
`;

const SliderContent = styled.View`
  width: 60%;
  text-align: center;
`;

const ItemTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ItemDescription = styled.Text`
  font-size: 14px;
  color: #666;
`;

const PaginationDots = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;

const Dot = styled.TouchableOpacity`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? 'black' : 'gray')};
`;

const RestartSection = styled.View`
  position:absolute;
  bottom:50px;
`;

const RestartButton = styled.TouchableOpacity`
  background-color: #ffccbc;
  padding: 10px 20px;
  border-radius: 12px;
  text-align: center;
  
`;

const RestartButtonText = styled.Text`
font-size: 16px;
font-weight: bold;
`

const LoadingText = styled.Text`
  font-size: 18px;
  color: #333;
  text-align: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.Text`
  font-size: 18px;
  color: red;
  text-align: center;
  margin-top: 20px;
`;

