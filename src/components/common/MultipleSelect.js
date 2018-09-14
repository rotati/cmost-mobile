import React, { Component }    from 'react'
import styled   from 'styled-components'
import { CheckBox } from 'react-native-elements'
import { View } from 'react-native'
import { forEach, transform } from 'lodash'

export default class MultipleSelect extends Component {
  onPress = (key) => {
    const { options }   = this.props
    let selectedOptions = this.getAllSelectedOptions()
    
    if (selectedOptions.includes(key)) {
      selectedOptions = selectedOptions.filter((option_node_id) => option_node_id !== key )
    } else {
      selectedOptions.push(key)
    }

    const formattedResult = transform(options, (result, option, index) => {
      result[index] = {
        option_node_id: option.value,
        checked: selectedOptions.includes(option.value)
      }
    }, {})

    this.props.onChange({ choices_attributes: formattedResult })
  }

  getAllSelectedOptions = () => {
    const { value }     = this.props
    let selectedOptions = []

    forEach(value.choices_attributes, (option, index) => {
      if (option.checked === true) selectedOptions.push(option.option_node_id)
    })

    return selectedOptions
  }

  render() {
    const { label, hint, value, options } = this.props
    const selectedOptions = this.getAllSelectedOptions()

    return (
      <View>
        <Label>{ label }</Label>
        { hint && <Hint>{ hint }</Hint> }
        {
          options.map((option, index) => (
            <CheckBoxWrapper key={ index }>
              <CheckBox
                containerStyle={{ backgroundColor: '#fff', padding: 0, borderWidth: 0, marginLeft: 0, marginRight: 0, marginBottom: 10 }}
                checked={ selectedOptions.includes(option.value) }
                onPress={ () => this.onPress(option.value) }
              />
              <CheckBoxLabel>{ option.label }</CheckBoxLabel>
            </CheckBoxWrapper>
          ))
        }
      </View>
    )
  }
}

const Label = styled.Text`
  font-weight: bold;
  margin-bottom: 5;
`

const Hint = styled.Text`
  font-style: italic; 
  margin-bottom: 20;
`

const CheckBoxWrapper = styled.View`
  flex-direction: row;
`

const CheckBoxLabel = styled.Text`
  padding-top: 7px;
`

