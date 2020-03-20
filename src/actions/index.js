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

export const setChannel = (item, currentUser = null, isPrivate = false) => {
    if(isPrivate){
        let DmChannel = {
            id: item.uid > currentUser.uid ? `${item.uid}/${currentUser.uid}`: `${currentUser.uid}/${item.uid}`,
            name: item.name
        }
        return {
            type: actionTypes.SET_CHANNEL,
            payload: {
                channel: DmChannel,
                isPrivate: true
            }
        }
    }
    return {
        type: actionTypes.SET_CHANNEL,
        payload: {
            channel: item,
            isPrivate
        }
    }
}