import baseUrl from "../api/baseURL";
import AsyncStorage from '@react-native-async-storage/async-storage'


export const useChat = () => {

  const handleChatSubmit = async(setting,choices,setGptAnswer,setStep) => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      const response = await baseUrl.post(
        `/recommends/request`,
        {
            setting: setting,
            choices: choices,
            
        },
        {
          headers: {
            Authorization:`Bearer ${token}`
          }
        }
      );
      const data = response.data;
      console.log(data)
      setGptAnswer(data.data);
      setStep(3);
      
        const interval = setInterval(() => {
          setStep((prevStep) => {
            if (prevStep >= 3 && prevStep < 5) {
              return prevStep + 1;
            }
    
            clearInterval(interval);
            return prevStep;
          });
        },  1000);
    
        
      
      
      console.log(setting, choices)
    } catch (error) {
      console.log(error);
      console.log(setting, choices)
    }
  }

  return {
    handleChatSubmit
  }
}

