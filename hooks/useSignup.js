import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import baseUrl from "../api/baseURL";
import { useLogin } from "./useLogin";


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
      handleLogin(email,password)
      navigation.navigate('SettingNickname')
    } catch (error) {
      console.log(error)
    }
  }

  return {
    handleSignup
  }
}

