import actionTypes from 'src/constants/actionTypes';
import Api from 'src/utils/Api';

const getComponentTypesRequest = () => ({
    type: actionTypes.COMPONENT_TYPES_GET_REQUEST
});

const getComponentTypesSuccess = data => ({
    type: actionTypes.COMPONENT_TYPES_GET_SUCCESS,
    payload: {
        data
    }
});

const getComponentTypesFailure = error => ({
    type: actionTypes.COMPONENT_TYPES_GET_FAILURE,
    payload: {
        error
    }
});

export const getComponentTypes = (dispatch, getState) => {
    if (getState().layoutReducer.get('componentTypes').size) {
        return Promise.resolve();
    }

    dispatch(getComponentTypesRequest());

    return Api().get('componentTypes')
        .then(response => dispatch(getComponentTypesSuccess(response.data)))
        .catch(error => dispatch(getComponentTypesFailure(error)))
}