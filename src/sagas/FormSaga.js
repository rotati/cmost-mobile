import { put }       from 'redux-saga/effects'
import { FormTypes } from '../redux/FormReducer'
import Database      from '../config/Database'

export function* fetchForms() {
  try {
    const formsObject = Database.objects('Forms')
    const forms       = serialize(formsObject)

    yield put({ type: FormTypes.FETCH_FORMS_SUCCESS, data: forms })
  } catch(error) {
    yield put({ type: FormTypes.FETCH_FORMS_FAIL, error: error })
  }
}

const serialize = (forms) => (
  forms.map((form) => ({
    id: form.id,
    name: form.name,
    questions: JSON.parse(form.questions),
    createdAt: form.createdAt,
    updatedAt: form.updatedAt,
  }))
)