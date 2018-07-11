import React  from 'react'
import styled from 'styled-components'
import Icon   from 'react-native-vector-icons/FontAwesome'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-right: 30px;
  padding-left: 30px;
  background-color: #fff;
`

export const Header = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: -30px;
`

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const InputField = styled.TextInput`
  align-self: stretch;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-color: ${ props => props.error ? 'red' : '#ddd' };
  flex: 1;
`

export const LoginButton = styled.TouchableOpacity`
  alignSelf: stretch;
  padding: 12px;
  background-color: #337ab7;
  border-radius: 20px;
`

export const LoginText = styled.Text`
  color: #fff;
  width: 100%;
  text-align: center;
  font-size: 15;
`

export const Input = ({ icon, hasError, placeholder, onChange, secureTextEntry }) => (
  <InputWrapper>
    <Icon
      name={ icon }
      size={20}
      color={ hasError ? 'red' : '#ddd'}
      style={{ marginBottom: 15, marginRight: 10 }}
    />
    <InputField
      error={ hasError }
      placeholder={ placeholder }
      underlineColorAndroid='transparent'
      onChangeText={ () => onChange() }
      secureTextEntry={ secureTextEntry }
    />
  </InputWrapper>
)