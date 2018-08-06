import { put, call }            from 'redux-saga/effects'
import { DownloadFormTypes }    from '../redux/DownloadFormReducer'
import Database                 from '../config/Database'
import axios                    from 'axios'

export function* downloadForms() {
  const ENDPOINT = 'https://cmost.rotati.tech/api/v2/m/demo/forms'
  // const ENDPOINT = 'http://192.168.0.129:3000/api/v2/m/education/forms'
  try {
    //13f2cb87cac3be8486dd0ce8b680581d Local API KEY
    //b6c5320797ce0404c5d4f8350b01e36b Staging API KEY
    const result = yield call(axios.get, ENDPOINT, { headers: { 'Authorization': 'Token b6c5320797ce0404c5d4f8350b01e36b'} })

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