import {
    GET_FORM_START,
    GET_FORM_SUCCESS,
    GET_FORM_FAILURE,
  } from '../actions/formActions';
  
  const initialState = {
    forms: null,
    isLoading: true,
    gettingForm: false,
    isDeleting: false,
    isUpdating: false,
    formToUpdate: null,
    error: ""
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_FORM_START:
        return {
          ...state,
          isLoading: true,
          error: ""
        };
      case GET_FORM_SUCCESS:
        return {
          ...state,
          forms: action.payload,
          isLoading: false,
          error: ""
        };
      case GET_FORM_FAILURE:
        return {
          ...state,
          isLoading: false,
          forms: action.payload,
          error: action.ERROR
        };
      default:
        return state;
    }
  };
  
  export default formReducer;