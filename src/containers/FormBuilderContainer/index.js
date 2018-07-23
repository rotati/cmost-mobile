import React, { Component } from 'react'
import { ScrollView, Text, TextInput, View, TouchableOpacity, Picker, StyleSheet, Modal, Platform } from 'react-native'
import Card from '../../components/common/Card'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import ResponseActions from '../../redux/ResponseReducer'
import FormActions from '../../redux/FormReducer'
import { connect }          from 'react-redux'
import Immutable from 'seamless-immutable'
import FormPicker from '../../components/common/FormPicker'
import TextField from '../../components/common/TextField'
import Location from '../../components/common/Location'
import Emotional from '../../components/common/Emotional'

class FormBuilderContainer extends Component {
  constructor(props) {
    super(props)
    const formId    = props.navigation.getParam('formId')
    const action    = props.navigation.getParam('action')
    const form      = props.forms.filter((form) => form.id === formId)[0]
    const id        = props.navigation.getParam('id')
    const response  = Object.values(props.responses).filter((response) => response.id === id)[0]

    this.state = {
      questions: form.questions,
      form: form,
      action: action,
      currentPage: 0,
      response: response || Immutable({ answers: {} }),
      numberOfPages: _.size(form.questions),
      modalVisible: false
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static navigationOptions = ({ navigation }) => ({ 
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.onSave() } >
        <Icon name='save' size={25} color='#fff' style={{ marginRight: 15 }}/>
      </TouchableOpacity>
    ),
  })
  
  handleSave = () => {
    const { response, form, action } = this.state
    this.props.navigation.navigate('SaveForm', { 
      response: JSON.stringify(response),
      formId: form.id,
      action: action
    })
  }

  handleAnswerChange = (qId, answer) => {
    const { response } = this.state
    this.setState({ response: response.setIn(['answers', qId], answer) })
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.handleSave })
  }

  render() {
    const { questions, currentPage, response } = this.state
    const { answers } = response
    const page        = questions[currentPage]
    let renderQuestions = []

    if (page.type === 'Question') {
      question = page.data
      if (question.type === 'text') {
        renderQuestions = (<TextField
          label={ question.title }
          hint={ question.hint }
          onChange={ (answer) => this.handleAnswerChange(question.id, answer) }
          value={ answers[question.id] }
        />)
      } else if (question.type === 'location') {
        renderQuestions = (<Location
          label={ question.title }
          hint={ question.hint }
          coordinate={ answers[question.id] }
          onChange={ (answer) => this.handleAnswerChange(question.id, answer) }
        />)
      } else if (question.type === 'emotional') {
        renderQuestions = (<Emotional
          label={ question.title }
          hint={ question.hint }
          value={ answers[question.id] }
          onChange={ (answer) => this.handleAnswerChange(question.id, answer) }/>)
      }
    } else {
      questionings = page.data
      renderQuestions = _.map(questionings, (question) => {
        if(question.type === 'text') {
          return (<TextField
            label={ question.title }
            hint={ question.hint }
            onChange={ (answer) => this.handleAnswerChange(question.id, answer) }
            value={ answers[question.id] }
            key={ question.id }
          />)
        }
      })
    }


    return (
      <View style={{flex: 1}}>
        <ScrollView style={{ flex: 1, padding: 10 }}>
          <Card>
            { page.data.length > 1 &&
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30 }}>{ page.name }</Text>
            }
            { renderQuestions }
          </Card>
        </ScrollView>
        {
          this.state.currentPage !== 0 && 
          <TouchableOpacity onPress={ () => this.setState({ currentPage: this.state.currentPage - 1 }) } style={{ width: 60, height: 60, borderRadius: 60, backgroundColor: '#2196F3', alignItems: 'center', justifyContent: 'center', shadowOffset:{  width: 3,  height: 3 }, shadowColor: 'black', shadowOpacity: 0.3, position: 'absolute', bottom: 20, left: 20, elevation: 3 }}>
            <Icon name='chevron-left' color='#fff' size={20}/>
          </TouchableOpacity>
        }
        {
          this.state.currentPage !== (this.state.numberOfPages - 1) &&
          <TouchableOpacity onPress={ () => this.setState({ currentPage: this.state.currentPage + 1 }) } style={{ width: 60, height: 60, borderRadius: 60, backgroundColor: '#2196F3', alignItems: 'center', justifyContent: 'center', shadowOffset:{  width: 3,  height: 3 }, shadowColor: 'black', shadowOpacity: 0.3, position: 'absolute', bottom: 20, right: 20, elevation: 3 }}>
            <Icon name='chevron-right' color='#fff' size={20} style={{ marginLeft: 5 }}/>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    responses: state.responses.data,
    forms: state.forms.data
  }
}

export default connect(mapStateToProps, null)(FormBuilderContainer)
