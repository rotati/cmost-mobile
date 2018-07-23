import React, { Component } from 'react'
import { ScrollView, Text, TextInput, View, TouchableOpacity, Picker } from 'react-native'
import Card from '../../components/common/Card'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CheckBox } from 'react-native-elements'
import Container from '../../components/common/Container'
import styled from 'styled-components'
import ResponseActions from '../../redux/ResponseReducer'
import { connect }          from 'react-redux'

class SaveFormContainer extends Component {
  constructor(props) {
    super(props)

    const formId    = props.navigation.getParam('formId')
    const response  = JSON.parse(props.navigation.getParam('response'))
    const action    = props.navigation.getParam('action')

    this.state = {
      formId: formId,
      answers: response.answers,
      name: response.name,
      finalized: response.finalized || false,
      id: response.id,
      action: action
    }
  }
  
  handleSave = () => {
    const { id, formId, name, answers, finalized, action } = this.state
    const currentTime = Date.now()

    const formParams = {
      id: id || currentTime,
      name: name,
      answers: JSON.stringify(answers),
      formId: formId,
      finalized: finalized,
      submitted: false,
      createdAt: currentTime,
      updatedAt: currentTime
    }

    if(action === 'Create') {
      this.props.createForm( formParams )
    } else {
      this.props.updateForm( formParams )
    }
    this.props.navigation.navigate('Home')
  }

  onFinalizedCheck = () => {
    const { finalized } = this.state
    this.setState({ finalized: !finalized })
  }

  render() {
    return (
      <Container>
        <Card>
          <Label>Please input form name</Label>
          <Input
            onChangeText={(name) => this.setState({ name }) }
            value={ this.state.name }
            underlineColorAndroid='transparent'
          />
          <CheckBoxWrapper>
            <CheckBox
              containerStyle={{ backgroundColor: '#fff', padding: 0, borderWidth: 0, marginLeft: 0, marginRight: 0, marginBottom: 10 }}
              checked={ this.state.finalized }
              onPress={ () => this.onFinalizedCheck() }
            />
            <CheckBoxLabel>Mark form as finalized</CheckBoxLabel>
          </CheckBoxWrapper>
          <TouchableOpacity onPress={ () => this.handleSave() } style={{ width: '100%', padding: 10, backgroundColor: '#008CBA', alignItems: 'center', borderRadius: 5}}><Text style={{ color: '#fff', fontSize: 15}}>Save</Text></TouchableOpacity>
        </Card>
      </Container>
    );
  }
}

const Label = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
`

const Input = styled.TextInput`
  border-color: #ddd;
  border-width: 1px;
  padding: 10px 5px;
  margin-bottom: 10px;
`

const CheckBoxWrapper = styled.View`
  flex-direction: row;
`

const CheckBoxLabel = styled.Text`
  padding-top: 7px;
`

const mapStateToProps = (state) => {
  return {
    forms: state.forms.data
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  createForm: (params) => dispatch(ResponseActions.createResponseRequest(params)),
  updateForm: (params) => dispatch(ResponseActions.updateResponseRequest(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(SaveFormContainer)
