import React, { Component } from 'react'
import { connect }          from 'react-redux'
import FormList             from '../../components/form/FormList'
import Container            from '../../components/common/Container'

import _ from 'lodash'

class FillFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forms: props.forms
    }
  }

  onPress = (id) => {
    const { navigation } = this.props

    navigation.navigate('FormBuilder', {
      formId: id,
      action: 'Create'
    })
  }

  render() {
    return (
      <Container>
        <FormList
          dataSource={ this.state.forms }
          onPress={ (id) => this.onPress(id) }
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    forms: state.forms.data
  }
}

export default connect(mapStateToProps, null)(FillFormContainer)
