import { put }           from 'redux-saga/effects'
import { ResponseTypes } from '../redux/ResponseReducer'
import Database          from '../config/Database'

export function* createResponse({ params }) {
  try {
    Database.write(() => {
      Database.create('Responses', params)
    })

    params['answers'] = JSON.parse(params.answers)

    yield put({ type: ResponseTypes.CREATE_RESPONSE_SUCCESS, data: params })
  } catch(error) {
    yield put({ type: ResponseTypes.CREATE_RESPONSE_FAIL, error: error })
  }
}

export function* updateResponse({ params }) {
  try {
    const response = Database.objects('Responses').filtered('id = $0', params.id)[0]
    Database.write(() => {
      response.name = params.name
      response.finalized = params.finalized
      response.answers = params.answers
      response.updatedAt = Date.now()
    })

    params['answers'] = JSON.parse(params.answers)

    yield put({ type: ResponseTypes.UPDATE_RESPONSE_SUCCESS, data: params })
  } catch(error) {
    yield put({ type: ResponseTypes.UPDATE_RESPONSE_FAIL, error: error })
  }
}

export function* fetchResponses() {
  try {
    const responsesObject = Database.objects('Responses')
    const responses       = serialize(responsesObject)

    yield put({ type: ResponseTypes.FETCH_RESPONSES_SUCCESS, data: responses })
  } catch(error) {
    yield put({ type: ResponseTypes.FETCH_RESPONSES_FAIL, error: error })
  }
}

const serialize = (responses) => {
  let result = {}
  responses.forEach((response) => {
    result[response.id] =  {
      id: response.id,
      name: response.name,
      formId: response.formId,
      answers: JSON.parse(response.answers),
      finalized: response.finalized,
      submitted: response.submitted,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    }
  })

  return result
}