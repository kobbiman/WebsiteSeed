import Immutable from 'immutable';
import actionTypes from 'src/constants/actionTypes';

const initialState = Immutable.fromJS({
    isFetching: false,
    success: false,
    error: null,
    data: {}
});

export default function LoginReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return state.merge({
                isFetching: true
            });
        case actionTypes.LOGIN_SUCCESS:
            return state.merge({
                isFetching: false,
                success: true,
                data: action.payload.data
            });
        case actionTypes.LOGIN_FAILURE:
            return state.merge({
                isFetching: false,
                error: action.payload.error
            });
        default:
            return state;
    }
}