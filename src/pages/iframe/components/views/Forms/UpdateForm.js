import React, { Component } from "react";
import { connect } from "react-redux";
import {Store} from 'webext-redux'

const store = new Store({
    portName: 'COUNTING',
})

class UpdateIndivForm extends Component {
  state = {
    form: this.props.formToUpdate,
    fields: [],
    fieldOptions: ["Job Title", "Name", "Location"]
  };

  async componentDidMount() {
    console.log(this.state, "1sa");
    console.log(this.props, "1pr");
    await this.props.getField(this.props.formToUpdate.form_id);
    this.setState({ fields: this.props.fieldsToUpdate });
    console.log(this.state, "2sa");
    console.log(this.props, "2pr");
  }

  handleChangeForm = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  handleChangeField = e => {
    let fields = [...this.state.fields];
    fields[e.target.dataset.key].name = e.target.value;
    this.setState({ fields }, () => console.log(this.state.fields));
  };

  deleteField = e => {
    e.preventDefault();
    this.props.deleteField(e.target.value);
  };

  updateForm = async (e, id) => {
    e.preventDefault();
    await this.props.updateForm(this.state.form, this.state.fields);
    this.props.history.push("/forms");
  };

  render() {
      console.log(this.state.form)
    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            value={this.state.form.name}
            onChange={this.handleChangeForm}
          />
          {this.state.fields.map((val, idx) => {
            let nameId = `name-${idx}`;
            return (
              <div key={idx}>
                <label htmlFor={nameId}>{`Field #${idx + 1}`}</label>
                <div>
                  <select
                    data-key={idx}
                    value={this.state.fields[idx].name}
                    onChange={this.handleChangeField}
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
                {/* <input
                  type="text"
                  name={nameId}
                  data-id={idx}
                  id={nameId}
                  value={this.state.fields[idx].name}
                  className="name"
                  onChange={this.handleChangeField}
                /> */}
                <button
                  onClick={e => this.deleteField(e)}
                  value={this.state.fields[idx].id}
                >
                  Delete Field
                </button>
              </div>
            );
          })}
          <div>
            <button onClick={e => this.updateForm(e)}>Save Changes</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // getIndivForm: state.formReducer.getIndivForm,
    // updateForm: state.formReducer.updateForm,
    // isUpdating: state.formReducer.isUpdating,
    formToUpdate: state.formReducer.formToUpdate,
    fieldsToUpdate: state.formReducer.fieldsToUpdate
  };
};

const mapDispatchToProps = dispatch => {
    return {
        getIndivForm: () => store.dispatch({type: 'alias@GET_INDIV_FORM'}),
        updateForm: (form, field) => store.dispatch({type: 'alias@UPDATE_FORM', form: form, field: field}),
        getField: (formId) => store.dispatch({type: 'alias@GET_FIELD', formId: formId}),
        deleteField: (target) => store.dispatch({type: 'alias@DELETE_FIELD', target: target})
    }
} 

export default connect(
  mapStateToProps, mapDispatchToProps
)(UpdateIndivForm);