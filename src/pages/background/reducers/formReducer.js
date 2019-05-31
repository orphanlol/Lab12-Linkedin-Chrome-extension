import {
  GET_FORM_START,
  GET_FORM_SUCCESS,
  GET_FORM_FAILURE,
  DELETE_FORM_START,
  DELETE_FORM_SUCCESS,
  DELETE_FORM_FAILURE,
  ADD_FORM_START,
  ADD_FORM_SUCCESS,
  ADD_FORM_FAILURE,
  GET_INDIVFORM_START,
  GET_INDIVFORM_SUCCESS,
  GET_INDIVFORM_FAILURE,
  UPDATE_FORM_START,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM_FAILURE,
  ADD_UPDATE_FORM_START,
  ADD_UPDATE_FORM_FAILURE,
  ADD_UPDATE_FORM_SUCCESS,
  ADD_FIELD_START,
  ADD_FIELD_SUCCESS,
  ADD_FIELD_FAILURE
} from "../actions/formActions";

import {
  GET_FIELDS_START,
  GET_FIELDS_SUCCESS,
  GET_FIELDS_FAILURE,
  DELETE_FIELD_START,
  DELETE_FIELD_FAILURE,
  DELETE_FIELD_SUCCESS
} from "../actions/formFieldActions";

const initialState = {
  forms: [],
  isLoading: false,
  isAdding: false,
  isAddingField: false,
  gettingForm: false,
  isDeleting: false,
  isDelete: false,
  isUpdating: false,
  formToUpdate: [],
  isADDUpdateForm: false,
  fieldsToUpdate: [],
  gettingField: false,
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
    case ADD_FIELD_START:
      return {
        ...state,
        isAddingField: true
      }
    case ADD_FIELD_SUCCESS:
      return {
        ...state,
        isAddingField: false
      }
    case ADD_FIELD_FAILURE:
      return {
        ...state,
        isAddingField: false
      }
    case DELETE_FORM_START:
      return {
        ...state,
        isDeleting: true,
        error: ""
      };
    case DELETE_FORM_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        error: ""
      };
    case DELETE_FORM_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.payload
      };
    case ADD_FORM_START:
      return {
        ...state,
        isAdding: true,
        err: ""
      };
    case ADD_FORM_SUCCESS:
      return {
        ...state,
        isAdding: false,
        err: ""
      };
    case ADD_FORM_FAILURE:
      return {
        ...state,
        isAdding: false,
        err: ""
      };
    case GET_INDIVFORM_START:
      return {
        ...state,
        gettingForm: true,
        formToUpdate: [],
        error: ""
      };

    case GET_INDIVFORM_SUCCESS:
      return {
        ...state,
        gettingForm: false,
        formToUpdate: action.payload,
        error: ""
      };

    case GET_INDIVFORM_FAILURE:
      return {
        ...state,
        gettingForm: false,
        formToUpdate: [],
        error: action.payload
      };
    case UPDATE_FORM_START:
      return {
        ...state,
        isUpdating: true,
        error: ""
      };
    case UPDATE_FORM_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        error: ""
      };
    case UPDATE_FORM_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.payload
      };
    case GET_FIELDS_START:
      return {
        ...state,
        fieldsToUpdate: [],
        gettingField: true,
        error: ""
      };
    case GET_FIELDS_SUCCESS:
      console.log(action, "act");
      return {
        ...state,
        fieldsToUpdate: action.payload,
        gettingField: false,
        error: ""
      };
    case GET_FIELDS_FAILURE:
      return {
        ...state,
        fieldsToUpdate: [],
        gettingField: false,
        error: action.payload
      };
    case DELETE_FIELD_START:
      return {
        ...state,
        isDelete: true,
        error: ""
      };
    case DELETE_FIELD_SUCCESS:
      return {
        ...state,
        isDelete: false,
        error: ""
      };
    case DELETE_FIELD_FAILURE:
      return {
        ...state,
        isDelete: false,
        error: action.payload
      };
    case ADD_UPDATE_FORM_START:
      return {
        ...state,
        isADDUpdateForm: true,
        error: ""
      };
    case ADD_UPDATE_FORM_SUCCESS:
      return {
        ...state,
        isADDUpdateForm: false,
        formToUpdate: action.payload,
        isADDUpdateForm: false,
        error: ""
      };
    case ADD_UPDATE_FORM_FAILURE:
      return {
        ...state,
        isADDUpdateForm: false,
        error: ""
      };
    default:
      return state;
  }
};

export default formReducer;
