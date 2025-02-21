import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../screen/Main';
import Test from '../screen/Test';
import MyPage from '../screen/MyPage';
import TestContents from '../components/TestContents';


const Tab = createBottomTabNavigator();


const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false})}>
      <Tab.Screen name='Test' component={Test}/>
      <Tab.Screen name='Main' component={Main} options={{headerShown:false}}/>
      <Tab.Screen name="MyPage" component={MyPage} options={{headerShown:false}}/>
    </Tab.Navigator>
  )
}

export default TabNavigation