import React, { Component } from 'react'
import { ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native'
import Card from '../../components/common/Card'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'

export default class DownloadFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: JSON.parse(props.navigation.getParam('form')),
      action: props.navigation.getParam('action'),
      numberOfQuestions: props.navigation.getParam('numberOfQuestions'),
      currentQuestion: 0,
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
    this.props.navigation.navigate('SaveForm', { form: JSON.stringify(this.state.form) })
  }

  handleAnswerChange = (answer) => {
    let { form, currentQuestion } = this.state
    const questions = JSON.parse(form.questions)
    questions[currentQuestion].value = answer
    form.questions = JSON.stringify(questions)

    this.setState({ form })
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.handleSave })
  }
  render() {
    const form = this.state.form
    const question = JSON.parse(form.questions)[this.state.currentQuestion]

    return (
      <View style={{flex: 1}}>
        <ScrollView style={{ flex: 1, padding: 10 }}>
          <Card>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{ question.title }</Text>
            { question.hint &&
              <Text style={{ fontStyle: 'italic', marginBottom: 10 }}>{ question.hint }</Text>
            }
            <Text style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 5 }}>Your Answer</Text>
            <TextInput
              style={{borderColor: '#ddd', borderWidth: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, marginBottom: 20, height: 150}}
              onChangeText={(answer) => this.handleAnswerChange(answer) }
              value={ question.value }
              multiline={true}
              numberOfLines={10}
            />
          </Card>
        </ScrollView>
        {
          this.state.currentQuestion !== 0 && 
          <TouchableOpacity onPress={ () => this.setState({ currentQuestion: this.state.currentQuestion - 1 }) } style={{ width: 45, height: 45, borderRadius: 40, backgroundColor: '#2196F3', alignItems: 'center', justifyContent: 'center', shadowOffset:{  width: 3,  height: 3 }, shadowColor: 'black', shadowOpacity: 0.3, position: 'absolute', bottom: 20, left: 20 }}>
            <Icon name='chevron-left' color='#fff' size={20}/>
          </TouchableOpacity>
        }
        {
          this.state.currentQuestion !== (this.state.numberOfQuestions - 1) &&
          <TouchableOpacity onPress={ () => this.setState({ currentQuestion: this.state.currentQuestion + 1 }) } style={{ width: 45, height: 45, borderRadius: 40, backgroundColor: '#2196F3', alignItems: 'center', justifyContent: 'center', shadowOffset:{  width: 3,  height: 3 }, shadowColor: 'black', shadowOpacity: 0.3, position: 'absolute', bottom: 20, right: 20 }}>
            <Icon name='chevron-right' color='#fff' size={20} style={{ marginLeft: 5 }}/>
          </TouchableOpacity>
        }
      </View>
    );
  }
}
