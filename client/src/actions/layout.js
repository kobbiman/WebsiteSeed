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

const getBlocksRequest = () => ({
    type: actionTypes.BLOCKS_GET_REQUEST
});

const getBlocksSuccess = data => ({
    type: actionTypes.BLOCKS_GET_SUCCESS,
    payload: {
        data
    }
});

const getBlocksFailure = error => ({
    type: actionTypes.BLOCKS_GET_FAILURE,
    payload: {
        error
    }
});

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

const getLayouts = (dispatch, getState) => {
    if (getState().layoutReducer.get('layouts').size) {
        return Promise.resolve();
    }

    dispatch(getLayoutsRequest());

    return Api().get('layouts')
        .then(response => dispatch(getLayoutsSuccess(response.data)))
        .catch(error => dispatch(getLayoutsFailure(error)));
}

const getLayoutPlaces = (dispatch, getState) => {
    if (getState().layoutReducer.getIn(['layoutPlaces', 'byId']).size) {
        return Promise.resolve();
    }

    dispatch(getLayoutPlacesRequest());

    return Api().get('layoutPlaces')
        .then(response => dispatch(getLayoutPlacesSuccess(response.data)))
        .catch(error => dispatch(getLayoutPlacesFailure(error)))
}

const getLayoutContainers = (dispatch, getState) => {
    if (getState().layoutReducer.get('layoutContainers').size) {
        return Promise.resolve();
    }

    dispatch(getLayoutContainersRequest());

    return Api().get('layoutContainers')
        .then(response => dispatch(getLayoutContainersSuccess(response.data)))
        .catch(error => dispatch(getLayoutContainersFailure(error)))
}

const getBlocks = (dispatch, getState) => {
    if (getState().layoutReducer.get('blocks').size) {
        return Promise.resolve();
    }

    dispatch(getBlocksRequest());

    return Api().get('blocks')
        .then(response => dispatch(getBlocksSuccess(response.data)))
        .catch(error => dispatch(getBlocksFailure(error)))
}

const getComponents = (dispatch, getState) => {
    if (getState().layoutReducer.get('blocks').size) {
        return Promise.resolve();
    }

    dispatch(getComponentsRequest());

    return Api().get('components')
        .then(response => dispatch(getComponentsSuccess(response.data)))
        .catch(error => dispatch(getComponentsFailure(error)))
}

const getComponentTypes = (dispatch, getState) => {
    if (getState().layoutReducer.get('componentTypes').size) {
        return Promise.resolve();
    }

    dispatch(getComponentTypesRequest());

    return Api().get('componentTypes')
        .then(response => dispatch(getComponentTypesSuccess(response.data)))
        .catch(error => dispatch(getComponentTypesFailure(error)))
}

export const getLayoutInfo = () => (dispatch, getState) => {
    return Promise.all([
        getLayoutPlaces(dispatch, getState),
        getLayouts(dispatch, getState),
        getLayoutContainers(dispatch, getState),
        getComponents(dispatch, getState),
        getComponentTypes(dispatch, getState),
        getBlocks(dispatch, getState),
    ]);
}