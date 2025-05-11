import { createStaticNavigation } from '@react-navigation/native'
import React from 'react'
import Main from '../screen/Main';
import { createStackNavigator } from '@react-navigation/stack';
import Start from '../screen/Start';
import SignUp from '../screen/SignUp';
import LogIn from '../screen/LogIn';
import Chat from '../screen/Chat';
import Test from '../screen/Test';
import TabNavigation from './TabNavigation';
import SettingNickname from '../screen/SettingNickname';
import StartMbti from '../screen/StartMbti';
import MbtiTest from '../screen/MbtiTest';
import Comunity from '../screen/Comunity';
import DetailPost from '../screen/DetailPost';
import Mission from '../screen/Mission';
import Notification from '../screen/Notification';
import BalanceGameResult from '../screen/BalanceGameResult';


const StackNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
    initialRouteName='Start'>
      <Stack.Screen name="Main" component={Main} options={{headerShown:false}}/>
      <Stack.Screen name='Tabs' component={TabNavigation} options={{headerShown:false}}/>
      <Stack.Screen name="Start" component={Start} options={{headerShown:false}}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name="LogIn" component={LogIn} options={{headerShown:false}}/>
      <Stack.Screen name="Chat" component={Chat} options={{headerShown:false}}/>
      {/* <Stack.Screen name='Test' component={Test} options={{headerShown:false}}/> */}
      <Stack.Screen name="SettingNickname" component={SettingNickname} options={{headerShown:false}}/>
      <Stack.Screen name="StartMbti" component={StartMbti} options={{headerShown:false}}/>
      <Stack.Screen name="MbtiTest" component={MbtiTest} options={{headerShown:false}}/>
      <Stack.Screen name="Comunity" component={Comunity} options={{headerShown:false}}/>
      <Stack.Screen name="DetailPost" component={DetailPost} options={{headerShown:false}}/>
      <Stack.Screen name="Mission" component={Mission} options={{headerShown:false}}/>
      <Stack.Screen name="Notification" component={Notification}  options={{headerShown:false}}/>
      <Stack.Screen name="BalanceGameResult" component={BalanceGameResult} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default StackNavigation