import React from 'react'
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components'
import { size } from '../util'
import AntDesign from '@expo/vector-icons/AntDesign';
import fire_icon from '../assets/fire_icon.png';
import comment_icon from '../assets/comment_icon.png';
import MarginVertical from '../components/MarginVertical';
import { useNavigation } from '@react-navigation/native';

const DetailPost = ({route}) => {
  const {contents} = route.params;
  const commentContents = [["강아지", "학기중에는 정신없어서 방학때 하는게 더 좋을거같아용"],['도마뱀', "저는 걍 학기중에 했어요"]]
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor:"#fff"}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <PostBody>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </Header>
        <PostEl>
          <PostProfileArea>
            <ProfileImg>
            </ProfileImg>
            <ProfileName>{contents[0]}</ProfileName>
          </PostProfileArea>
          <MarginVertical margin={15}/>
          <PostTitle>{contents[1]}</PostTitle>
          <MarginVertical margin={8}/>
          <PostText>{contents[2]}</PostText>
          <MarginVertical margin={40}/>
          <SelectArea>
            <SelectEl>
              <SelectText>{contents[3]}</SelectText>
            </SelectEl>
            <Text style={{fontWeight:600, fontSize:16}}>VS</Text>
            <SelectEl>
              <SelectText>{contents[4]}</SelectText>
            </SelectEl>
          </SelectArea>
          <MarginVertical margin={40}/>
          <LikeArea>
            <LikeEl>
              <Image source={fire_icon} style={{width:30, height:30}}/>
              <Text style={{fontWeight:600, fontSize:16}}>{contents[5]}</Text>
            </LikeEl>
            <LikeEl onPress={() => navigation.navigate("DetailPost", {contents:el})}>
              <Image source={comment_icon} style={{width:32, height:32}}/>
              <Text style={{fontWeight:600, fontSize:16}}>{contents[6]}</Text>
            </LikeEl>
          </LikeArea>
        </PostEl>
        <MarginVertical margin={15}/>
        <View style={{width:size.width, height:15, backgroundColor:"#F0F0F0"}}></View>
        <MarginVertical margin={25}/>
        {commentContents.map((el,index) => {
          return(
            <CommentEl key={index}>
              <PostProfileArea>
                <ProfileImg></ProfileImg>
                <ProfileName>{el[0]}</ProfileName>
              </PostProfileArea>
              <MarginVertical margin={20}/>
              <PostText>{el[1]}</PostText>
              <MarginVertical margin={10}/>
              <TouchableOpacity>
                <Text>댓글 남기기</Text>
              </TouchableOpacity>
              <MarginVertical margin={25}/>
              <BorderLine/>
              <MarginVertical margin={25}/>
            </CommentEl>
          )
        })}
        
      </PostBody>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailPost

const PostBody = styled.View`
  width:${size.width}px;
  height:${size.height}px;
  padding:0 30px;
  background-color:#fff;
  align-items:center;
`

const Header = styled.View`
  width:100%;
  height:50px;
  display:flex;
  justify-content:center;
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

const CommentEl = styled.View`
  width:100%;
`

const BorderLine = styled.View`
  width:${size.width*.9}px;
  height:1px;
  background-color:#f0f0f0;
`


