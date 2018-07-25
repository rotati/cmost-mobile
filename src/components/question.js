import React, { Component } from 'react'
import TextField from './common/TextField'
import Location  from './common/Location'
import Emotional from './common/Emotional'
import FormPicker from './common/FormPicker'

class Question extends Component {
  render() {
    const { type, label, hint, onChange, value, options } = this.props

    switch (type) {
      case 'text': return (
        <TextField label={ label } hint={ hint } onChange={ onChange } value={ value } />
      )
      case 'location': return (
        <Location label={ label } hint={ hint } coordinate={ value } onChange={ onChange } />
      )

      case 'emotional': return (
        <Emotional label={ label } hint={ hint } onChange={ onChange } value={ value } />
      )

      case 'select_one': return (
        <FormPicker label={ label } hint={ hint } onChange={ onChange } value={ value } options={ options } />
      )

      case 'integer': return (
        <TextField label={ label } hint={ hint } onChange={ onChange } value={ value } number />
      )

      case 'long_text': return (
        <TextField label={ label } hint={ hint } onChange={ onChange } value={ value } multiline />
      )

      default: return null
    }
  }
}

export default Question