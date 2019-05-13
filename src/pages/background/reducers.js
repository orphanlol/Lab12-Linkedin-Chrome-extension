import {combineReducers} from 'redux'
import login from './reducers/login'
import {formReducer} from './reducers/formReducer'

export default combineReducers({
    login: login,
    formReducer: formReducer
})