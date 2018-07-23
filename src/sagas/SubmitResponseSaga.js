import { put, call }            from 'redux-saga/effects'
import { SubmitResponseTypes }  from '../redux/SubmitResponseReducer'
import Database                 from '../config/Database'
import axios                    from 'axios'

import _ from 'lodash'

export function* submitResponse({ id }) {
  const response      = Database.objects('Responses').filtered("id = $0", id)[0]
  const form          = Database.objects('Forms').filtered("id = $0", response.formId)[0]
  const questionings  = JSON.parse(form.questions)
  const answers       = JSON.parse(response.answers)
  const questionIds   = _.map(questionings, (questioning, index) => {
    if (questioning.type === 'Question') {
      return questioning.data.id
    } else {
      return _.map(questioning.data, (question) => question.id)
    }
  })

  let answerAttr = {}
  _.forEach(_.flatten(questionIds), (qId) => {
    answerAttr[qId + '_1'] = {
      value: answers[qId],
      questioning_id: qId
    }
  })

  const responseParams = {
    form_id: form.id,
    user_id: "3891887e-f272-4fc3-a16f-d2b0cf05127b",
    incomplete: '0',
    answers_attributes: answerAttr
  }

  const ENDPOINT = 'https://cmost.rotati.tech/api/v2/m/education/responses'

  try {
    axios.defaults.headers.common['Authorization'] = 'Token b6c5320797ce0404c5d4f8350b01e36b';
    yield call(axios.post, ENDPOINT, { response: responseParams })

    Database.write(() => { response.submitted = true })
    yield put({ type: SubmitResponseTypes.SUBMIT_SUCCESS, id: id })

  } catch(error) {
    yield put({ type: SubmitResponseTypes.SUBMIT_FAIL, error })
  }
}