import actionTypes from 'src/constants/actionTypes';
import Api from 'src/utils/Api';

import { getLayoutPlaces } from 'src/actions/layoutPlace';
import { getLayoutContainers } from 'src/actions/layoutContainer';
import { getBlocks } from 'src/actions/block';
import { getComponents } from 'src/actions/component';
import { getComponentTypes } from 'src/actions/componentType';

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

const getLayouts = (dispatch, getState) => {
    if (getState().layoutReducer.get('layouts').size) {
        return Promise.resolve();
    }

    dispatch(getLayoutsRequest());

    return Api().get('layouts')
        .then(response => dispatch(getLayoutsSuccess(response.data)))
        .catch(error => dispatch(getLayoutsFailure(error)));
}

export const insertLayout = layout => (dispatch, getState) => {
    return Api().post('layouts', layout).then(response => {
        dispatch(getLayoutInfo(dispatch, getState));

        return response;
    });
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