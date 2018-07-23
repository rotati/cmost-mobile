import React, { Component } from 'react'
import { connect }          from 'react-redux'
import FormList             from '../../components/form/FormList'
import Container            from '../../components/common/Container'

class EditFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      responses: this.props.responses
    }
  }

  onPress = (id) => {
    const { navigation } = this.props
    const { responses }  = this.state
    const response       = responses.filter((response) => response.id === id)[0]

    navigation.navigate('FormBuilder', { 
      id: response.id,
      action: 'Update',
      formId: response.formId
    })
  }

  render() {
    return (
      <Container>
        <FormList
          dataSource={ this.state.responses }
          onPress={ (id) => this.onPress(id) }
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    responses: Object.values(state.responses.data)
  }
}

export default connect(mapStateToProps, null)(EditFormContainer)
