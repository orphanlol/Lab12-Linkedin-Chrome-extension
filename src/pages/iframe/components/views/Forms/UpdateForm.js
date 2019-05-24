import React, { Component } from "react";
import { connect } from "react-redux";
import { Store } from "webext-redux";
import "./UpdateForm.css";
import Spinner from '../../Spinner/Spinner'

const store = new Store({
  portName: "COUNTING"
});

class UpdateIndivForm extends Component {
  state = {
    form: this.props.formToUpdate,
    fields: this.props.fieldsToUpdate,
    fieldOptions: ["Job Title", "Name", "Location", "Skills"]
  };

    componentDidMount() {
    let url_string = window.location.href; //window.location.href
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    console.log("url", url_string);
    console.log("url2", url);
    console.log("urlid", id);
    this.props.getIndivForm(id);
    console.log("after set state", this.state.form);
    this.props.getField(this.props.formToUpdate.id);
    console.log('after thisState',this.state)
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
    this.setState({
      form: [],
    })
    this.setState({field: []})
    this.props.history.push("/forms");
  };

  render() {
    let update = (
        <div>
          <Spinner />
        </div>
    )
    console.log(this.state)
    if (this.props.forms.gettingField === true && this.props.forms.gettingField === true && this.props.forms.gettingForm === true && this.state.fields.length === 0 && this.state.form.name === undefined) {
      update = (
        <div>
          <Spinner />
        </div>
      )
    } else if (this.props.forms.gettingField === false && this.props.forms.gettingField === false && this.props.forms.gettingForm === false && this.state.fields.length !== 0 && this.state.form.name !== undefined) {
      update = (
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
      )
    }
    return (
      <div>
        {update}
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
    fieldsToUpdate: state.formReducer.fieldsToUpdate,
    forms: state.formReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getIndivForm: id =>
      store.dispatch({ type: "alias@GET_INDIV_FORM", id: id }),
    updateForm: (form, field) =>
      store.dispatch({ type: "alias@UPDATE_FORM", form: form, field: field }),
    getField: formId =>
      store.dispatch({ type: "alias@GET_FIELD", formId: formId }),
    deleteField: target =>
      store.dispatch({ type: "alias@DELETE_FIELD", target: target })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateIndivForm);
