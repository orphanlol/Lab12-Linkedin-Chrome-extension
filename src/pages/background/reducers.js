import {combineReducers} from 'redux'
import login from './reducers/login'
import formReducer from './reducers/formReducer'
import linkInfo from './reducers/linkInfo'

export default combineReducers({
    login: login,
    formReducer: formReducer,
    linkInfo: linkInfo
})