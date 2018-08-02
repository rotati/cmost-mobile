import React, { Component } from 'react'
import DateTimePicker       from 'react-native-modal-datetime-picker'
import { TouchableOpacity, Text } from 'react-native'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'
import styled from 'styled-components'
import moment from 'moment'
import _ from 'lodash'

export default class DateTime extends Component {
  constructor(props) {
    super(props)
    const datetime = props.value || {}

    this.state = {
      date: {
        "date_value(1i)": datetime["datetime_value(1i)"],
        "date_value(2i)": datetime["datetime_value(2i)"],
        "date_value(3i)": datetime["datetime_value(3i)"],
      },
      time: {
        "time_value(4i)": datetime["datetime_value(4i)"],
        "time_value(5i)": datetime["datetime_value(5i)"],
        "time_value(6i)": datetime["datetime_value(6i)"],
      },
      action: _.isEmpty(datetime) ? 'Create' : 'Update'
    }
  }

  handleDatePicked = (date) => {
    const { time } = this.state

    this.setState({ date })
    this.props.onChange({
      "datetime_value(1i)": date["date_value(1i)"],
      "datetime_value(2i)": date["date_value(2i)"],
      "datetime_value(3i)": date["date_value(3i)"],
      "datetime_value(4i)": time["time_value(4i)"],
      "datetime_value(5i)": time["time_value(5i)"],
      "datetime_value(6i)": time["time_value(6i)"],
    })
  }

  handleTimePicked = (time) => {
    const { date } = this.state

    this.setState({ time })
    this.props.onChange({
      "datetime_value(1i)": date["date_value(1i)"],
      "datetime_value(2i)": date["date_value(2i)"],
      "datetime_value(3i)": date["date_value(3i)"],
      "datetime_value(4i)": time["time_value(4i)"],
      "datetime_value(5i)": time["time_value(5i)"],
      "datetime_value(6i)": time["time_value(6i)"],
    })
  }

  render () {
    const { label, hint } = this.props
    const { date, time, action }  = this.state

    return (
      <Wrapper>
        <Label>{ label }</Label>
        { hint && <Hint>{ hint }</Hint> }
        <DatePicker 
          onChange={ (date) => this.handleDatePicked(date) }
          value={ action === 'Create' ? {} : this.state.date }
        />
        <TimePicker 
          onChange={ (time) => this.handleTimePicked(time) }
          value={ action === 'Create' ? {} : this.state.time }
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