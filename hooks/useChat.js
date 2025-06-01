import baseUrl from "../api/baseURL";
import AsyncStorage from '@react-native-async-storage/async-storage'


export const useChat = () => {

  const handleChatSubmit = async(setting,choices) => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      const response = await baseUrl.post(
        `/recommends/request`,
        {
            setting: "난 시원한게 좋아",
            choices: [
              "바다",
              "산"
            ],
            
        },
        {
          headers: {
            Authorization:`Bearer ${token}`
          }
        }
      );
      const data = response.data;
      // setAiResponse(data);
      // setIsResponse(true);
      console.log(data)
    } catch (error) {
      console.log(error);
      console.log(setting, choices)
    }
  }

  return {
    handleChatSubmit
  }
}

