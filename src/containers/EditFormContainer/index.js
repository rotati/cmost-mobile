import React, { Component } from 'react'
import { connect }          from 'react-redux'
import FormActions          from '../../redux/FormReducer'
import FormList             from '../../components/form/FormList'
import Container            from '../../components/common/Container'

class EditFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      responses: this.props.responses
    }
  }

  componentDidMount() {
    this.props.fetchForms()
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

const isSubmitted = (state, res) => ( res.submitted || state.submitResponses.data.includes(res.id) )

const mapStateToProps = (state) => ({
  responses: Object.values(state.responses.data).filter((res) => !isSubmitted(state, res) )
})

const mapDispatchToProps = (dispatch) => ({
  fetchForms: () => dispatch(FormActions.fetchFormsRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditFormContainer)
