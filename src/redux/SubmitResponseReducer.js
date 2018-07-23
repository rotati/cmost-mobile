import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const InitailState = Immutable({
  data: [],
  error: {},
  loading: false,
  success: false
})

const { Types, Creators } = createActions({
  requestSubmit: ['id'],
  submitSuccess: ['id'],
  submitFail:    ['error'],
})

export default Creators
export const SubmitResponseTypes = Types

export const requestSubmit = (state) => ( state.set('loading', true) )
export const submitSuccess = (state, { id }) => (
  state.set('data', [...state.data, id])
       .set('loading', false)
       .set('success', true)
)

export const submitFail    = (state, { error }) => (
  state.set('error', error)
       .set('loading', false)
       .set('success', false)
)

export const SubmitResponseReducer = createReducer(InitailState, {
  [Types.REQUEST_SUBMIT]: requestSubmit,
  [Types.SUBMIT_SUCCESS]: submitSuccess,
  [Types.SUBMIT_FAIL]:    submitFail,
})