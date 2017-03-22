import actionTypes from 'src/constants/actionTypes';
import Api from 'src/utils/Api';

const getComponentsRequest = () => ({
    type: actionTypes.COMPONENTS_GET_REQUEST
});

const getComponentsSuccess = data => ({
    type: actionTypes.COMPONENTS_GET_SUCCESS,
    payload: {
        data
    }
});

const getComponentsFailure = error => ({
    type: actionTypes.COMPONENTS_GET_FAILURE,
    payload: {
        error
    }
});

export const getComponents = (dispatch, getState) => {
    if (getState().layoutReducer.get('blocks').size) {
        return Promise.resolve();
    }

    dispatch(getComponentsRequest());

    return Api().get('components')
        .then(response => dispatch(getComponentsSuccess(response.data)))
        .catch(error => dispatch(getComponentsFailure(error)))
}