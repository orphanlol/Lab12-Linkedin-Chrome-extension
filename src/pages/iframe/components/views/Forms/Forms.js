import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Store } from "react-chrome-redux";
import "./Forms.css";
import NavBar from "../NavBar/NavBar";
import Form from "./Form";

const store = new Store({
  portName: "COUNTING"
});

class Forms extends Component {
  state = {
    isUpdated: true
  };

  componentWillMount() {
    this.props.getForm(this.props.login.id);
    console.log("i am here");
  }

  newForm = () => {
    this.props.history.push("/new-form");
  };

  render() {
    let form = <div>loading</div>;

    if (
      this.props.forms.forms === null ||
      this.props.forms.forms.length === (0 || undefined)
    ) {
      form = (
        <div className="ContainedForms">
          <NavBar />
          <div>Forms</div>
          <div className="Title" />
          <div>No Form was found please create a Form</div>
          <button onClick={this.newForm}>Create New</button>
        </div>
      );
    } else if (this.props.forms.forms !== null) {
      form = (
        <div>
          <NavBar />
          <div className="FormsWrapper">
            <h1>Create forms to customize the fields you scrape</h1>
            {this.props.forms.forms.map(form => (
              <div className="IndividualForm">
                <Form form={form} history={this.props.history} />
              </div>
            ))}
            <button className="CreateFormBtn" onClick={this.newForm}>
              Create New Form
            </button>
          </div>
        </div>
      );
    }

    return <div className="FormsContainer">{form}</div>;
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    forms: state.formReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getForm: id => store.dispatch({ type: "alias@GET_FORM", id: id })
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Forms)
);

{
  /* <div className="ContainedForm">
<NavBar />
<div className="Hello">Forms</div>
<div id="Top">
  <div className="Name">Name</div>
  <div>Fields</div>
</div>
<div>
  {this.props.forms.forms.map(form => (
    <Form form={form} history={this.props.history} />
  ))}
</div>
<button onClick={this.newForm}>Create New</button>
</div> */
}
