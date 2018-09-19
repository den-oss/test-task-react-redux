//import { combineReducers } from 'redux'
import * as ActionTypes from '../actions'
//import merge from 'lodash/merge'
import React from 'react'
import { notification, Icon } from 'antd';

const profileReducer = (state = {
  isFetching: false,
  isSaving: false,
  errorMessage: null,
  profile: null
}, action) => {
  let newState = {...state};

  switch (action.type) {
    case ActionTypes.RESET_ERROR_MESSAGE:
      newState.errorMessage = null;
    break;
    case ActionTypes.GET_PROFILE_REQUEST:
      newState.isFetching = true;
    break;
    case ActionTypes.SAVE_PROFILE_REQUEST:
      newState.isSaving = true;
    break;
    case ActionTypes.GET_PROFILE_SUCCESS:
      newState.isFetching = false;
      newState.errorMessage = null;
      newState.profile = action.response;
    break;
    case ActionTypes.GET_PROFILE_FAILURE:
      newState.isFetching = false;
      newState.errorMessage = action.error;
      newState.profile = action.response;
    break;
    case ActionTypes.SAVE_PROFILE_SUCCESS:
      newState.isSaving = false;
      newState.errorMessage = null;
      newState.profile = action.response;

  notification.open({
    message: 'Profile saved',
    icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
  });

    break;
    case ActionTypes.SAVE_PROFILE_FAILURE:
      newState.isSaving = false;
      newState.errorMessage = action.error;
      newState.profile = action.response;
    break;
    default:
    break;
  }

  return newState;
}

export default profileReducer

