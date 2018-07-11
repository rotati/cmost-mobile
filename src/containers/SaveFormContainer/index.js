import React, { Component } from 'react'
import { ScrollView, Text, TextInput, View, TouchableOpacity, Picker } from 'react-native'
import Card from '../../components/common/Card'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CheckBox } from 'react-native-elements'
import Container from '../../components/common/Container'
import styled from 'styled-components'

export default class SaveFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formName: '',
      finalize: false
    }
  }
  
  handleSave = () => {
    alert('Success')
    this.props.navigation.navigate('Home')
  }

  onFinalizeCheck = () => {
    const { finalize } = this.state
    this.setState({ finalize: !finalize })
  }

  render() {
    return (
      <Container>
        <Card>
          <Label>Please input form name</Label>
          <Input
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
          />
          <CheckBoxWrapper>
            <CheckBox
              containerStyle={{ backgroundColor: '#fff', padding: 0, borderWidth: 0, marginLeft: 0, marginRight: 0, marginBottom: 10 }}
              checked={ this.state.finalize }
              onPress={ () => this.onFinalizeCheck() }
            />
            <CheckBoxLabel>Mark form as finalize</CheckBoxLabel>
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
