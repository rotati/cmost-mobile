import React, { Component } from 'react'
import { ScrollView, Text, TextInput, View, TouchableOpacity, Picker } from 'react-native'
import Card from '../components/Card'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class DownloadFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.navigation.getParam('title'),
      hint: this.props.navigation.getParam('hint'),
      answer: this.props.navigation.getParam('answer') || '',
      isFirst: this.props.navigation.getParam('isFirst'),
      isLast: this.props.navigation.getParam('isLast')
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
    this.props.navigation.navigate('SaveForm')
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.handleSave })
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{ flex: 1, padding: 10 }}>
          <Card>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{ this.state.title }</Text>
            <Text style={{ fontStyle: 'italic', marginBottom: 10 }}>{ this.state.hint }</Text>
            <Text style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 5 }}>Your Answer</Text>
            <TextInput
              style={{borderColor: '#ddd', borderWidth: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, marginBottom: 20, height: 150}}
              onChangeText={(answer) => this.setState({answer})}
              value={this.state.answer}
              multiline={true}
              numberOfLines={10}
            />
          </Card>
        </ScrollView>
        {
          !this.state.isFirst && 
          <TouchableOpacity onPress={ () => this.props.navigation.goBack() } style={{ width: 45, height: 45, borderRadius: 40, backgroundColor: '#2196F3', alignItems: 'center', justifyContent: 'center', shadowOffset:{  width: 3,  height: 3 }, shadowColor: 'black', shadowOpacity: 0.3, position: 'absolute', bottom: 20, left: 20 }}>
            <Icon name='chevron-left' color='#fff' size={20}/>
          </TouchableOpacity>
        }
        {
          !this.state.isLast &&
          <TouchableOpacity onPress={ () => this.props.navigation.push('FormDetail', { isFirst: false, isLast: true, title: 'How well-maintained are the facilities at this university?', hint: 'Please description about maintained and facilities at university' }) } style={{ width: 45, height: 45, borderRadius: 40, backgroundColor: '#2196F3', alignItems: 'center', justifyContent: 'center', shadowOffset:{  width: 3,  height: 3 }, shadowColor: 'black', shadowOpacity: 0.3, position: 'absolute', bottom: 20, right: 20 }}>
            <Icon name='chevron-right' color='#fff' size={20} style={{ marginLeft: 5 }}/>
          </TouchableOpacity>
        }
      </View>
    );
  }
}
