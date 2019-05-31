import React, { Component } from "react";
import { connect } from "react-redux";
import { Store } from "webext-redux";

import "./NewForm.css";

const store = new Store({
  portName: "COUNTING"
});

class NewForm extends Component {
  state = {
    fields: [{ name: "" }],
    name: "",
    fieldOptions: ["Job Title", "Name", "Location", "Skills", "Jobs", "Degrees"]
  };
  

  handleChange = e => {
    if (e.target.name != "name") {
      let fields = [...this.state.fields];
      fields[e.target.dataset.key].name = e.target.value;
      this.setState({ fields }, () => console.log(this.state.fields));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  deleteField = e => {
    e.preventDefault();
    let fields = [...this.state.fields];
    fields.splice(e.target.value, 1);
    this.setState({ fields }, () =>
      console.log(this.state.fields, "after delete")
    );
  };

  addField = e => {
    e.preventDefault();
    this.setState(prevState => ({
      fields: [...prevState.fields, { name: "" }]
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addForm(this.state);
    this.props.history.push("/");
  };

  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    let { name, fields } = this.state;
    return (
      <div className="PageWrapperNF">
        <div className="FormWrapperNF">
          <div className="Header">
            <div className="CancelNF" onClick={this.cancel}>
              {"< Back to templates"}
            </div>
          </div>
          <form className="formBoxNF">
            <input
              placeholder="Name your template..."
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              className="NameNF"
            />
            {fields.map((val, idx) => {
              let nameId = `name-${idx}`;
              return (
                <div className="FieldBoxNF" key={idx}>
                  <label htmlFor={nameId}>{`Field #${idx + 1}`}</label>
                  <div className="FieldSelectDeleteNF">
                    <div className="SelectFieldNF">
                      <select
                        data-key={idx}
                        value={this.state.fields[idx].name}
                        onChange={this.handleChange}
                      >
                        <option value="" disabled>
                          {"Select Field"}
                        </option>
                        {this.state.fieldOptions.map(option => {
                          return (
                            <option
                              type="text"
                              name={nameId}
                              data-key={idx}
                              id={nameId}
                              value={option}
                              className="name"
                            >
                              {option}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <button
                      className="DeleteFieldNF"
                      onClick={this.deleteField}
                      value={idx}
                    >
                      Delete Field
                    </button>
                  </div>
                </div>
              );
            })}
            <button className="AddFieldBtnNF" onClick={this.addField}>
              Add field
            </button>
            <button className="SubmitBtnNF" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
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
    addForm: newForm =>
      store.dispatch({ type: "alias@ADD_FORM", newForm: newForm })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewForm);
