import axios from 'axios';
import * as actionsTypes from './actions'



export const getForm = (id) => async dispatch => {
  console.log('id',id)
  dispatch({ type: "GET_FORM_START" });
  await axios
    .get(
      `https://linkedinextension.herokuapp.com/api/forms/${id.id}`
    )
    .then(res => res.data)
    .then(forms => {
      dispatch({ type: "GET_FORM_SUCCESS", payload: forms });
    })
    .catch(err => dispatch({ type: "GET_FORM_FAILURE", ERROR: err }));
};


export const deleteForm = (id) =>  {
  const deletedForm = axios.delete(
    `https://linkedinextension.herokuapp.com/api/forms/${id.userId}/${id.formId}`
  );
  return dispatch => {
    dispatch({ type: "DELETE_FORM_START" });
    deletedForm
      .then(forms => {
        dispatch({ type: "DELETE_FORM_SUCCESS", payload: forms });
      })
      .catch(err => {
        dispatch({ type: "DELETE_FORM_FAILURE", payload: err });
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
        name: newForm.newForm.name
      }
    )
    .then(async id => {
      console.log(id, "id");
      for (let i = 0; i < newForm.newForm.fields.length; i++) {
        await axios
          .post(`https://linkedinextension.herokuapp.com/api/fields/field`, {
            form_id: id.data,
            name: newForm.newForm.fields[i].name,
            type: newForm.newForm.fields[i].selected,
            selected: newForm.newForm.fields[i].selected
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
