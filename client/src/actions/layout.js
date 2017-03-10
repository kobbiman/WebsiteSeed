import actionTypes from 'src/constants/actionTypes';
import Api from 'src/utils/Api';

const getLayoutsRequest = () => ({
    type: actionTypes.LAYOUTS_GET_REQUEST
});

const getLayoutsSuccess = data => ({
    type: actionTypes.LAYOUTS_GET_SUCCESS,
    payload: {
        data
    }
});

const getLayoutsFailure = error => ({
    type: actionTypes.LAYOUTS_GET_FAILURE,
    payload: {
        error
    }
});

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

const getLayouts = (dispatch, getState) => () => {
    if (getState().layoutsReducer.get('data').size) {
        return Promise.resolve();
    }

    dispatch(getLayoutsRequest());

    return Api().get('layouts')
        .then(response => dispatch(getLayoutsSuccess(response.data)))
        .catch(error => dispatch(getLayoutsFailure(error)));
}

const getLayoutPlaces = (dispatch, getState) => () => {
    if (getState().layoutPlacessReducer.get('data').size) {
        return Promise.resolve();
    }

    dispatch(getLayoutPlacesRequest());

    return Api().get('layoutPlacess')
        .then(response => dispatch(getLayoutPlacesSuccess(response.data)))
        .catch(error => dispatch(getLayoutPlacesFailure(error)))
}

export const getLayoutInfo = () => (dispatch, getState) => {
    return Promise.all([
        getLayoutPlaces(dispatch, getState),
        getLayouts(dispatch, getState)
    ]);
}