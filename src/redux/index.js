import { combineReducers }        from 'redux'
import { FormReducer }            from './FormReducer'
import { ResponseReducer }        from './ResponseReducer'
import { SubmitResponseReducer }  from './SubmitResponseReducer'

const rootReducer = combineReducers({
  forms: FormReducer,
  responses: ResponseReducer,
  submitResponses: SubmitResponseReducer,
})

export default rootReducer