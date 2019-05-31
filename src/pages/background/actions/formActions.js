import axios from "axios";
import * as actionsTypes from "./actions";

export const GET_FORM_START = "GET_FORM_START";
export const GET_FORM_FAILURE = "GET_FORM_FAILURE";
export const GET_FORM_SUCCESS = "GET_FORM_SUCCESS";

export const getForm = id => dispatch => {
  console.log("id", id);
  dispatch({ type: GET_FORM_START });
  axios
    .get(`https://linkedinextension.herokuapp.com/api/forms/${id.id}`, {
      headers: {
        Authorization: window.localStorage.token
      }
    })
    .then(res => res.data)
    .then(forms => {
      console.log("is id error");
      dispatch({ type: GET_FORM_SUCCESS, payload: forms });
    })
    .catch(err => dispatch({ type: GET_FORM_FAILURE, ERROR: err }));
};

export const DELETE_FORM_START = "DELETE_FORM_START";
export const DELETE_FORM_SUCCESS = "DELETE_FORM_SUCCESS";
export const DELETE_FORM_FAILURE = "DELETE_FORM_FAILURE";

export const deleteForm = id => {
  const deletedForm = axios.delete(
    `https://linkedinextension.herokuapp.com/api/forms/${id.userId}/${
      id.formId
    }`,
    {
      headers: {
        Authorization: window.localStorage.token
      }
    }
  );
  return dispatch => {
    dispatch({ type: DELETE_FORM_START });
    deletedForm
      .then(forms => {
        dispatch({ type: DELETE_FORM_SUCCESS, payload: forms });
      })
      .catch(err => {
        dispatch({ type: DELETE_FORM_FAILURE, payload: err });
      });
  };
};

export const ADD_FORM_START = "ADD_FORM_START";
export const ADD_FORM_SUCCESS = "ADD_FORM_SUCCESS";
export const ADD_FORM_FAILURE = "ADD_FORM_FAILURE";
export const ADD_FIELD_START = 'ADD_FIELD_START'
export const ADD_FIELD_SUCCESS = 'ADD_FIELD_SUCCESS'
export const ADD_FIELD_FAILURE = 'ADD_FIELD_FAILURE'

export const addForm = newForm => dispatch => {
  console.log(newForm, "begin new form");
  dispatch({ type: ADD_FORM_START });
  axios
    .post(
      `https://linkedinextension.herokuapp.com/api/forms/${localStorage.getItem(
        "id"
      )}`,
      {
        name: newForm.newForm.name
      },
      {
        headers: {
          Authorization: window.localStorage.token
        }
      }
    )
    .then(id => {
      dispatch({ type: ADD_FORM_SUCCESS });
      console.log(id, "i am here 1");
      for (let i = 0; i < newForm.newForm.fields.length; i++) {
        dispatch({type: ADD_FIELD_START})
        axios
          .post(
            `https://linkedinextension.herokuapp.com/api/fields/field`,
            {
              form_id: id.data,
              name: newForm.newForm.fields[i].name
            },
            {
              headers: {
                Authorization: window.localStorage.token
              }
            }
          )
          .then(res => {
            console.log(res, "field res");
            dispatch({type: ADD_FIELD_SUCCESS})
          })
          .catch(err => {
            console.log("Failed to add form field", err);
            dispatch({type: ADD_FIELD_FAILURE})
          });
      }
    })
    .catch(err => {
      ({ type: ADD_FORM_FAILURE });
    });
};

export const GET_INDIVFORM_START = "GET_INDIVFORM_START";
export const GET_INDIVFORM_SUCCESS = "GET_INDIVFORM_SUCCESS";
export const GET_INDIVFORM_FAILURE = "GET_INDIVFORM_FAILURE";

export const getIndivForm = formId => dispatch => {
  console.log("formId", formId);
  dispatch({ type: GET_INDIVFORM_START });
  axios
    .get(
      `https://linkedinextension.herokuapp.com/api/forms/${localStorage.getItem(
        "id"
      )}/${formId.id}`,
      {
        headers: {
          Authorization: window.localStorage.token
        }
      }
    )
    .then(form => {
      console.log(form, "form in action in");
      // dispatch({ type: ADD_UPDATE_FORM_SUCCESS, payload: form.data });
      dispatch({ type: GET_INDIVFORM_SUCCESS, payload: form.data });
    })
    .catch(err => {
      dispatch({ type: GET_INDIVFORM_FAILURE, payload: err });
    });
};

export const UPDATE_FORM_START = "UPDATE_FORM_START";
export const UPDATE_FORM_SUCCESS = "UPDATE_FORM_SUCCESS";
export const UPDATE_FORM_FAILURE = "UPDATE_FORM_FAILURE";

export const updateForm = newForm => dispatch => {
  console.log("newForm", newForm);
  dispatch({ type: UPDATE_FORM_START });
  axios
    .put(
      `https://linkedinextension.herokuapp.com/api/forms/${
        newForm.form.user_id
      }/${newForm.form.id}`,
      newForm.form,
      {
        headers: {
          Authorization: window.localStorage.token
        }
      }
    )
    .then(res => res.data)
    .then(form => {
      dispatch({ type: UPDATE_FORM_SUCCESS, payload: { ...form } });
    })
    .catch(err => {
      dispatch({ type: UPDATE_FORM_FAILURE, payload: err });
    });

  for (let i = 0; i < newForm.field.length; i++) {
    axios
      .put(
        `https://linkedinextension.herokuapp.com/api/fields/field`,
        newForm.field[i],
        {
          headers: {
            Authorization: window.localStorage.token
          }
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const ADD_UPDATE_FORM_START = "ADD_UPDATE_FORM_START";
export const ADD_UPDATE_FORM_SUCCESS = "ADD_UPDATE_FORM_SUCCESS";
export const ADD_UPDATE_FORM_FAILURE = "ADD_UPDATE_FORM_FAILURE";

export const addFormToUpdate = form => dispatch => {
  console.log("form", form);
  dispatch({ type: ADD_UPDATE_FORM_START });
  dispatch({ type: ADD_UPDATE_FORM_SUCCESS, payload: form.form });
};

export const initialForm = none => dispatch => {
  dispatch({ type: GET_INDIVFORM_START });
};
