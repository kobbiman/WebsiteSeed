export const initialize = (token, userId) => {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('authUserId', userId);
}

export const reset = () => {
    sessionStorage.setItem('authToken', '');
    sessionStorage.setItem('authUserId', '');
}

export const getToken = () => {
    return sessionStorage.getItem('authToken');
}

export const getUserId = () => {
    return sessionStorage.getItem('authUserId');
}

export default {
    initialize,
    reset,
    getToken,
    getUserId
}