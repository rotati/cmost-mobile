import React, { Component } from 'react'
import DateTimePicker       from 'react-native-modal-datetime-picker'
import styled               from 'styled-components'
import moment               from 'moment'
import _                    from 'lodash'

import { TouchableOpacity, Text } from 'react-native'

export default class DatePicker extends Component {
  constructor(props) {
    super(props)
    const date = props.value || {}

    this.state = {
      showDateModal: false,
      date: {
        "date_value(1i)": date["date_value(1i)"],
        "date_value(2i)": date["date_value(2i)"],
        "date_value(3i)": date["date_value(3i)"],
      },
      showPlaceholder: _.isEmpty(date),
    }
  }

  handleDatePicked = (date) => {
    const formattedDate = {
      "date_value(1i)": moment(date).format("YYYY"),
      "date_value(2i)": moment(date).format("MM"),
      "date_value(3i)": moment(date).format("DD")
    }

    this.setState({ 
      showDateModal: false,
      showPlaceholder: false,
      date: formattedDate
    })

    this.props.onChange(formattedDate)
  }

  displayDate = () => {
    const { date } = this.state
    const dateInString = date["date_value(1i)"] + ' ' + date["date_value(2i)"] + ' ' + date["date_value(3i)"]
    return moment(dateInString, 'YYYY MM DD').format('MMM DD, YYYY')
  }

  render () {
    const { label, hint } = this.props
    const { showPlaceholder }  = this.state

    return (
      <Wrapper>
        { label && <Label>{ label }</Label> }
        { hint && <Hint>{ hint }</Hint> }
        <TouchableOpacity onPress={ () => this.setState({ showDateModal: true }) }>
          <Input>
            {
              showPlaceholder ?
                <Placeholder>Please select date</Placeholder> :
                <Text>{ this.displayDate() }</Text>
            }
          </Input>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={ this.state.showDateModal }
          onConfirm={ (date) => this.handleDatePicked(date) }
          onCancel={ () => this.setState({ showDateModal: false }) }
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