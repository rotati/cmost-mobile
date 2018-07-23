import React    from 'react'
import styled   from 'styled-components'
import Icon     from 'react-native-vector-icons/FontAwesome'
import { View, TouchableOpacity } from 'react-native'

const Label = styled.Text`
  font-weight: bold;
  margin-bottom: 5;
`

const Hint = styled.Text`
  font-style: italic; 
  margin-bottom: 20;
`

const IconWapper = styled.View`
  justify-content: space-around;
  flex-direction: row;
`

const Emotional = ({ label, hint, value, onChange }) => (
  <View>
    <Label>{ label }</Label>
    { hint && <Hint>{ hint }</Hint> }
    <IconWapper>
      <TouchableOpacity onPress={ () => onChange('Very Happy') }>
        <Icon
          name='smile-o'
          size={70}
          color={ value === 'Very Happy' ? 'green' : 'black' }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onChange('Happy') }>
        <Icon
          name='meh-o'
          size={70}
          color={ value === 'Happy' ? 'orange' : 'black' }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => onChange('Not Happy') }>
        <Icon
          name='frown-o'
          size={70}
          color={ value === 'Not Happy' ? 'red' : 'black' }
        />
      </TouchableOpacity>
    </IconWapper>
  </View>
)

export default Emotional

