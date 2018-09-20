import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import configureStore from '../store/configureStore'
import enzyme, {shallow} from 'enzyme';
const store = configureStore()
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({ adapter: new Adapter() });
const timeoutPr = ms => new Promise(res => setTimeout(res, ms));

import reducer from '../reducers'
import api from '../middleware/api'
import {setupMock} from '../middleware/api_mock'
const middlewares = [thunk, api]
const mockStore = configureMockStore(middlewares)

import {
    fetchProfile, saveProfile, 
    GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, SAVE_PROFILE_REQUEST, SAVE_PROFILE_SUCCESS, GET_PROFILE_FAILURE, SAVE_PROFILE_FAILURE
} from '../actions'


describe('render', () => {

    it('renders without crashing', async () => {
        setupMock((mockRequest) => {
            return mockRequest.mock()
                .get('/api/profile')
                .respond({
                    statusCode: 200,
                    body: { success: true, data: { firstName: "denis" } }
                })
                .run();
        });

        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>, 
        div);
        ReactDOM.unmountComponentAtNode(div);
    });

})


describe('actions', () => {

    it('creates GET_PROFILE_SUCCESS when fetching profile has been done', async () => {
        setupMock((mockRequest) => {
            return mockRequest.mock()
                .get('/api/profile')
                .respond({
                    statusCode: 200,
                    body: { success: true, data: { firstName: "denis" } }
                })
                .run();
        });

        const expectedActions = [
           { type: GET_PROFILE_REQUEST },
           { type: GET_PROFILE_SUCCESS, response: { firstName: "denis" } }
        ];

        const store = mockStore({ profile: null });
        await store.dispatch(fetchProfile());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates SAVE_PROFILE_SUCCESS when saving profile has been done', async () => {
        setupMock((mockRequest) => {
            return mockRequest.mock()
                .get('/api/profile')
                .respond({
                    statusCode: 200,
                    body: { success: true, data: { firstName: "denis" } }
                })
                .run();
        });

        const expectedActions = [
           { type: SAVE_PROFILE_REQUEST },
           { type: SAVE_PROFILE_SUCCESS, response: { firstName: "denis" } }
        ];

        const store = mockStore({ profile: null });
        await store.dispatch(saveProfile({ firstName: "denis" }));
        expect(store.getActions()).toEqual(expectedActions);
    });

})


describe('reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            errorMessage: null,
            isFetching: false,
            isSaving: false,
            profile: null
        })
    })

    it('should handle GET_PROFILE_SUCCESS', () => {
        expect(
            reducer([], {
                type: GET_PROFILE_SUCCESS,
                response: { firstName: "denis" }
            })
        ).toEqual({
            errorMessage: null,
            isFetching: false,
            profile: { firstName: "denis" }
        })
    })

    it('should handle SAVE_PROFILE_SUCCESS', () => {
        expect(
            reducer([], {
                type: SAVE_PROFILE_SUCCESS,
                response: { firstName: "denis" }
            })
        ).toEqual({
            errorMessage: null,
            isSaving: false,
            profile: { firstName: "denis" }
        })
    })

    it('should handle GET_PROFILE_FAILURE', () => {
        expect(
            reducer([], {
                type: GET_PROFILE_FAILURE,
                error: "some error"
            })
        ).toEqual({
            isFetching: false,
            errorMessage: "some error"
        })
    })

    it('should handle SAVE_PROFILE_FAILURE', () => {
        expect(
            reducer([], {
                type: SAVE_PROFILE_FAILURE,
                error: "some error"
            })
        ).toEqual({
            isSaving: false,
            errorMessage: "some error"
        })
    })
  
});

