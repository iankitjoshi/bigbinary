import {
    GET_LAUNCH,
    GET_LAUNCH_SUCCESS,
    GET_LAUNCH_FAILED
} from './actions'

const initState = {
    isLoading: false,
    launches: {}
}

export default function (state = { ...initState }, action) {
    switch (action.type) {
        
        case GET_LAUNCH:
            return { ...state, isLoading: true, launches: {} }

        case GET_LAUNCH_SUCCESS:
            return { ...state, isLoading: false, launches: action.payload || {} }

        case GET_LAUNCH_FAILED:
            return { ...state, isLoading: false, launches: {} }

        default:
            return state
    }
}