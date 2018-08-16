import React  from 'react'
import styled from 'styled-components'
import Card   from '../../components/common/Card'
import Icon   from 'react-native-vector-icons/FontAwesome'
import { Dimensions, TouchableOpacity } from 'react-native'

export const Container = styled.View`
  flex: 1;
  padding-top: 5;
  padding-left: 5;
  justify-content: space-between;
`

export const Menu = styled(Card)`
  width: ${(Dimensions.get('window').width - 30) /2};
  height: 100px;
  margin: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff
`

export const MenuTitle = styled.Text`
  font-size: 15;
  text-align: center;
  color: ${ props => props.color }
`
export const MenuGroup = styled.View`
  flex-direction: row;
`

export const LogoWrapper = styled.View`
  align-items: center;
  padding: 10px;
  justify-content: center;
  flex: 1;
`

export const Logo = styled.Image`
  width: 200px;
  height: 200px;
`

export const MenuWrapper = styled.View`
  margin-bottom: 20px;
`

export const LanguageWrapper = styled.TouchableOpacity`
  align-items: center;
  margin-right: 10px;
  padding: 5px;
`
export const LanguageShortcut = styled.Text`
  font-size: 15px;
  color: #fff;
`

export const MenuButton = ({ screen, icon, title, color, onPress }) => (
  <TouchableOpacity onPress={ () => onPress() }>
    <Menu>
      <Icon
        name={ icon }
        size={ 30 }
        style={{ marginBottom: 10 }}
        color={ color }
      />
      <MenuTitle color={ color } >{ title }</MenuTitle>
    </Menu>
  </TouchableOpacity>
)
