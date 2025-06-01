import AsyncStorage from '@react-native-async-storage/async-storage'
import baseUrl from '../api/baseURL'
import { useNavigation } from '@react-navigation/native'

export const useMbti = () => {
  const navigation = useNavigation();
  const handleMbti = async(mbtiInfo) => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      const response = await baseUrl.post('/users/mbti',{
          "eiType": mbtiInfo.eiType,
          "eiPercent": mbtiInfo.eiPercent,
          "nsType": mbtiInfo.nsType,
          "nsPercent": mbtiInfo.nsPercent,
          "tfType": mbtiInfo.tfType,
          "tfPercent": mbtiInfo.tfPercent,
          "pjType": mbtiInfo.pjType,
          "pjPercent": mbtiInfo.pjPercent
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
      navigation.navigate("Main")
    } catch (error) {
      console.log(error)
      console.log('mbtiInfo',mbtiInfo)

    }
  }

  return {
    handleMbti
  }
}

