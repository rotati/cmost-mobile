import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { pickBy }           from 'lodash'
import FormList             from '../../components/form/FormList'
import Container            from '../../components/common/Container'
import ResponseActions      from '../../redux/ResponseReducer'

class ViewFormContainer extends Component {
  componentDidMount() {
    this.props.fetchResponses()
  }

  onPress = (id) => {
    const { navigation, responses } = this.props
    const formId = responses[id].formId

    navigation.navigate('DisplayAnswer', { id, formId })
  }

  render() {
    return (
      <Container>
        <FormList
          dataSource={ Object.values(this.props.responses) }
          onPress={ (id) => this.onPress(id) }
        />
      </Container>
    )
  }
}

const submittedResponses = (responses) => pickBy(responses, (response, key) => response.submitted)

const mapStateToProps = (state) => ({
  responses: submittedResponses(state.responses.data)
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  fetchResponses: () => dispatch(ResponseActions.fetchResponsesRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewFormContainer)
