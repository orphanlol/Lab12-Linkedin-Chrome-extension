import React, { Component } from "react";
import { connect } from "react-redux";
import {Store} from 'webext-redux'

import "./NewForm.css";

const store = new Store({
    portName: 'COUNTING',
  })

class NewForm extends Component {
  state = {
    fields: [{ name: "", selected: "" }],
    name: ""
  };

  handleChange = e => {
    if (["name", "selected"].includes(e.target.className)) {
      let fields = [...this.state.fields];
      fields[e.target.dataset.id][e.target.className] = e.target.value;
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
      fields: [...prevState.fields, { name: "", selected: "" }]
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addForm(this.state);
  };

  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    let { name, fields } = this.state;
    return (
      <div className='Body'>
        <div className='Header'>
          <div className='Cancel' onClick={this.cancel}>
            Cancel
          </div>
        </div>

        <form onChange={this.handleChange}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={name} />
          <button onClick={this.addField}>Add new form field</button>
          {fields.map((val, idx) => {
            let nameId = `name-${idx}`,
              selectedId = `selected-${idx}`;
            return (
              <div key={idx}>
                <label htmlFor={nameId}>{`Name #${idx + 1}`}</label>
                <input
                  type="text"
                  name={nameId}
                  data-id={idx}
                  id={nameId}
                  value={fields[idx].name}
                  className="name"
                />
                <label htmlFor={selectedId}>Selected</label>
                <input
                  type="text"
                  name={selectedId}
                  data-id={idx}
                  id={selectedId}
                  value={fields[idx].selected}
                  className="selected"
                />
                <button onClick={this.deleteField} value={idx}>
                  Delete Field
                </button>
              </div>
            );
          })}
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addForm: newForm => store.dispatch({type: 'alias@ADD_FORM', newForm: newForm})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewForm);
