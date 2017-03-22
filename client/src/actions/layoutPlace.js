import actionTypes from 'src/constants/actionTypes';
import Api from 'src/utils/Api';

const getLayoutPlacesRequest = () => ({
    type: actionTypes.LAYOUT_PLACES_GET_REQUEST
});

const getLayoutPlacesSuccess = data => ({
    type: actionTypes.LAYOUT_PLACES_GET_SUCCESS,
    payload: {
        data
    }
});

const getLayoutPlacesFailure = error => ({
    type: actionTypes.LAYOUT_PLACES_GET_FAILURE,
    payload: {
        error
    }
});

export const getLayoutPlaces = (dispatch, getState) => {
    if (getState().layoutReducer.getIn(['layoutPlaces', 'byId']).size) {
        return Promise.resolve();
    }

    dispatch(getLayoutPlacesRequest());

    return Api().get('layoutPlaces')
        .then(response => dispatch(getLayoutPlacesSuccess(response.data)))
        .catch(error => dispatch(getLayoutPlacesFailure(error)))
}