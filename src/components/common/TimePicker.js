import React, { Component } from 'react'
import DateTimePicker       from 'react-native-modal-datetime-picker'
import styled               from 'styled-components'
import moment               from 'moment'
import _                    from 'lodash'

import { TouchableOpacity, Text } from 'react-native'

export default class TimePicker extends Component {
  constructor(props) {
    super(props)
    const time = props.value || {}

    this.state = {
      showTimeModal: false,
      time: {
        "time_value(1i)": "1",
        "time_value(2i)": "1",
        "time_value(3i)": "1",
        "time_value(4i)": time["time_value(4i)"],
        "time_value(5i)": time["time_value(5i)"],
        "time_value(6i)": "0",
      },
      showPlaceholder: _.isEmpty(time),
    }
  }

  handleTimePicked = (time) => {
    const formattedTime = {
      "time_value(1i)": "1",
      "time_value(2i)": "1",
      "time_value(3i)": "1",
      "time_value(4i)": moment(time).format("kk"),
      "time_value(5i)": moment(time).format("mm"),
      "time_value(6i)": "0",
    }

    this.setState({ 
      showTimeModal: false,
      showPlaceholder: false,
      time: formattedTime
    })

    this.props.onChange(formattedTime)
  }

  displayTime = () => {
    const { time } = this.state
    const timeInString = time["time_value(4i)"] + ':' + time["time_value(5i)"]
    return moment(timeInString, 'kk:mm').format('hh:mm A')
  }

  render () {
    const { label, hint } = this.props
    const { showPlaceholder }  = this.state

    return (
      <Wrapper>
        { label && <Label>{ label }</Label> }
        { hint && <Hint>{ hint }</Hint> }
        <TouchableOpacity onPress={ () => this.setState({ showTimeModal: true }) }>
          <Input>
            {
              showPlaceholder ?
                <Placeholder>Please select time</Placeholder> :
                <Text>{ this.displayTime() }</Text>
            }
          </Input>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={ this.state.showTimeModal }
          onConfirm={ (time) => this.handleTimePicked(time) }
          onCancel={ () => this.setState({ showTimeModal: false }) }
          mode='time'
        />
      </Wrapper>
    )
  }
}

const Wrapper = styled.View`
  flex: 1
`

const Label = styled.Text`
  font-weight: bold;
  margin-bottom: 5;
`

const Input = styled.View`
  border-color: #ddd;
  border-width: 1px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 10;
`

const Placeholder = styled.Text`
  color: #ddd;
`

const Hint = styled.Text`
  font-style: italic; 
  margin-bottom: 10;
`