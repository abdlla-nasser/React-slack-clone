import * as actionTypes from '../actions/types';
import { combineReducers } from 'redux'

const initStateU = {
    currentUser: null
}

const initStateL = {
    loading: false
}

const initStateCh = {
    channel: null
}

const userReducer = (state = initStateU, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                currentUser: action.payload.currentUser,
            }
        default:
            return state
    }
}

const loadingReducer = (state = initStateL, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload.loading
            }
        default:
            return state
    }
}

const channelReducer = (state = initStateCh, action) => {
    switch(action.type) {
        case actionTypes.SET_CHANNEL:
            return {
                ...state,
                channel: action.payload.channel,
            }
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    userReducer,
    loadingReducer,
    channelReducer
})