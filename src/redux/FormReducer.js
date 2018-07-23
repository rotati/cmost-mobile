import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const InitailState = Immutable({
  data: [],
  error: {},
  loading: false,
  success: false
})

const { Types, Creators } = createActions({
  fetchFormsRequest: null,
  fetchFormsSuccess: ['data'],
  fetchFormsFail:    ['error'],
})

export default Creators
export const FormTypes = Types

export const fetchFormsRequest = (state) => ( state.set('loading', true) )
export const fetchFormsSuccess = (state, { data }) => (
  state.set('data', data)
       .set('loading', false)
       .set('success', true)
)

export const fetchFormsFail   = (state, { error }) => (
  state.set('error', error)
       .set('loading', false)
       .set('success', false)
)

export const FormReducer = createReducer(InitailState, {
  [Types.FETCH_FORMS_REQUEST]: fetchFormsRequest,
  [Types.FETCH_FORMS_SUCCESS]: fetchFormsSuccess,
  [Types.FETCH_FORMS_FAIL]:    fetchFormsFail,
})