import React, { Component } from 'react'
import { ScrollView, Text, TextInput, View, TouchableOpacity, Picker } from 'react-native'
import Card from '../components/Card'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CheckBox } from 'react-native-elements'

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
    this.props.navigation.navigate('MainMenu')
  }

  onFinalizeCheck = () => {
    const { finalize } = this.state
    this.setState({ finalize: !finalize })
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <Card>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Please input form name</Text>
          <TextInput
            style={{borderColor: '#ddd', borderWidth: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, marginBottom: 10}}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
          />
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              containerStyle={{ backgroundColor: '#fff', padding: 0, borderWidth: 0, marginLeft: 0, marginRight: 0, marginBottom: 10 }}
              checked={ this.state.finalize }
              onPress={ () => this.onFinalizeCheck() }
            />
            <Text style={{ paddingTop: 7 }}>Mark form as finalize</Text>
          </View>
          <TouchableOpacity onPress={ () => this.handleSave() } style={{ width: '100%', padding: 10, backgroundColor: 'blue', alignItems: 'center', borderRadius: 5}}><Text style={{ color: '#fff', fontSize: 15}}>Save</Text></TouchableOpacity>
        </Card>
      </ScrollView>
    );
  }
}
