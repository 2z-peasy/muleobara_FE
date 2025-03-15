import { useNavigation } from "@react-navigation/native";
import baseUrl from "../api/baseURL";
import AsyncStorage from '@react-native-async-storage/async-storage'


export const useLogin = () => {
  const navigation = useNavigation();

  const handleLogin = async (email,password) => {
    try {
      const response = await baseUrl.post('/login',{
        email:email,
        password:password
      })
      console.log(response.data)
      const {access_token, refresh_token} = response.data
      AsyncStorage.setItem('accessToken',access_token)
      AsyncStorage.setItem('refreshToken',refresh_token)
      navigation.navigate('Tabs')
    } catch (err) {
      const errorMessage = err.response?.data?.message || "로그인 실패";
      setError(errorMessage);

    }
  };

  return {
    handleLogin
  }
}

