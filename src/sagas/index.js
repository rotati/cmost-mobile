import { takeLatest, takeEvery, all } from 'redux-saga/effects'

import { createResponse, fetchResponses, updateResponse } from './ResponseSaga'
import { downloadForms, saveLocally }  from './DownloadFormSaga'
import { fetchForms }     from './FormSaga'
import { submitResponse } from './SubmitResponseSaga'

import { ResponseTypes }        from '../redux/ResponseReducer'
import { FormTypes }            from '../redux/FormReducer'
import { SubmitResponseTypes }  from '../redux/SubmitResponseReducer'
import { DownloadFormTypes }    from '../redux/DownloadFormReducer'

export default function* root() {
  yield all([
    takeLatest(ResponseTypes.FETCH_RESPONSES_REQUEST, fetchResponses),
    takeLatest(ResponseTypes.CREATE_RESPONSE_REQUEST, createResponse),
    takeLatest(ResponseTypes.UPDATE_RESPONSE_REQUEST, updateResponse),
    takeLatest(FormTypes.FETCH_FORMS_REQUEST, fetchForms),
    takeEvery(SubmitResponseTypes.REQUEST_SUBMIT, submitResponse),
    takeLatest(DownloadFormTypes.DOWNLOAD_FORMS_REQUEST, downloadForms),
    takeEvery(DownloadFormTypes.SAVE_FORM_LOCAL_REQUEST, saveLocally)
  ])
}
