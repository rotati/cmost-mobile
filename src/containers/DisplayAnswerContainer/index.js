import React, { Component }        from 'react'
import { connect }                 from 'react-redux'
import { View, Image, Dimensions } from 'react-native'
import { isEmpty, map, forEach }   from 'lodash'
import styled                      from 'styled-components'
import moment                      from 'moment'
import FormActions                 from '../../redux/FormReducer'
import Card                        from '../../components/common/Card'
import Container                   from '../../components/common/Container'
import Video                       from '../../components/common/VideoPlayer'

class AnswerDetailContainer extends Component {
  state = {
    answers: {},
    questions: {}
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.forms)) return

    const formId       = nextProps.navigation.getParam('formId')
    const form         = nextProps.forms.filter((form) => form.id === formId)[0]
    const questionings = form.questions
    this.setState({ questionings })
  }

  componentDidMount() {
    const { responses, navigation } = this.props
    const id      = navigation.getParam('id')
    const answers = responses[id].answers

    this.setState({ answers })
    this.props.fetchForms()
  }

  renderResponse = () => {
    const { questionings, answers } = this.state
    let questions = []

    forEach(questionings, (questioning, index) => {
      if (questioning.type === 'Question') {
        const question = questioning.data
        const answer   = answers[question.id]
        const questionView = this.renderQuestion(question, answer)

        questions.push(questionView)
      } else {
        const questionsGroup = questioning.data
        const questionsView  = map(questionsGroup, (question, index) => {
          const answer = answers[question.id]
          return this.renderQuestion(question, answer)
        })

        questions.push(questionsView)
      }
    })

    return questions
  }

  renderQuestion = (question, answer) => {
    if (question.type === 'image' || question.type === 'video') {
      return (
        <MediaWrapper key={ question.id }>
          <Question>{ question.title }</Question>
          { this.castAnswer(question, answer) }
        </MediaWrapper>
      )
    } else {
      return (
        <View key={ question.id }>
          <Question>{ question.title }</Question>
          <Answer>{ this.castAnswer(question, answer) }</Answer>
        </View>
      )
    }
  }

  castAnswer = (question, answer) => {
    if (!answer) return ''

    switch(question.type) {
      case 'select_one':
        const options        = Object.values(question.options.data)
        const selectedOption = options.filter(option => option.value === answer.option_node_id)[0]
        return selectedOption ? selectedOption.label : ''
      
      case 'datetime':
        const dateTime =  answer["datetime_value(1i)"] + ' ' + 
                          answer["datetime_value(2i)"] + ' ' +
                          answer["datetime_value(3i)"] + ' ' +
                          answer["datetime_value(4i)"] + ':' +
                          answer["datetime_value(5i)"]
        return moment(dateTime, 'YYYY MM DD kk:mm').format('MMM DD, YYYY hh:mm A')
      
      case 'date':
        const date =  answer["date_value(1i)"] + ' ' +
                      answer["date_value(2i)"] + ' ' +
                      answer["date_value(3i)"]
        return moment(date, 'YYYY MM DD').format('MMM DD, YYYY')
      
      case 'time':
        const time = answer["time_value(4i)"] + ':' + answer["time_value(5i)"]
        return moment(time, 'kk:mm').format('hh:mm A')

      case 'image':
        return (
          <ImageWrapper>
            <ImagePreviewer
              source={{ uri: answer.uri }}
              resizeMode='contain'
            />
          </ImageWrapper>
        )

      case 'video':
        return <Video uri={ answer.uri } />
      
      default: return answer.value
    }
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <Card>
            { this.renderResponse() }
          </Card>
          </ScrollView>
      </Container>
    )
  }
}

const ScrollView = styled.ScrollView`
  flex: 1;
`

const Question = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
`

const Answer = styled.Text`
  font-style: italic;
  margin-bottom: 20px;
`

const ImageWrapper = styled.View`
  margin-top: 15px;
  border-color: #ddd;
  border-width: 1px;
`

const ImagePreviewer = styled(Image)`
  height: ${ (Dimensions.get('window').width - 40) };
  flex: 1;
  width: null;
`

const MediaWrapper = styled.View`
  margin-bottom: 20px;
`

const mapStateToProps = (state) => ({
  responses: state.responses.data,
  forms: state.forms.data
})

const mapDispatchToProps = (dispatch) => ({
  fetchForms: () => dispatch(FormActions.fetchFormsRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AnswerDetailContainer)
