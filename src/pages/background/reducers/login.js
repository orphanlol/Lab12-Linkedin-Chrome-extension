const initialState = {
    firstName: null,
    lastName: null,
    id: null
}

const login = ( state = initialState, action ) => {
    switch(action.type) {
        case "GET_LOGIN_INFO": 
            return {
                ...state,
                firstName: action.firstname,
                lastName: action.lastname,
                id: action.id
            }
        default: return state
    }
}

export default login
