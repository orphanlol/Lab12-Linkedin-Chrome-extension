import axios from 'axios';
import * as actionsTypes from './actions'

export const GET_FORM_START  ='GET_FORM_START'
export const GET_FORM_FAILURE = 'GET_FORM_FAILURE'
export const GET_FORM_SUCCESS = 'GET_FORM_SUCCESS'



export const getForm = (id) => dispatch => {
  console.log('id',id)
  dispatch({ type: GET_FORM_START });
  axios
    .get(
      `https://linkedinextension.herokuapp.com/api/forms/${id.id}`
    )
    .then(res => res.data)
    .then(forms => {
      console.log('is id error')
      dispatch({ type: GET_FORM_SUCCESS, payload: forms });
    })
    .catch(err => dispatch({ type: GET_FORM_FAILURE, ERROR: err }));
};


export const deleteForm = (id) =>  {
  const deletedForm = axios.delete(
    `https://linkedinextension.herokuapp.com/api/forms/${id.userId}/${id.formId}`
  );
  return dispatch => {
    dispatch({ type: 'DELETE_FORM_START' });
    deletedForm
      .then(forms => {
        dispatch({ type: 'DELETE_FORM_SUCCESS', payload: forms });
      })
      .catch(err => {
        dispatch({ type: 'DELETE_FORM_FAILURE', payload: err });
      });
  };
};

export const addForm = newForm => {
  console.log(newForm, "begin new form");
  axios
    .post(
      `https://linkedinextension.herokuapp.com/api/forms/${localStorage.getItem(
        "id"
      )}`,
      {
        name: newForm.newForm.name,
        type: newForm.type
      }
    )
    .then(id => {
      console.log(id, "i am here 1");
      for (let i = 0; i < newForm.newForm.fields.length; i++) {
        axios
          .post(`https://linkedinextension.herokuapp.com/api/fields/field`, {
            form_id: id.data,
            name: newForm.newForm.fields[i].name
          })
          .then(res => {
            console.log(res, "field res");
          })
          .catch(err => {
            console.log("Failed to add form field", err);
          });
      }
    })
    .catch(err => console.log(err));
};
