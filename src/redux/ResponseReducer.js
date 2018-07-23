import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const InitailState = Immutable({
  data: {},
  error: {},
  loading: false,
  success: false
})

const { Types, Creators } = createActions({
  createResponseRequest: ['params'],
  createResponseSuccess: ['data'],
  createResponseFail:    ['error'],

  updateResponseRequest: ['params'],
  updateResponseSuccess: ['data'],
  updateResponseFail:    ['error'],

  fetchResponsesRequest: null,
  fetchResponsesSuccess: ['data'],
  fetchResponsesFail:    ['error'],
})

export default Creators
export const ResponseTypes = Types

export const createResponseRequest = (state) => ( state.set('loading', true) )
export const createResponseSuccess = (state, { data }) => (
  state.setIn(['data', data.id], data)
       .set('loading', false)
       .set('success', true)
)

export const createResponseFail   = (state, { error }) => (
  state.set('error', error)
       .set('loading', false)
       .set('success', false)
)

export const updateResponseRequest = (state) => ( state.set('loading', true) )
export const updateResponseSuccess = (state, { data }) => (
  state.setIn(['data', data.id], data)
       .set('loading', false)
       .set('success', true)
)

export const updateResponseFail   = (state, { error }) => (
  state.set('error', error)
       .set('loading', false)
       .set('success', false)
)

export const fetchResponsesRequest = (state) => ( state.set('loading', true) )
export const fetchResponsesSuccess = (state, { data }) => (
  state.set('data', data)
       .set('loading', false)
       .set('success', true)
)

export const fetchResponsesFail   = (state, { error }) => (
  state.set('error', error)
       .set('loading', false)
       .set('success', false)
)

export const ResponseReducer = createReducer(InitailState, {
  [Types.CREATE_RESPONSE_REQUEST]: createResponseRequest,
  [Types.CREATE_RESPONSE_SUCCESS]: createResponseSuccess,
  [Types.CREATE_RESPONSE_FAIL]:    createResponseFail,

  [Types.UPDATE_RESPONSE_REQUEST]: updateResponseRequest,
  [Types.UPDATE_RESPONSE_SUCCESS]: updateResponseSuccess,
  [Types.UPDATE_RESPONSE_FAIL]:    updateResponseFail,

  [Types.FETCH_RESPONSES_REQUEST]: fetchResponsesRequest,
  [Types.FETCH_RESPONSES_SUCCESS]: fetchResponsesSuccess,
  [Types.FETCH_RESPONSES_FAIL]:    fetchResponsesFail,
})