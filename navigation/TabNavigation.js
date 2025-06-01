import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// 스크린 컴포넌트들 임포트
import Main from "../screen/Main";
import Test from "../screen/Test";
import MyPage from "../screen/MyPage";
import GoalMainScreen from "../screen/GoalMain";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        headerShown: false,
        // 탭 아이콘 설정
        tabBarIcon: ({ focused, color, size }) => {
          // 공통 크기로 28으로 설정
          const iconSize = 28;
          // 각 탭 이름(route.name)에 따라 다른 아이콘을 렌더링
          if (route.name === "Goal") {
            return (
              <View style={styles.iconWrapper}>
                {/* 사각형 윤곽선 아이콘 */}
                <Ionicons name="square-outline" size={iconSize} color="#222" />
                {/* 체크 오버레이 */}
                <Ionicons
                  name="checkmark"
                  size={18}
                  color="#222"
                  style={styles.checkOverlay}
                />
              </View>
            );
          } else if (route.name === "Main") {
            return (
              <Ionicons
                name="home-outline"
                size={iconSize}
                color="#222"
              />
            );
          } else if (route.name === "MyPage") {
            return (
              <Ionicons
                name="person-outline"
                size={iconSize}
                color="#222"
              />
            );
          }
          // 기본 빈 뷰 반환
          return <View />;
        },
        // 탭 바 자체 스타일 커스터마이즈 (원한다면 추가적으로 조정하세요)
        tabBarStyle: {
          height: 80,
          paddingBottom: 6,
          paddingTop: 12,
        },
        // 탭 라벨 보이지 않게 하려면 아래 옵션 사용
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Goal" component={GoalMainScreen} />
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

/* ─────────────────────────────────────────────────────────────────
   탭 아이콘 오버레이용 스타일
───────────────────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  iconWrapper: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  checkOverlay: {
    position: "absolute",
    // ‘square-outline’ 아이콘 내부에서 체크마크가 중앙에 오도록 좌표를 조정
    top: 5,
    left: 5,
  },
});
