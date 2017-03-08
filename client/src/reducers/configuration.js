import Immutable from 'immutable';
import actionTypes from 'src/constants/actionTypes';

export const initialState = Immutable.fromJS({
    isFetching: false,
    success: false,
    error: null,
    data: {}
});

const processData = settings => {
    let settingsObj = {};

    settings.forEach(({key, value}) => {
        settingsObj[key] = value;
    });

    return settingsObj;
}

export default function configurationReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.CONFIGURATION_GET_REQUEST:
            return state.merge({
                isFetching: true
            });
        case actionTypes.CONFIGURATION_GET_SUCCESS:
            return state.merge({
                isFetching: false,
                success: true,
                data: processData(action.payload.data)
            });
        case actionTypes.CONFIGURATION_GET_FAILURE:
            return state.merge({
                isFetching: false,
                error: action.payload.error
            });
        default:
            return state;
    }
}