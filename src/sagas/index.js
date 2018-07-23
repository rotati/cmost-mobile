import { takeLatest, takeEvery, all } from 'redux-saga/effects'

import { createResponse, fetchResponses, updateResponse } from './ResponseSaga'
import { fetchForms }     from './FormSaga'
import { submitResponse } from './SubmitResponseSaga'

import { ResponseTypes }        from '../redux/ResponseReducer'
import { FormTypes }            from '../redux/FormReducer'
import { SubmitResponseTypes }  from '../redux/SubmitResponseReducer'

export default function* root() {
  yield all([
    takeLatest(ResponseTypes.FETCH_RESPONSES_REQUEST, fetchResponses),
    takeLatest(ResponseTypes.CREATE_RESPONSE_REQUEST, createResponse),
    takeLatest(ResponseTypes.UPDATE_RESPONSE_REQUEST, updateResponse),
    takeLatest(FormTypes.FETCH_FORMS_REQUEST, fetchForms),
    takeEvery(SubmitResponseTypes.REQUEST_SUBMIT, submitResponse),
  ])
}
