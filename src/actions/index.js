import * as actionTypes from './types';

export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
}
export const setLoading = loading => {
    return {
        type: actionTypes.SET_LOADING,
        payload: {
            loading : loading
        }
    }
}

export const setChannel = channel => {
    return {
        type: actionTypes.SET_CHANNEL,
        payload: {
            channel: channel
        }
    }
}