import { put, call }            from 'redux-saga/effects'
import axios                    from 'axios'
import { DownloadFormTypes }    from '../redux/DownloadFormReducer'
import Database                 from '../config/Database'
import { DOWNLOAD_FORM_URL, API_KEY } from '../constants/EndPoints'

export function* downloadForms() {
  const ENDPOINT = 'https://cmost.rotati.tech/api/v2/m/demo/forms'
  try {
    const result = yield call(axios.get, DOWNLOAD_FORM_URL, { headers: { 'Authorization': 'Token ' + API_KEY} })
    yield put({ type: DownloadFormTypes.DOWNLOAD_FORMS_SUCCESS, data: result.data })
  } catch(error) {
    yield put({ type: DownloadFormTypes.DOWNLOAD_FORMS_FAIL, error })
  }
}

export function* saveLocally({ form }) {
  const currentForm = Database.objects('Forms').filtered('id = $0', form.id)[0]

  Database.write(() => {
    if (currentForm === undefined) {
      Database.create('Forms', {
        id: form.id,
        name: form.name,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        questions: JSON.stringify(form.questions)
      })
    } else {
      currentForm.name = form.name
      currentForm.updatedAt = Date.now()
      currentForm.questions = JSON.stringify(form.questions)
    }
  })
  yield put({ type: DownloadFormTypes.SAVE_FORM_LOCAL_SUCCESS, id: form.id })
}