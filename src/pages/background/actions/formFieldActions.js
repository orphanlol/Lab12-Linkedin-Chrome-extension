import axios from "axios";

// const localDb = "http://localhost:9001";
// const deployedApp = "https://linkedinextension.netlify.com";
// const localApp = "http://localhost:3000";

export const GET_FIELDS_START = "GET_FIELDS_START";
export const GET_FIELDS_SUCCESS = "GET_FIELDS_SUCCESS";
export const GET_FIELDS_FAILURE = "GET_FIELDS_FAILURE";

export const getField = id => dispatch => {
    console.log('feildid',id)
  dispatch({ type: GET_FIELDS_START });
  axios
    .get(`https://linkedinextension.herokuapp.com/api/fields/field/${id.formId}`, {
      headers: {
        Authorization: window.localStorage.token
      }
    })
    .then(res => res.data)
    .then(fields => {
      dispatch({ type: GET_FIELDS_SUCCESS, payload: fields });
    })
    .catch(err => dispatch({ type: GET_FIELDS_FAILURE, ERROR: err }));
};

export const DELETE_FIELD_START = "DELETE_FIELD_START";
export const DELETE_FIELD_SUCCESS = "DELETE_FIELD_SUCCESS";
export const DELETE_FIELD_FAILURE = "DELETE_FIELD_FAILURE";

export const deleteField = id => dispatch => {
  dispatch({ type: DELETE_FIELD_START });
  return axios
    .delete(`https://linkedinextension.herokuapp.com/api/fields/field/${id.formId}`, {
      headers: {
        Authorization: window.localStorage.token
      }
    })
    .then(res => {
      dispatch({ type: DELETE_FIELD_SUCCESS});
    })
    .catch(err => {
      dispatch({ type: DELETE_FIELD_FAILURE, payload: err.response });
      alert("Failed to delete form, please try again");
    });
};
