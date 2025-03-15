import { useNavigation } from "@react-navigation/native"
import axios from "axios"


export const useSignup = () => {
  const navigation = useNavigation();

  const handleSignup = async(email,password) => {
    try {
      const response = await axios.post("http://52.79.42.211:8080/signup",{
        email:email,
        password:password
      })
      console.log(response.data)
      navigation.navigate('SettingNickname')
    } catch (error) {
      console.log(error)
    }
  }

  return {
    handleSignup
  }
}

