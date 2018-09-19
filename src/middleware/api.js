import { schema } from 'normalizr'
import { API_ROOT } from '../consts'
import rp from 'request-promise'

export const CALL_API = 'Call API'

const profileSchema = new schema.Entity('profile', {}, {
  firstName: user => user.firstName,
  lastName: user => user.lastName,
  company: user => user.company,
  department: user => user.department,
  position: user => user.position,
  email: user => user.email,
})

export const Schemas = {
  PROFILE: profileSchema,
}

const callApi = (endpoint, opts, schema) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  let rpOpts = Object.assign({}, opts, {
    uri: fullUrl,
    json: true,
  });

  return rp(rpOpts)
    .then((json) => {
      if (!json.success) {
        return Promise.reject(new Error(json.error || "Unknown error"))
      }

      return json.data
    }, (error, a, b) => {
      if (error.error) {
        let json = error.error;
        if (!json.success && json.error) {
          error.message = json.error;
        }
      }
      return Promise.reject(error);
    })
}

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, opts } = callAPI
  const { schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, opts, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}