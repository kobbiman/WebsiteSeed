import actionTypes from 'src/constants/actionTypes';
import Api from 'src/utils/Api';

const getLayoutContainersRequest = () => ({
    type: actionTypes.LAYOUT_CONTAINERS_GET_REQUEST
});

const getLayoutContainersSuccess = data => ({
    type: actionTypes.LAYOUT_CONTAINERS_GET_SUCCESS,
    payload: {
        data
    }
});

const getLayoutContainersFailure = error => ({
    type: actionTypes.LAYOUT_CONTAINERS_GET_FAILURE,
    payload: {
        error
    }
});

export const getLayoutContainers = (dispatch, getState) => {
    if (getState().layoutReducer.get('layoutContainers').size) {
        return Promise.resolve();
    }

    dispatch(getLayoutContainersRequest());

    return Api().get('layoutContainers')
        .then(response => dispatch(getLayoutContainersSuccess(response.data)))
        .catch(error => dispatch(getLayoutContainersFailure(error)))
}