import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Store } from "react-chrome-redux";
import "./Forms.css";
import NavBar from "../NavBar/NavBar";
import Form from "./Form";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";

const store = new Store({
  portName: "COUNTING"
});

const deployedDb = "https://linkedinextension.herokuapp.com";
const localDb = "http://localhost:9001";

class Forms extends Component {
  state = {
    isUpdated: true
  };

  componentWillMount() {
      this.props.getForm(this.props.login.id);
  
    console.log("i am here");
  }

  newForm = async () => {
    await axios
      .get(`${deployedDb}/api/users/upgrade/${localStorage.getItem("id")}`, {
        headers: {
          Authorization: window.localStorage.token
        }
      })
      .then(res => {
        if (res.data.pro == false && res.data.form_count >= 1) {
          if (
            window.confirm(
              "You have to have a pro account to make more than 1 template! \n Please go to main site to if you would like to upgrade."
            )
          ) {
            this.props.history.push("/forms");
          } else {
            this.props.history.push("/forms");
          }
        } else {
          this.props.history.push("/new-form");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let form = (
      <div>
        <Spinner />
      </div>
    );

    if (
      (this.props.forms.forms === null ||
        this.props.forms.forms.length === (0 || undefined)) &&
      !this.props.forms.isLoading && this.props.forms.gettingForm === false &&
      this.props.forms.isDeleting === false && this.props.forms.isAdding === false &&
      this.props.forms.isAddingField === false && this.props.forms.isAdding === false
    ) {
      form = (
        <div className="ContainedForms">
          <NavBar />
          <div>Templates</div>
          <div className="Title" />
          <div>No templates were found please create a new template</div>
          <button onClick={this.newForm}>Create New</button>
        </div>
      );
    }
    else if (this.props.forms.forms !== null && !this.props.forms.isLoading) {
      form = (
        <div>
          <NavBar />
          <div className="FormsWrapper">
            <h1>
              Create scraping templates to customize the fields you scrape
            </h1>
            {this.props.forms.forms.map(form => (
              <div className="IndividualForm">
                <Form form={form} history={this.props.history} />
              </div>
            ))}
            <button className="CreateFormBtn" onClick={this.newForm}>
              Create New Template
            </button>
          </div>
        </div>
      );
    } else if (this.props.forms.gettingForm === false &&
      this.props.forms.isDeleting === false && this.props.forms.isAdding === false &&
      this.props.forms.isAddingField === false && this.props.forms.isAdding === false) {
        form = (
          <div>
            <Spinner />
          </div>
        )
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
