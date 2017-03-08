import actionTypes from 'src/constants/actionTypes';
import Api from 'src/utils/Api';

const getMenusRequest = () => ({
    type: actionTypes.MENUS_GET_REQUEST
});

const getMenusSuccess = data => ({
    type: actionTypes.MENUS_GET_SUCCESS,
    payload: {
        data
    }
});

const getMenusFailure = error => ({
    type: actionTypes.MENUS_GET_FAILURE,
    payload: {
        error
    }
});

const getMenuLinksRequest = () => ({
    type: actionTypes.MENU_LINKS_GET_REQUEST
});

const getMenuLinksSuccess = data => ({
    type: actionTypes.MENU_LINKS_GET_SUCCESS,
    payload: {
        data
    }
});

const getMenuLinksFailure = error => ({
    type: actionTypes.MENU_LINKS_GET_FAILURE,
    payload: {
        error
    }
});

const getMenuLinks = dispatch => () => {
    dispatch(getMenuLinksRequest());

    return Api().get('menuLinks')
        .then(response => dispatch(getMenuLinksSuccess(response.data)))
        .catch(error => dispatch(getMenuLinksFailure(error)));
}

export const getMenus = () => dispatch => {
    dispatch(getMenusRequest());

    return Api().get('menus')
        .then(response => dispatch(getMenusSuccess(response.data)))
        .then(getMenuLinks(dispatch))
        .catch(error => dispatch(getMenusFailure(error)));
}