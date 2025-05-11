import baseUrl from "../api/baseURL";
import AsyncStorage from '@react-native-async-storage/async-storage'


export const useChat = () => {

  const handleChatSubmit = async(setting,choices) => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      const response = await baseUrl.post(
        `/recommends/request`,
        {
          "user": {
            "createdAt": "2025-05-07T05:47:05.466Z",
            "modifiedAt": "2025-05-07T05:47:05.466Z",
            "id": 1,
            "email": "wawachi@example.com",
            "password": "password1234!",
            "nickname": "password1234!",
            "userGoalYN": "N",
            "role": "ROLE_USER",
            "baseTickets": 3,
            "baseTicket": 1
          },
          "request": {
            "setting": "난 시원한게 좋아",
            "choices": [
              "바다",
              "산"
            ],
            "retry": "계곡"
          }
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

