export const GET_FORM_START = "GET_FORM_START"
export const GET_FORM_SUCCESS = "GET_FORM_SUCCESS"
export const GET_FORM_FAILURE = "GET_FORM_FAILURE"


export const LOGIN_INFO_START = 'LOGIN_INFO_START'
export const LOGIN_INFO_SUCCESS = 'LOGIN_INFO_SUCCESS'
export const LOGIN_INFO_FAIL = 'LOGIN_INFO_FAIL'

export const getLogin = (info) => dispatch => {
    console.log('info', info)
    dispatch({type: LOGIN_INFO_START});
    localStorage.setItem('id',info.id)
    localStorage.setItem('firstName', info.firstName)
    localStorage.setItem('lastName', info.lastName)
    dispatch({type: LOGIN_INFO_SUCCESS, payload: info})
}