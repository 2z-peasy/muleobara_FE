import { NavigationContainer, createStaticNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigation from './navigation/StackNavigation';
import TabNavigation from './navigation/TabNavigation';

export default function App() {


  return (
    
    <NavigationContainer>
      <StackNavigation/>
      {/* <TabNavigation/> */}
    </NavigationContainer>
  );
}


