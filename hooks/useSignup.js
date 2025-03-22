import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import baseUrl from "../api/baseURL";
import { useLogin } from "./useLogin";
import AsyncStorage from '@react-native-async-storage/async-storage'


export const useSignup = () => {
  const navigation = useNavigation();
  const {handleLogin} = useLogin();

  const handleSignup = async(email,password) => {
    try {
      const response = await baseUrl.post("/signup",{
        email:email,
        password:password
      })
      console.log(response.data)
      handleLogin(email,password, "first")
      navigation.navigate('SettingNickname')
    } catch (error) {
      console.log(error)
    }
  }

  const handleNickname = async(nickname) => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      const response = await baseUrl.put('/users/nickname',{
        nickname:nickname
      },{
        Authorization:`Bearer ${token}`
      })
      console.log(response)
      navigation.navigate("StartMbti")
    } catch (error) {
      console.log(error)
    }
  }

  return {
    handleSignup,
    handleNickname
  }
}

