import React, { Component } from 'react'
import { ScrollView, Text, TextInput, View, TouchableOpacity, Picker } from 'react-native'
import Card from '../components/Card'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class DownloadFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      gender: '',
      dateOfBirth: '',
    }
  }

  static navigationOptions = ({ navigation }) => ({ 
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.onSave() } >
        <Icon name='save' size={25} color='#fff' style={{ marginRight: 15 }}/>
      </TouchableOpacity>
    ),
  })
  
  handleSave = () => {
    alert('Success')
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.handleSave })
  }
  render() {
    return (
      <ScrollView style={{ flex: 1, padding: 10}}>
        <Card>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Name</Text>
          <TextInput
            style={{borderColor: '#ddd', borderWidth: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, marginBottom: 20}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
          
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Email</Text>
          <TextInput
            style={{borderColor: '#ddd', borderWidth: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, marginBottom: 20}}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          
        </Card>
      </ScrollView>
    );
  }
}
