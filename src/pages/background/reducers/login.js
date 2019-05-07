import {
    LOGIN_START
} from '../actions'

const initialState = {
    isLogin: false
}

const login = (state = initialState, action ) => {
    switch(action.type) {
        case LOGIN_START:
            return {
                ...state,
                isLogin: false
            }
        default: return state
    }
}

export default login
