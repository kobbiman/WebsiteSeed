import actionTypes from 'src/constants/actionTypes';
import Api from 'src/utils/Api';

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

export const getBlocks = (dispatch, getState) => {
    if (getState().layoutReducer.get('blocks').size) {
        return Promise.resolve();
    }

    dispatch(getBlocksRequest());

    return Api().get('blocks')
        .then(response => dispatch(getBlocksSuccess(response.data)))
        .catch(error => dispatch(getBlocksFailure(error)))
}