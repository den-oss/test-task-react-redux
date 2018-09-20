import { CALL_API, Schemas } from '../middleware/api'

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST'
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE'

export const SAVE_PROFILE_REQUEST = 'SAVE_PROFILE_REQUEST'
export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS'
export const SAVE_PROFILE_FAILURE = 'SAVE_PROFILE_FAILURE'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'


const _fetchProfile = login => ({
  [CALL_API]: {
    types: [ GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE ],
    endpoint: `/profile`,
    schema: Schemas.PROFILE
  }
})

export const fetchProfile = () => (dispatch) => {
  return dispatch(_fetchProfile())
}


const _saveProfile = (profile) => ({
  [CALL_API]: {
    types: [ SAVE_PROFILE_REQUEST, SAVE_PROFILE_SUCCESS, SAVE_PROFILE_FAILURE ],
    endpoint: `/profile`,
    opts: {
      method: 'PUT',
      body: {
          profile: profile
      },
    },
    schema: Schemas.PROFILE
  }
})

export const saveProfile = (profile) => (dispatch) => {
  return dispatch(_saveProfile(profile))
}

const _resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})

export const resetErrorMessage = () => (dispatch) => {
  return dispatch(_resetErrorMessage())
};