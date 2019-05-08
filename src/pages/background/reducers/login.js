const initialState = {
    isLogin: false,
    firstName: null,
    lastName: null,
    userId: null
    
}

const login = (state = initialState, action ) => {
    switch(action.type) {
        case "GET_LOGIN_INFO": 
            return {
                ...state,
                firstName: action.firstname,
                lastName: action.lastname,
                userId: action.userid
            }
        default: return state
    }
}

export default login
