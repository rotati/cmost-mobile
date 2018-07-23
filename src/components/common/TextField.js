import React  from 'react'
import styled from 'styled-components'
import { View } from 'react-native'

const Label = styled.Text`
  font-weight: bold;
  margin-bottom: 5;
`

const Hint = styled.Text`
  font-style: italic; 
  margin-bottom: 10;
`

const Input = styled.TextInput`
  border-color: #ddd;
  border-width: 1px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 10;
`

const TextField = ({ label, hint, value, onChange, placeholder, secureTextEntry }) => (
  <View>
    <Label>{ label }</Label>
    { hint && <Hint>{ hint }</Hint> }
    <Input
      value={ value }
      onChangeText={ onChange }
      placeholder={ placeholder }
      secureTextEntry={ secureTextEntry }
      underlineColorAndroid='transparent'
    />
  </View>
)

export default TextField

