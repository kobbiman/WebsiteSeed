import expect from 'expect';
import Immutable from 'immutable';
import actionTypes from 'src/constants/actionTypes';
import configurationReducer from 'src/reducers/configuration';

describe('Reducer :: Configuration', () => {

    const initialState = Immutable.fromJS({
        isFetching: false,
        success: false,
        error: null,
        data: {}
    });

    const fetchingState = initialState.merge({
        isFetching: true
    })

    it('should set initial state properly', () => {
        const result = configurationReducer(undefined, {});

        expect(result.toJS()).toEqual(initialState.toJS());
    })

    it('should change state properly when a CONFIGURATION_GET_REQUEST action is dispatched', () => {
        const result = configurationReducer(initialState, {
            type: actionTypes.CONFIGURATION_GET_REQUEST
        });
        const comparingState = initialState.merge({
            isFetching: true
        });

        expect(result.toJS()).toEqual(comparingState.toJS());
    })

    it('should change state properly when a CONFIGURATION_GET_SUCCESS action is dispatched', () => {
        const result = configurationReducer(initialState, {
            type: actionTypes.CONFIGURATION_GET_SUCCESS,
            payload: {
                data: [
                    {
                        id: 1,
                        key: 'siteName',
                        value: 'Website Seed - CMS'
                    },
                    {
                        id: 2,
                        key: 'another',
                        value: 'Something'
                    }
                ]
            }
        });
        const comparingState = fetchingState.merge({
            isFetching: false,
            success: true,
            data: {
                siteName: 'Website Seed - CMS',
                another: 'Something'
            }
        });

        expect(result.toJS()).toEqual(comparingState.toJS());
    })

    it('should change state properly when a CONFIGURATION_GET_FAILURE action is dispatched', () => {
        const error = { code: '500' };
        const result = configurationReducer(initialState, {
            type: actionTypes.CONFIGURATION_GET_FAILURE,
            payload: {
                error
            }
        });
        const comparingState = fetchingState.merge({
            isFetching: false,
            error
        });

        expect(result.toJS()).toEqual(comparingState.toJS());
    })

});