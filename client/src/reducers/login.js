import Immutable from 'immutable';
import actionTypes from 'src/constants/actionTypes';

const initialState = Immutable.fromJS({
    inProgress: false,
    success: false,
    error: null,
    data: {}
});

export default function LoginReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return state.merge({
                inProgress: true
            });
        case actionTypes.LOGIN_SUCCESS:
            return state.merge({
                inProgress: false,
                success: true,
                data: action.payload.data
            });
        case actionTypes.LOGIN_FAILURE:
            return state.merge({
                inProgress: false,
                error: action.payload.error
            });
        default:
            return state;
    }
}