import React, { Component } from 'react'
import Icon                 from 'react-native-vector-icons/FontAwesome'
import _                    from 'lodash'
import { connect }          from 'react-redux'
import Immutable            from 'seamless-immutable'
import Card                 from '../../components/common/Card'
import ResponseActions      from '../../redux/ResponseReducer'
import FormActions          from '../../redux/FormReducer'

// Form Builder Component
import TextField            from '../../components/common/TextField'
import Location             from '../../components/common/Location'
import Emotional            from '../../components/common/Emotional'
import FormPicker           from '../../components/common/FormPicker'
import DateTimePicker       from '../../components/common/DateTimePicker'
import DatePicker           from '../../components/common/DatePicker'
import TimePicker           from '../../components/common/TimePicker'
import MapSelect            from '../../components/common/MapSelect'
import MultipleSelect       from '../../components/common/MultipleSelect'
import * as Components      from './components'

import { Text, TouchableOpacity } from 'react-native'


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
      currentPage: 1,
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
        <Icon name='save' size={25} color='#fff' style={{ marginRight: 15 }} />
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

  renderQuestion = (question, key) => {
    const { response, form } = this.state
    const { answers }        = response
     const answer            = answers[question.id] || {}

    switch(question.type) {
      case 'text': return (
        <TextField
          key={ key } 
          value={ answer.value }
          label={ question.title }
          onChange={ (answer) => this.handleAnswerChange(question.id, { value: answer }) }
          hint={ question.hint }
        />
      )
      case 'integer': return (
        <TextField
          key={ key } 
          value={ answer.value }
          label={ question.title }
          onChange={ (answer) => this.handleAnswerChange(question.id, { value: answer }) }
          hint={ question.hint }
          number
        />
      )
      case 'location': return (
        <Location
          key={ key } 
          coordinate={ answer.value }
          label={ question.title }
          onChange={ (answer) => this.handleAnswerChange(question.id, { value: answer }) }
          hint={ question.hint }
        />
      )
      case 'select_one':
        if (question.options.geographic && question.options.allow_coordinates) {
          return (
            <MapSelect
              key={ key }
              options={ question.options }
              value={ answer.option_node_id }
              label={ question.title }
              hint={ question.hint }
              formId={ form.id }
              questionId={ question.id }
              canChooseOnce={ question.choose_once }
              responseId={ this.props.navigation.getParam('id') }
              onChange={ (answer) => this.handleAnswerChange(question.id, { option_node_id: answer }) }
            />
          )
        } else {
          return (
            <FormPicker
              key={ key } 
              value={ answer.option_node_id }
              label={ question.title }
              onChange={ (answer) => this.handleAnswerChange(question.id, { option_node_id: answer }) }
              hint={ question.hint }
              options={ question.options.data }
            />
          )
        }
      case 'long_text': return (
        <TextField
          key={ key } 
          value={ answer.value }
          label={ question.title }
          onChange={ (answer) => this.handleAnswerChange(question.id, { value: answer }) }
          hint={ question.hint }
          multiline
        />
      )
      case 'emotional': return (
        <Emotional
          key={ key } 
          value={ answer.value }
          label={ question.title }
          onChange={ (answer) => this.handleAnswerChange(question.id, { value: answer }) }
          hint={ question.hint }
        />
      )
      case 'datetime': return (
        <DateTimePicker
          key={ key }
          label={ question.title }
          hint={ question.hint }
          onChange={ (answer) => this.handleAnswerChange(question.id, answer) }
          value={ answer }
        />
      )
      case 'date': return (
        <DatePicker
          key={ key }
          label={ question.title }
          hint={ question.hint }
          onChange={ (answer) => this.handleAnswerChange(question.id, answer) }
          value={ answer }
        />
      )
      case 'time': return (
        <TimePicker
          key={ key }
          label={ question.title }
          hint={ question.hint }
          onChange={ (answer) => this.handleAnswerChange(question.id, answer) }
          value={ answer }
        />
      )
      case 'select_multiple': return (
        <MultipleSelect
          key={ key }
          label={ question.title }
          hint={ question.hint }
          onChange={ (answer) => this.handleAnswerChange(question.id, answer) }
          value={ answer }
          options={ question.options.data }
        />
      )

      default: return (<Text>This type of question is not supported yet.</Text>)
    }
  }

  render() {
    const { questions, currentPage, response } = this.state
    const page        = questions[currentPage]
    let renderQuestions = []

    if (page.type === 'Question') {
      question = page.data
      renderQuestions = this.renderQuestion(question)
    } else {
      questionings = page.data
      renderQuestions = _.map(questionings, (question, index) => this.renderQuestion(question, index))
    }

    return (
      <Components.Container>
        <Components.QuestionWrapper>
          <Components.QuestionPage isGroup={ page.data.length > 1 } groupTitle={ page.name }>
            { renderQuestions }
          </Components.QuestionPage>
        </Components.QuestionWrapper>
        {
          this.state.currentPage !== 1 && 
          <Components.PreviousPageButton onPress={ () => this.setState({ currentPage: this.state.currentPage - 1 }) }>
            <Icon name='chevron-left' color='#fff' size={20}/>
          </Components.PreviousPageButton>
        }
        {
          this.state.currentPage !== this.state.numberOfPages &&
          <Components.NextPageButton onPress={ () => this.setState({ currentPage: this.state.currentPage + 1 }) }>
            <Icon name='chevron-right' color='#fff' size={20} style={{ marginLeft: 5 }}/>
          </Components.NextPageButton>
        }
      </Components.Container>
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
