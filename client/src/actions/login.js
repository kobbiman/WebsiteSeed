import actionTypes from 'src/constants/actionTypes';
import Api from 'src/utils/Api';

const authenticateRequest = () => ({
    type: actionTypes.LOGIN_REQUEST
});

const authenticateSuccess = data => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
        data
    }
});

const authenticateFailure = error => ({
    type: actionTypes.LOGIN_FAILURE,
    payload: {
        error
    }
});

export const authenticate = ({username, password}) => dispatch => {
    dispatch(authenticateRequest());

    return Api().post('login', { username, password })
        .then(response => dispatch(authenticateSuccess(response.data)))
        .catch(error => dispatch(authenticateFailure(error)));
}