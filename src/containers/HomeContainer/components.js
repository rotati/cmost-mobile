import React  from 'react'
import styled from 'styled-components'
import Card   from '../../components/common/Card'
import Icon   from 'react-native-vector-icons/FontAwesome'
import { Dimensions, TouchableOpacity } from 'react-native'

export const Container = styled.ScrollView`
  flex: 1;
  padding-top: 5;
  padding-left: 5;
`

export const Menu = styled(Card)`
  width: ${Dimensions.get('window').width - 20};
  height: 100px;
  margin: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${ props => props.background }
`

export const MenuTitle = styled.Text`
  font-size: 15;
  text-align: center;
  color: #fff
`

export const DeleteFormWrapper = styled.View`
  margin-bottom: 10px;
`

export const MenuButton = ({ screen, icon, title, color, onPress }) => (
  <TouchableOpacity onPress={ () => onPress() }>
    <Menu background={ color }>
      <Icon
        name={ icon }
        size={ 30 }
        style={{ marginBottom: 10 }}
        color='#fff'
      />
      <MenuTitle>{ title }</MenuTitle>
    </Menu>
  </TouchableOpacity>
)
