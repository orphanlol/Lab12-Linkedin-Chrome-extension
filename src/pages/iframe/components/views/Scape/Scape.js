import React, { Component } from "react";
import "./Scape.css";
import NavBar from "../NavBar/NavBar";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Store } from "webext-redux";

const store = new Store({
  portName: "COUNTING"
});

class Scrape extends Component {
  state = {
    formOptions: [],
    selectedFormName: "",
    selectedFormId: "",
    selectedFormFields: []

    // ****************************
    //commented out until form rules and/or emailing is implemented and this is needed

    // departmentOptions: [],
    // selectedDept: ''
    // ****************************
  };

  async componentDidMount() {
    console.log("state at start", this.state);
    await this.props.getForm(localStorage.getItem("id"));

    // ****************************
    //commented out until form rules and/or emailing is implemented and this is needed
    // await this.props.getDept(localStorage.getItem("id"));
    // ****************************

    for (let i = 0; i < this.props.forms.length; i++) {
      this.setState({
        formOptions: [...this.state.formOptions, this.props.forms[i].name]
      });
    }

    // ****************************
    //commented out until form rules and/or emailing is implemented and this is needed

    // for (let i = 0; i<this.props.depts.length; i++) {
    //     this.setState({
    //         departmentOptions: [
    //             ...this.state.departmentOptions,
    //             this.props.depts[i].name
    //         ]
    //     })
    // }
    // ****************************
    console.log("state at end", this.state);
  }

  getSelectedFormFields = async () => {
    for (let i = 0; i < this.props.forms.length; i++) {
      if (this.props.forms[i].name === this.state.selectedFormName) {
        await this.setState({ selectedFormId: this.props.forms[i].form_id });
      }
    }
    await this.props.getField(this.state.selectedFormId);
    this.setState({ selectedFormFields: this.props.getFields });
    this.props.history.push("/edit-scrape");
  };

  handleChangeField = e => {
    let selectedFormName = [...this.state.selectedFormName];
    selectedFormName = e.target.value;
    this.setState({ selectedFormName }, () => console.log(this.state));
  };

  render() {
    return (
      <div className="Scrape">
        <NavBar />
        <div className="centerBox">
          <div className="bold">Scrape Profile</div>

          <div className="dropDown">
            <p>Form: </p>
            <select
              value={this.state.selectedFormName}
              onChange={this.handleChangeField}
            >
              <option value="" disabled>
                {"Select Form"}
              </option>
              {this.state.formOptions.map((option, idx) => {
                return (
                  <option
                    type="text"
                    name={option}
                    data-key={idx}
                    id={option}
                    value={option}
                    className="name"
                  >
                    {option}
                  </option>
                );
              })}
            </select>
          </div>

          {/* **************************** */}
          {/* commented out until form rules and/or emailing is implemented and this is needed */}

          {/* <div className = {classes.dropDown}>
                    <p>Department: </p>
                    <SelectBox 
                        title={"Department"}
                        name={"selectedDept"}
                        options={this.state.departmentOptions}
                        value={this.state.selectedDept}
                        placeholder={"Select Department"}
                        onChange={this.handleInput}
                    />
                </div> */}
          {/* **************************** */}

          <button
            className="scrapeBtn"
            onClick={() => this.getSelectedFormFields()}
          >
            Scrape
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    forms: state.formReducer.forms,
    getForm: state.formReducer.getForm,
    getFields: state.formReducer.fieldsToUpdate

    // ****************************
    //commented out until form rules and/or emailing is implemented and this is needed
    // depts: state.deptReducer.depts,
    // getDept: state.deptReducer.getDept
    // ****************************
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getForm: id => store.dispatch({ type: "alias@GET_FORM", id: id }),
    getField: formId =>
      store.dispatch({ type: "alias@GET_FIELD", formId: formId })
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Scrape)
);
