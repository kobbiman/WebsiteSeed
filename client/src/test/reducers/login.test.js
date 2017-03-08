import expect from 'expect';
import Immutable from 'immutable';
import actionTypes from 'src/constants/actionTypes';
import loginReducer from 'src/reducers/login';

describe('Reducer :: Login', () => {

    const initialState = Immutable.fromJS({
        isFetching: false,
        success: false,
        error: null,
        data: {}
    });

    const fetchingState = initialState.merge({
        isFetching: true
    });

    it('should set initial state properly', () => {
        const result = loginReducer(undefined, {});

        expect(result.toJS()).toEqual(initialState.toJS());
    });

    it('should change state properly when a LOGIN_REQUEST action is dispatched', () => {
        const result = loginReducer(initialState, {
            type: actionTypes.LOGIN_REQUEST
        });
        const expectedState = initialState.merge({
            isFetching: true
        });

        expect(result.toJS()).toEqual(expectedState.toJS());
    })

    it('should change state properly when a LOGIN_FAILURE action is dispatched', () => {
        const error = { code: '500' };
        const result = loginReducer(initialState, {
            type: actionTypes.LOGIN_FAILURE,
            payload: {
                error
            }
        });
        const expectedState = fetchingState.merge({
            isFetching: false,
            error
        });

        expect(result.toJS()).toEqual(expectedState.toJS());
    })

    it('should change state properly when a LOGIN_SUCCESS action is dispatched', () => {
        const data = { userId: 1, token: 'asd786a87sd687asd' };
        const result = loginReducer(initialState, {
            type: actionTypes.LOGIN_SUCCESS,
            payload: {
                data
            }
        });
        const expectedState = fetchingState.merge({
            isFetching: false,
            success: true,
            data
        });

        expect(result.toJS()).toEqual(expectedState.toJS());
    })

});