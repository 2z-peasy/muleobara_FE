import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import back_arrow from '../assets/arrow_back.png';

const Header = () => {
  const navigation = useNavigation();

  return (
    <HeaderBody>
      <BackButton onPress={() => navigation.goBack()}>
        <BackImage source={back_arrow} />
      </BackButton>
      <HeaderTitle>물어바라</HeaderTitle>
    </HeaderBody>
  );
};

export default Header;

const HeaderBody = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: #fff;
  display:flex;
  flex-direction:row;
  justify-content:center;

`;

const HeaderTitle = styled.Text`
  font-weight: 800;
  font-size: 20px;

`;

const BackButton = styled.TouchableOpacity`
  width: 33px;
  height: 28px;
  position:absolute;
  left:15px;
`;

const BackImage = styled.Image`
  width: 33px;
  height: 28px;
`;
