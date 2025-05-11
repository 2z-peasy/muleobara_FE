import React from 'react'
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { styled } from 'styled-components'
import { size } from '../util'
import MarginVertical from '../components/MarginVertical'
import fire_icon from '../assets/fire_icon.png';
import comment_icon from '../assets/comment_icon.png';
import { useNavigation } from '@react-navigation/native'

const Comunity = () => {
  const postContents = [["고양이", "사회봉사 언제할까요?","방학때 사회봉자 한달동안 빡세게 할까요 근데 계절학기로 들어야해요 아님 학기중에 일주일에 3시간 4시간식 할까요?","학기중에","방학에","12", "2"],
                        ["강아지","졸업유예를 할까여 말까여", "졸업 준비가 안됐어요ㅠ 무서버요 졸업유예를 하고 취준할까요 자격증 따면서 어케 생각하나요","해","하지마","30","0"]]
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor:"#fff"}}>
      <ComunityBody>
        <ScrollView showsVerticalScrollIndicator={false}>
        <BalanceGameArea>
          <BalanceGameTitle>
            오늘의 밸런스 게임
          </BalanceGameTitle>
          <MarginVertical margin={40}/>
          <View style={{flexDirection:'row', gap:20}}>
          <BalanceGameElBody>
            <View style={{width:50, height:50, borderRadius:'50%', backgroundColor:"#FDF1E9", justifyContent:'center', alignItems:'center', position:'absolute', zIndex:2, top:-25}}>
              <Text style={{color:"#FF1010", fontSize:36, fontWeight:600}}>A</Text>
            </View>
            <BalanceGameEl onPress={() => navigation.navigate("BalanceGameResult")}>
              <SelectText style={{fontWeight:700}}>평생 돼지고기 먹기</SelectText>
            </BalanceGameEl>
          </BalanceGameElBody>
          <BalanceGameElBody>
            <View style={{width:50, height:50, borderRadius:'50%', backgroundColor:"#FDF1E9", justifyContent:'center', alignItems:'center', position:'absolute', zIndex:2, top:-25}}>
              <Text style={{color:"#47B2FF", fontSize:36, fontWeight:600}}>B</Text>
            </View>
            <BalanceGameEl onPress={() => navigation.navigate("BalanceGameResult")}>
              <SelectText style={{fontWeight:700}}>평생 소고기 먹기</SelectText>
            </BalanceGameEl>
          </BalanceGameElBody>
          </View>
        </BalanceGameArea>
        <View style={{width:size.width, backgroundColor:"#F0F0F0", height:60}}></View>
        <PostsArea>
          <MarginVertical margin={25}/>
          {postContents.map((el,index) => {
            return(
              <PostEl key={index}>
                <PostProfileArea>
                  <ProfileImg></ProfileImg>
                  <ProfileName>{el[0]}</ProfileName>
                </PostProfileArea>
                <MarginVertical margin={15}/>
                <PostTitle>{el[1]}</PostTitle>
                <MarginVertical margin={8}/>
                <PostText>{el[2]}</PostText>
                <MarginVertical margin={25}/>
                <SelectArea>
                  <SelectEl>
                    <SelectText>{el[3]}</SelectText>
                  </SelectEl>
                  <Text style={{fontWeight:600, fontSize:16}}>VS</Text>
                  <SelectEl>
                    <SelectText>{el[4]}</SelectText>
                  </SelectEl>
                </SelectArea>
                <MarginVertical margin={25}/>
                <LikeArea>
                  <LikeEl>
                    <Image source={fire_icon} style={{width:30, height:30}}/>
                    <Text style={{fontWeight:600, fontSize:16}}>{el[5]}</Text>
                  </LikeEl>
                  <LikeEl onPress={() => navigation.navigate("DetailPost", {contents:el})}>
                    <Image source={comment_icon} style={{width:32, height:32}}/>
                    <Text style={{fontWeight:600, fontSize:16}}>{el[6]}</Text>
                  </LikeEl>
                </LikeArea>
                <MarginVertical margin={50}/>
              </PostEl>
            )
          })}
          <MarginVertical margin={100}/>
        </PostsArea>
        </ScrollView>
      </ComunityBody>
    </SafeAreaView>
  )
}

const ComunityBody = styled.View`
  width:${size.width}px;
  background-color:#fff;
  height:${size.height}px;
`

const BalanceGameArea = styled.View`
  width:100%;
  background-color:#FFF0AC;
  height:450px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const BalanceGameTitle = styled.Text`
  color: #000;
  font-size: 32px;
  font-weight: 600;
`

const BalanceGameElBody = styled.View`
  display:flex;
  align-items:center;
`

const BalanceGameEl = styled.TouchableOpacity`
  width:150px;
  height:240px;
  background-color:#fff;
  border-radius:10px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const PostsArea = styled.View`
  padding: 0 30px;
`

const PostEl = styled.View`
  width:100%;
`

const PostProfileArea = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:10px;
`

const ProfileImg = styled.View`
  width:40px;
  height:40px;
  border-radius:50%;
  background-color:#4DC2AB;
`

const ProfileName = styled.Text`
  color: #000;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`

const PostTitle = styled.Text`
  color: #000;
  font-size: 20px;
  font-weight: 600;
`

const PostText = styled.Text`
  color: #000;
  font-size: 15px;
  font-weight: 500;
`

const SelectArea = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  gap:20px;
`

const SelectEl = styled.TouchableOpacity`
  width:100px;
  height:30px;
  border-radius:10px;
  border: 1px solid #000;
  background: #FFF;
  justify-content:center;
  align-items:center;
`

const SelectText = styled.Text`
  color: #000;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`

const LikeArea = styled.View`
  display:flex;
  flex-direction:row;
  gap:10px;
`

const LikeEl = styled.TouchableOpacity`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  gap:5px;
`


export default Comunity