import React, { Component } from "react";
import { connect } from "react-redux";
import { Store } from "react-chrome-redux";
import { withRouter } from "react-router";
import "./Form.css";
// import { deleteForm, addFormToUpdate } from "../../../actions/formActions.js";

const store = new Store({
  portName: "COUNTING"
});

class Form extends Component {
  deleteForm = (userId, formId) => {
    this.props.deleteForm(userId, formId);
    this.props.history.push("/");
  };

  addFormToUpdate = async form => {
    // await this.props.addFormToUpdate(form);
    console.log("form_id", this.props.formToUpdate);
    await this.props.history.push(`/update-form/?id=${form.form_id}`);
  };

  gettingForm = () => {
    if (this.props.forms.isDeleting === false) {
      this.props.getForm(this.props.login.id);
    }
  }

  render() {
    // return (
    // <FormWrapper>
    //   <Name>{name}</Name>
    //   <FieldCount>Field Count: {field_count}</FieldCount>
    //   <div>
    //     <Edit onClick={() => this.addFormToUpdate(this.props.form)}>
    //       edit
    //     </Edit>
    //   </div>
    //   <div>
    //     <Delete
    //       onClick={() => {
    //         if (window.confirm("Are you sure you want to delete this form?"))
    //           this.deleteForm(
    //             this.props.form.user_id,
    //             this.props.form.form_id
    //           );
    //       }}
    //     >
    //       delete
    //     </Delete>
    //   </div>
    // </FormWrapper>

    const { id, name, field_count, user_id, form_id } = this.props.form;
    return (
      <div
        className="FormWrapper"
        onClick={() => this.addFormToUpdate(this.props.form)}
      >
        <div className="Name">{name}</div>
        <div className="FieldCount">Field Count:{field_count}</div>
        <div>
          <button
            className="Delete"
            onClick={e => {
              if (
                window.confirm("Are you sure you want to delete this template?")
              )
                this.deleteForm(
                  this.props.form.user_id,
                  this.props.form.form_id,
                  e.stopPropagation()
                )
                this.gettingForm()
            }}
          >
            delete
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formToUpdate: state.formReducer.formToUpdate,
    login: state.login,
    forms: state.formReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteForm: (userId, formId) =>
      store.dispatch({
        type: "alias@DELETE_FORM",
        userId: userId,
        formId: formId
      }),
    addFormToUpdate: form =>
      // store.dispatch({ type: "adias@ADD_FORM_TO_UPDATE", form: form })
      store.dispatch({ type: "alias@ADD_FORM_TO_UPDATE", form: form }),
    getForm: id => store.dispatch({ type: "alias@GET_FORM", id: id })
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form)
);
