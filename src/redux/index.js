import { combineReducers }        from 'redux'
import { FormReducer }            from './FormReducer'
import { ResponseReducer }        from './ResponseReducer'
import { DownloadFormReducer }    from './DownloadFormReducer'
import { SubmitResponseReducer }  from './SubmitResponseReducer'

const rootReducer = combineReducers({
  forms: FormReducer,
  responses: ResponseReducer,
  downloadForms: DownloadFormReducer,
  submitResponses: SubmitResponseReducer,
})

export default rootReducer