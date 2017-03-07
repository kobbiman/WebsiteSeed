import Api from 'src/utils/Api';
import actionTypes from 'src/constants/actionTypes';

const getConfigurationRequest = () => ({
     type: actionTypes.CONFIGURATION_GET_REQUEST
});

const getConfigurationSuccess = data => ({
    type: actionTypes.CONFIGURATION_GET_SUCCESS,
    payload: {
        data
    }
});

const getConfigurationFailure = error => ({
    type: actionTypes.CONFIGURATION_GET_FAILURE,
    payload: {
        error
    }
});

export const getConfiguration = () => dispatch => {
    dispatch(getConfigurationRequest());

    return Api().get('configurations')
        .then(response => dispatch(getConfigurationSuccess(response.data)))
        .catch(error => dispatch(getConfigurationFailure(error)));
}