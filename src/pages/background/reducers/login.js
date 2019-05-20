import {
    LOGIN_INFO_START,
    LOGIN_INFO_SUCCESS,
    LOGIN_INFO_FAIL
} from '../actions/actions'

const initialState = {
    firstName: null,
    lastName: null,
    id: null
}

const login = ( state = initialState, action ) => {
    switch(action.type) {
        case LOGIN_INFO_START: 
            return {
                ...state
            }
        case LOGIN_INFO_SUCCESS: 
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                id: action.payload.id
            }
        case LOGIN_INFO_FAIL:
            return {
                ...state
            }
        default: return state
    }
}

export default login
