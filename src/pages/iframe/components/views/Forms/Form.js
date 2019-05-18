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

  addFormToUpdate = form => {
    this.props.addFormToUpdate(form);
    this.props.history.push("/update-form");
  };

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
      <div className="FormWrapper">
        <div className="Name">{name}</div>
        <div className="FieldCount">Field Count:{field_count}</div>
        <div>
          <button onClick={() => this.addFormToUpdate(this.props.form)}>
            edit
          </button>
        </div>
        <div>
          <button
            className="Delete"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this form?"))
                this.deleteForm(
                  this.props.form.user_id,
                  this.props.form.form_id
                );
            }}
          >
            delete
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteForm: (userId, formId) =>
      store.dispatch({
        type: "alias@DELETE_FORM",
        userId: userId,
        formId: formId
      }),
    addFormToUpdate: form =>
      store.dispatch({ type: "adias@ADD_FORM_TO_UPDATE", form: form })
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Form)
);

// const { id, name, field_count, user_id, form_id } = this.props.form;
// return (
//   <div className="Title" key={id}>
//     <div className="Name">{name}</div>
//     <div className="Field">{field_count}</div>
//     <div className="Empty">
//       <button onClick={() => this.addFormToUpdate(this.props.form)}>
//         edit
//       </button>
//     </div>
//     <div className="Delete">
//       <button
//         onClick={() => {
//           if (window.confirm("Are you sure you want to delete this form?"))
//             this.deleteForm(
//               this.props.form.user_id,
//               this.props.form.form_id
//             );
//         }}
//       >
//         X
//       </button>
//     </div>
//   </div>
// );
