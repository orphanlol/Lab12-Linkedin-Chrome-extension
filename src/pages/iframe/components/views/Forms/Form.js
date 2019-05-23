import React, { Component } from "react";
import { connect } from "react-redux";
import {Store} from 'react-chrome-redux';
import {withRouter} from 'react-router'
import "./Form.css";
// import { deleteForm, addFormToUpdate } from "../../../actions/formActions.js";

const store = new Store({
    portName: 'COUNTING',
  })


class Form extends Component {


  deleteForm = (userId, formId) => {
    this.props.deleteForm(userId, formId);
    this.props.history.push('/')
  };

  addFormToUpdate = async form => {
    // await this.props.addFormToUpdate(form);
    console.log('form_id', this.props.formToUpdate)
    await this.props.history.push(
      `/update-form/?id=${form.form_id}`);
  };

  render() {
    const { id, name, field_count, user_id, form_id } = this.props.form;
    return (
      <div className="Title" key={id}>
        <div className="Name">{name}</div>
        <div className="Field">{field_count}</div>
        <div className="Empty">
          <button onClick={() => this.addFormToUpdate(this.props.form)}>
            edit
          </button>
        </div>
        <div className="Delete">
          <button
            onClick={(e) => {
              if (window.confirm("Are you sure you want to delete this form?"))
                this.deleteForm(
                  this.props.form.user_id,
                  this.props.form.form_id,
                  e.stopPropagation()
                );
            }}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formToUpdate: state.formReducer.formToUpdate
  };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteForm: (userId, formId) => store.dispatch({type: "alias@DELETE_FORM", userId: userId, formId:formId}),
        addFormToUpdate: (form) => store.dispatch({type: 'adias@ADD_FORM_TO_UPDATE', form: form})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
