import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const InitailState = Immutable({
  data: [],
  error: {},
  loading: false,
  success: false,
  updatedIds: []
})

const { Types, Creators } = createActions({
  downloadFormsRequest: null,
  downloadFormsSuccess: ['data'],
  downloadFormsFail:    ['error'],

  saveFormLocalRequest: ['form'],
  saveFormLocalSuccess: ['id'],
  saveFormLocalFail: ['error'],
})

export default Creators
export const DownloadFormTypes = Types

export const downloadFormsRequest = (state) => ( state.set('loading', true) )
export const downloadFormsSuccess = (state, { data }) => (
  state.set('data', data)
       .set('loading', false)
       .set('success', true)
)

export const downloadFormsFail   = (state, { error }) => (
  state.set('error', error)
       .set('loading', false)
       .set('success', false)
)

export const saveFormLocalRequest = (state) => ( state.set('loading', true) )
export const saveFormLocalSuccess = (state, { id }) => (
  state.set('updatedIds', [...state.updatedIds, id])
       .set('loading', false)
       .set('success', true)
)

export const saveFormLocalFail   = (state, { error }) => (
  state.set('error', error)
       .set('loading', false)
       .set('success', false)
)

export const DownloadFormReducer = createReducer(InitailState, {
  [Types.DOWNLOAD_FORMS_REQUEST]: downloadFormsRequest,
  [Types.DOWNLOAD_FORMS_SUCCESS]: downloadFormsSuccess,
  [Types.DOWNLOAD_FORMS_FAIL]:    downloadFormsFail,

  [Types.SAVE_FORM_LOCAL_REQUEST]: saveFormLocalRequest,
  [Types.SAVE_FORM_LOCAL_SUCCESS]: saveFormLocalSuccess,
  [Types.SAVE_FORM_LOCAL_FAIL]: saveFormLocalFail,
})